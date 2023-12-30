from django.core.cache import cache
from django.http.response import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.urls import reverse_lazy
from django.db.models import Q, Count, Prefetch, F
# from django.contrib.postgres.search import SearchVector
from django.views import View
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.clickjacking import xframe_options_deny
import json

from .forms import ContactForm, NewsForm
from .models import *
from accounts.models import BasketItem


@require_GET
@xframe_options_deny
def search_view(request):
    q = request.GET.get('q')

    if not q:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({})
        return render(request, 'posts/search.html')
    
    posts = Post.objects.filter(Q(title__contains=q) or Q(cats__name__contains=q)).only('title', 'slug', 'image1', 'desc', 'off', 'off_date', 'avail')
    # posts = Post.objects.annotate(search=SearchVector('title', 'cats__name')).filter(search=q).distinct('id', 'avail').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        context = dict()

        page_number = request.GET.get('page')
            
        if page_number:
            paginator = Paginator(posts, 20)
            posts = paginator.get_page(page_number)
        else:
            posts = posts[:10]
            cats = Category.objects.filter(name__contains=q).only('name', 'slug')
            temp_cats = list()
            for cat in cats:
                temp_cats.append({
                    'name': cat.name,
                    'url': reverse_lazy('shop_url', args=[cat.slug]),
                })
            context['cats'] = temp_cats

        data = list()
        for item in posts:
            data.append({
                'id': item.id,
                'title': item.title,
                'url': reverse_lazy('detail_url', args=[item.slug]),
                'image1': item.image1.url, 
                'desc_short': item.desc_short,
                'off': item.off,
                'off_date': item.off_date,
                'avail': item.avail,
            }) 

        context['posts'] = data
        return JsonResponse(context)
        

    paginator = Paginator(posts, 20)
    posts = paginator.get_page(1)

    context = {
        'page_num': paginator.num_pages,
        'page_obj': posts,
        'q': q,
    } 
    return render(request, 'posts/search.html', context=context)


@require_GET
@xframe_options_deny
def home_view(request):
    latest_posts = Post.objects.only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:6]
    offer_posts = Post.objects.exclude(off='').order_by('-avail', '-off').only('title','slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:6]
    taj_posts = Post.objects.filter(cats__slug='تاج-گل').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    box_posts = Post.objects.filter(cats__slug='باکس-گل').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    basket_posts = Post.objects.filter(cats__slug='سبد-گل').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    jam_posts = Post.objects.filter(cats__slug='جام-گل').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    goldan_posts = Post.objects.filter(cats__slug='گلدان-آپارتمانی').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    taft_posts = Post.objects.filter(cats__slug='تفت-و-دورقبری').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    orkide_posts = Post.objects.filter(cats__slug='مجموعه-ارکیده').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')[:8]
    news_form = NewsForm()
    context = {
        'latest_posts': latest_posts,
        'offer_posts': offer_posts,
        'taj_posts': taj_posts,
        'box_posts': box_posts,
        'basket_posts': basket_posts,
        'jam_posts': jam_posts,
        'goldan_posts': goldan_posts,
        'taft_posts': taft_posts,
        'orkide_posts': orkide_posts,
        'news_form': news_form,
    }

    return render(request, 'base.html', context)


@require_GET
@xframe_options_deny
def detail_view(request, slug):

    post = get_object_or_404(Post.objects.defer('created_at', 'desc_short', 'views', 'off_days', 'off_time').prefetch_related(Prefetch('props', queryset=PropertyValue.objects.defer('property__searchable').select_related('property'))), slug=slug)
    
    similar_posts = Post.objects.only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail').exclude(pk=post.pk).filter(tags__posts=post).annotate(same_tags=Count('tags')).order_by('-avail','-same_tags')[:10]
    parent_cats = post.cats.filter(level=0).only('name', 'slug')
    tags = post.tags.only('title', 'slug')
    
    context = {'post': post, 'tags': tags, 'parent_cats': parent_cats, 'similar_posts': similar_posts}
    if request.user.is_authenticated:
        try:
            basket_item = BasketItem.objects.only('quantity').get(user=request.user, post=post)
            context['quantity'] = basket_item.quantity
        except BasketItem.DoesNotExist:
            pass
    return render(request, 'posts/detail.html', context)


def _get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@require_POST
def joinUs_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        ip = _get_client_ip(request)
        path = ip + request.path

        tmp = cache.get(path, 0)
        if tmp > 5:
            return JsonResponse({'msg': 'متاسفیم، تعداد درخواست بیش از حد مجاز'}, status=400)
        cache.set(path, tmp + 1, 60)

        form = NewsForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'msg': 'ممنون. ایمیل شما ثبت شد !'}, status=201)
        return JsonResponse({'msg': form.errors}, status=400) 

@require_GET
@xframe_options_deny
def aboutUs_view(request):
    return render(request, 'about-us.html')

