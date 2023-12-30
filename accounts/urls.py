from django.urls import path
from .views import *


urlpatterns = [
    path('request_otp/', request_otp, name="request_otp"),
    path('verify_otp/', verify_otp, name="verify_otp"),
    path('logout/', logout_view, name="logout_url"),
    path('addtobasket/', addtobasket_view, name="addtobasket_url"),
    path('rmfrombasket/', rmfrombasket_view, name="rmfrombasket_url"),
    path('addrmbasket/', addrmbasket_view, name="addrmbasket_url"),
    path('subbasket/', subbasket_view, name="subbasket_url"),
    path('cart/', cart_view, name="cart_url"),
    path('history/', HistoryView.as_view(), name="history_url"),
    path('howto/', howto_view, name="howto_url"),
]
