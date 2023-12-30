from django.urls import path
from .views import *


urlpatterns = [
    path('', home_view, name='home_url'),
    path('search', search_view, name='search_url'),
    path('posts/<str:slug>/', detail_view, name='detail_url'),
    path('shop/', shop_view, name='shop_url'),
    path('offers/', offer_view, name='offer_url'),
    path('shop/<str:slug>', shop_view, name='shop_url'),
    path('tags/<str:slug>', tag_view, name='tag_url'),
    path('about-us/', aboutUs_view, name='aboutUs_url'),
    path('join-us/', joinUs_view, name='joinUs_url'),
    path('hit_count/', hit_count, name='hit_count'),
    path('contact-us/', ContactUsView.as_view(), name='contactUs_url'),
]
