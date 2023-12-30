from django.core.cache import cache
from django.forms import ValidationError
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model, login, logout
from django.shortcuts import render
from django.http.response import JsonResponse
from django.views import View
from django.views.decorators.clickjacking import xframe_options_deny
from django.db.models import Prefetch, F
from django.core.paginator import Paginator
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.decorators.http import require_GET, require_POST
import json, random, string

from .validators import PHONE_VALIDATOR, CODE_VALIDATOR
from extensions.utils import send_sms
from .models import Cart, Post, BasketItem, CartItem

import time

User = get_user_model()


class HistoryView(LoginRequiredMixin, View):
    @xframe_options_deny
    def get(self, request):
        
        data = request.user.carts.only('status', 'publish', 'user_id').prefetch_related(Prefetch('cart_items', queryset=CartItem.objects.select_related('post').only('quantity', 'cart_id', 'post__id', 'post__off', 'post__title', 'post__slug', 'post__image1')))

        paginator = Paginator(data, 3)
        page_obj = paginator.get_page(1)

        context = {'page_obj': page_obj}
        return render(request, 'accounts/history.html', context)
        
    def post(self, request):
        
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':

            carts = request.user.carts.only('status', 'publish', 'user_id').prefetch_related(Prefetch('cart_items', queryset=CartItem.objects.select_related('post').only('quantity', 'cart_id', 'post__id', 'post__off', 'post__title', 'post__slug', 'post__image1')))
            if val := request.POST.get('value'):
                carts = carts.filter(status=val)

            paginator = Paginator(carts, 3)
            page_number = request.POST.get('page', 1)
            page_obj = paginator.get_page(page_number)


            data = list()    
            for cart in page_obj:
                cart_items = cart.cart_items.all()
                cart_items_obj = {}
                for cart_item in cart_items:
                    cart_items_obj[cart_item.id] = {
                        'image1': cart_item.post.image1.url,
                        'title': cart_item.post.title,
                        'url': reverse_lazy('detail_url', args=[cart_item.post.slug]),
                        'quantity': cart_item.quantity
                    }

                data.append({
                    'id': cart.id,
                    'status': cart.status,
                    'jpublish': cart.jpublish(),
                    'cart_items': cart_items_obj
                })

            res = {'page_obj': data}

            if page_obj.has_next():
                res['next'] = page_obj.next_page_number()

            if page_obj.has_previous():
                res['previous'] = page_obj.previous_page_number()

            return JsonResponse(res)

   
@require_POST
@login_required
def addtobasket_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        id = request.POST.get('id')

        try:

            quantity = request.POST.get('quantity')

            if quantity: 
                try:
                    value = int(quantity)
                    if value < 1:
                        return JsonResponse({'msg': 'تعداد وارد شده قابل قبول نیست !'}, status=400)

                    bi = BasketItem.objects.filter(user=request.user, post=id)
                    if bi.exists():
                        count = request.user.basket_items.count()
                        bi.update(quantity=value)
                        return JsonResponse({'count': count, 'msg': f"{value} عدد از این محصول در سبد خرید"})
                    post = Post.objects.only('id').get(pk=id)
                    count = request.user.basket_items.count()
                    BasketItem.objects.create(user=request.user, post=post, quantity=value)
                    return JsonResponse({'count': count + 1, 'msg': "محصول به سبد خرید شما اضافه شد !"}, status=201)
                except ValidationError:
                    return JsonResponse({'msg': 'لطفا عدد وارد نمایید'}, status=400)
            else:
                try:
                    bi = BasketItem.objects.only('quantity').get(user=request.user, post=id)
                    count = request.user.basket_items.count()
                    quantity = bi.quantity
                    bi.quantity = F('quantity') + 1
                    bi.save()
                    return JsonResponse({'count': count, 'msg': f"{quantity+1} عدد از این محصول در سبد خرید"})
                except BasketItem.DoesNotExist:
                    post = Post.objects.only('id').get(pk=id)
                    count = request.user.basket_items.count()
                    BasketItem.objects.create(user=request.user, post=post)
                    return JsonResponse({'count': count + 1, 'msg': "محصول به سبد خرید شما اضافه شد !"}, status=201)
            
        except Post.DoesNotExist:
            return JsonResponse({'msg': 'محصول موجود نیست !'})


@require_POST
@login_required
def rmfrombasket_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        id = request.POST.get('id')

        BasketItem.objects.filter(user=request.user, post=id).delete()
        return JsonResponse({'count': request.user.basket_items.count(), 'msg': 'با موفقیت حذف شد !'})


@require_POST
@login_required
def addrmbasket_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        id = request.POST.get('id')
        quantity = request.POST.get('quantity')

        if quantity: 
            try:
                value = int(quantity)
                if value < 1:
                    return JsonResponse({'msg': 'تعداد واردشده قابل قبول نیست !'}, status=400)

                bi = BasketItem.objects.filter(user=request.user, post=id)

                if bi.exists():
                    count = request.user.basket_items.count()
                    bi.delete()
                    return JsonResponse({'count': count - 1, 'msg': 'با موفقیت حذف شد !'})

                try: 
                    post = Post.objects.only('id').get(pk=id)
                    count = request.user.basket_items.count()
                    bi = BasketItem.objects.create(user=request.user, post=post, quantity=quantity)
                    return JsonResponse({'count': count + 1, 'msg': 'محصول به سبد خرید شما اضافه شد !'}, status=201)
                except Post.DoesNotExist:
                    return JsonResponse({'msg': 'محصول موجود نیست !'})
                    
            except:
                return JsonResponse({'msg': 'لطفا عدد وارد نمایید'}, status=400)
        else:
            return JsonResponse({'msg': 'لطفا تعداد را تعیین نمایید'}, status=400)


