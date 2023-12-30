from django.contrib import admin
from .models import User, Cart, CartItem, BasketItem
from django.contrib.auth.models import Group
from django.utils.html import format_html
from django.urls import reverse

admin.site.unregister(Group)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_per_page = 40


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'jpublish', 'status', 'whats', 'items_cart')
    list_filter = ('user', 'publish', 'status', 'whats', )
    search_fields = ('id', 'user__phone', )
    list_editable = ('status', )
    list_per_page = 20

    def items_cart(self, obj):
        return format_html("<div style='display: flex; flex-wrap: wrap; max-height: 6rem; overflow-y: auto'>{}</div>", format_html(' '.join([format_html("<a style='padding: 0.25rem 0.5rem; background-color: #efefef80; border-radius: 0.5rem; margin: 0.25rem 0.5rem;' href={}>{}</a><span style='color: red; background-color: #efefef80; border-radius: 50%; margin-right: -4px; padding: 0 7px; height: 20px;'>{}</span>"+("<span style='color: blue; background-color: #efefef80; border-radius: 50%; margin-right: -4px; padding: 0 7px; height: 20px;'>{}%</span>" if cart_item.off != "" else ""), reverse('detail_url', args=(cart_item.post.slug,)), cart_item.post.title, cart_item.quantity, cart_item.off) for cart_item in obj.cart_items.select_related('post').only('quantity', 'off', 'post__title', 'post__slug')[:20]])))
    items_cart.short_description = 'آیتم های سفارش'
    

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'post', 'quantity', 'off', )
    list_filter = ('cart', 'post', 'quantity', 'off', )
    search_fields = ('cart', 'post__title', )
    list_per_page = 20

@admin.register(BasketItem)
class BasketItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'quantity', )
    list_filter = ('user', 'post', 'quantity', )
    search_fields = ('user__phone', 'post__title', )
    list_per_page = 20