class ContactUsView(View):

    @xframe_options_deny    
    def get(self, request):
        form = ContactForm(initial={'phone': request.user.phone if request.user.is_authenticated else None})
        context = {'form': form}
        return render(request, 'contact-us.html', context)

    def post(self, request):

        ip = _get_client_ip(request)
        path = ip + request.path

        tmp = cache.get(path, 0)
        if tmp > 5:
            return JsonResponse({'msg': 'متاسفیم، تعداد درخواست بیش از حد مجاز'}, status=400)
        cache.set(path, tmp + 1, 60)
        
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            form = ContactForm(data=request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'msg': 'ممنون. پیام شما ارسال شد !'}, status=201)
            return JsonResponse({'msg': form.errors}, status=400)

@require_GET
@xframe_options_deny
def shop_view(request, slug=None):

    posts = Post.objects.only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')

    if request.headers.get('x-requested-with') != 'XMLHttpRequest':

        context = dict()

        if not slug:
            page_url = reverse_lazy('shop_url')
        else:
            page_url = reverse_lazy('shop_url', args=[slug])
            cat = get_object_or_404(Category.objects.prefetch_related('children'), slug=slug)
            posts = posts.filter(cats=cat)
            if cat.is_root_node():
                children = cat.children.all()
            else:
                cat = cat.get_root()
                children = cat.children.exclude(slug=slug)
            props = cat.props.filter(searchable=True).prefetch_related('prop_values')
            context['cat'] = cat
            context['props'] = props
            context['children'] = children


        paginator = Paginator(posts.filter(avail=True), 20)
        page_obj = paginator.get_page(1)

        context['page_num'] = paginator.num_pages
        context['page_obj'] = page_obj
        context['page_url'] = page_url
        
        return render(request, 'posts/shop.html', context)


    avail_bool = False if request.GET.get('avail_bool') == 'false' else True
    off_bool = True if request.GET.get('off_bool') == 'true' else False
    order_by = request.GET.get('order_by', '1')
    types = json.loads(request.GET.get('types', 'false'))
    props = json.loads(request.GET.get('props', 'false'))
    
    if order_by == '2':
        posts = posts.annotate(post_count=Count('cart_items__post')).order_by('-post_count')

    elif order_by == '3':
        posts = posts.order_by('-avail', '-views')

    elif order_by == '4':
        posts = posts.exclude(off='').order_by('-off', 'off_date')

    if props:
        for prop in props:
            posts = posts.filter(props=prop)

    if types:
        posts = posts.filter(cats__in=types).distinct()
    else:
        if slug:
            posts = posts.filter(cats__slug=slug)

    if avail_bool:
        posts = posts.filter(avail=True)
        
    if off_bool:
        posts = posts.exclude(off='')

    paginator = Paginator(posts, 20)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    data = list()
    for item in page_obj:
        data.append({
            'id': item.id,
            'title': item.title,
            'url': reverse_lazy('detail_url', args=[item.slug]),
            'image1': item.image1.url, 
            'desc_short': item.desc_short,
            'off': item.off,
            'off_date': item.off_date,
            'avail': item.avail,
        })
    return JsonResponse({'page_obj': data, 'page_num': paginator.num_pages})


@require_GET
@xframe_options_deny
def tag_view(request, slug):
    tag = get_object_or_404(Tag, slug=slug)
    posts = tag.posts.only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')

    paginator = Paginator(posts, 20)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    
    if request.headers.get('x-requested-with') != 'XMLHttpRequest':
        context = {'page_num': paginator.num_pages, 'page_obj': page_obj, 'tag': tag}
        return render(request, 'posts/tags.html', context)

    data = list()
    for item in page_obj:
        data.append({
            'id': item.id,
            'title': item.title,
            'url': reverse_lazy('detail_url', args=[item.slug]),
            'image1': item.image1.url, 
            'desc_short': item.desc_short,
            'off': item.off,
            'off_date': item.off_date,
            'avail': item.avail,
        })

    return JsonResponse({'page_obj': data})


@require_GET
@xframe_options_deny
def offer_view(request):
    all_posts = Post.objects.filter(avail=True).exclude(off='').only('title', 'slug', 'image1', 'desc_short', 'off', 'off_date', 'avail')

    posts = dict()
    posts['پیشنهاد های ویژه'] = all_posts[:18]
    for cat in Category.objects.filter(level=0):
        posts[cat.name] = all_posts.filter(cats=cat)[:18]
    
    context = {'posts': posts}
    return render(request, 'posts/offer.html', context=context)


@require_GET
@xframe_options_deny
def page_not_found_view(request, exception):
    return render(request, '404.html')


@require_GET
def hit_count(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        Post.objects.filter(id=request.GET.get('id')).update(views=F('views') + 1)
        return JsonResponse({})