@require_POST
@login_required
def subbasket_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        basket_items = request.user.basket_items.select_related('post').only('quantity', 'user__id', 'post__id', 'post__off', 'post__image1', 'post__title', 'post__slug')
        if not basket_items:
            return JsonResponse({'msg': 'سبد خرید شما خالی است !'}, status=400)

        whats = True if request.POST.get('whats') == 'true' else False

        cart = Cart.objects.create(user=request.user, whats=True if request.POST.get('whats') == 'true' else False)

        items = list()
        for item in basket_items:
            items.append({
                'id': item.post.id,
                'title': item.post.title,
                'image': item.post.image1.url,
                'url': reverse_lazy('detail_url', args=[item.post.slug]),
                'off': item.post.off,
                'quantity': item.quantity,
            })
            
        
        data = {
            'cart_id': cart.id,
            'cart_publish': cart.jpublish(),
            'cart_whats': cart.whats,
            'user_phone': request.user.phone,
            'cart_items': items
        }

        CartItem.objects.bulk_create([CartItem(cart=cart, post=basket_item.post, quantity=basket_item.quantity, off=basket_item.post.off) for basket_item in basket_items])
        
        tel = cache.get('tel')
        with open('fa', 'a') as f:
            f.write('tel: ' + str(tel) + '\nnow: ' + str(time.time()) + '\n')
        if tel is not None:
            sub = time.time() - tel
            if sub > 60:
                countdown = 0
                cache.set('tel', time.time()) 
            else:
                if sub < 0:
                    countdown = -sub + 63
                    cache.set('tel', tel+63) 
                else:
                    countdown = 60 - sub + 3
                    cache.set('tel', tel+63) 

        else:
            countdown = 0
            cache.set('tel', time.time()) 

        with open('fa', 'a') as f:
            f.write('countdown: ' + str(countdown) + '\n')

        basket_items.delete()
        return JsonResponse({'msg': 'سفارش شما ثبت شد !'}, status=201)



@require_GET
@login_required
@xframe_options_deny
def cart_view(request):
    basket_items = BasketItem.objects.filter(user=request.user).select_related('post').only('quantity', 'user__id', 'post__id', 'post__off', 'post__title', 'post__slug', 'post__image1', 'post__desc_short')
    context = {'basket_items': basket_items}
    return render(request, 'accounts/cart.html', context)

@require_GET
@xframe_options_deny
def howto_view(request):
    return render(request, 'accounts/howto.html')
    

def _generate_otp():
    rand = random.SystemRandom()
    digits = rand.choices(string.digits, k=4)
    return ''.join(digits)


@require_POST
def request_otp(request): 
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        phone = request.POST.get('phone')

        try:
            PHONE_VALIDATOR(phone)
        except ValidationError:
            return JsonResponse({'msg': 'لطفا شماره تلفن را صحیح وارد نمایید'}, status=400)

        if (phone in cache):
            print(cache.ttl(phone))
            return JsonResponse({'msg': 'بعد از مدتی دوباره تلاش کنید !', 'ttl': cache.ttl(phone)}, status=201)

        code = _generate_otp()
        # send_sms(receptor=phone, template='huzan', type=1, param1=code)
        # print(code)

        cache.set(phone, code, 120)
        return JsonResponse({'msg': 'کد ارسال شده را وارد نمایید', 'ttl': 120}, status=200)


@require_POST
def verify_otp(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        phone = request.POST.get('phone')
        code = request.POST.get('code')

        try:
            PHONE_VALIDATOR(phone)
            CODE_VALIDATOR(code)
        except ValidationError:
            return JsonResponse({'msg': 'لطفا مشخصات را صحیح وارد نمایید'}, status=400)

        redis_code = cache.get(phone)

        if redis_code:        
            if code == redis_code:

                user, created = User.objects.only('is_active').get_or_create(phone=phone)
                if not user.is_active:
                    return JsonResponse({'msg': 'متاسفانه این حساب مسدود شده است !'}, status=400)

                ls_items = request.POST.get('ls_items')
                if ls_items:
                    jl = json.loads(ls_items)
                    j = list(filter(lambda n: isinstance(jl[n]['quantity'], int) and jl[n]['quantity'] > 0, jl.keys()))
                    posts = Post.objects.filter(pk__in=j).filter(avail=True).only('id')

                    if created:
                        BasketItem.objects.bulk_create([BasketItem(user=user, post=post, quantity=jl[str(post.id)]['quantity']) for post in posts])
                    else:
                        bi = BasketItem.objects.filter(post__in=posts, user=user).select_related('post')
                        up_list = []
                        for b in bi:
                            b.quantity = b.quantity + jl[str(b.post.id)]['quantity']
                            up_list.append(b)
                        BasketItem.objects.bulk_update(up_list, ['quantity'])   
                        creatable_posts = posts.exclude(basket_items__post__in=posts, basket_items__user=user)
                        BasketItem.objects.bulk_create([BasketItem(user=user, post=post, quantity=jl[str(post.id)]['quantity']) for post in creatable_posts])

                login(request, user)

                return JsonResponse({})
            return JsonResponse({'msg': 'کد اشتباه است !'}, status=400)
        else:
            return JsonResponse({'msg': 'کد منقضی شده است !'}, status=400)

@require_POST
@login_required
def logout_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        logout(request)
        return JsonResponse({})
