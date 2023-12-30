from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.generic.base import TemplateView
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from django.conf.urls.static import static

from posts.models import Post
from posts.sitemaps import *

sitemaps = {
    'products': GenericSitemap({
        'queryset': Post.objects.all(),
        'date_field': 'created_at',
    }, priority=0.9, changefreq='never', protocol='https'),
    'cats': ShopViewSiteMap,
    'tags': TagViewSiteMap,
    'shop': ShopStaticViewSitemap,
    'offer': OfferStaticViewSitemap,
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),
    path('9&c78WCLRYeDAldsyIOl1yeiL9XP/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', include('posts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'posts.views.page_not_found_view'
