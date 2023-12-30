from django.contrib import sitemaps
from django.urls import reverse

from posts.models import Post, Category, Tag

class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'never'
    protocol = 'https'

    def items(self):
        return ['aboutUs_url', 'contactUs_url', 'howto_url']

    def location(self, item):
        return reverse(item)

class ShopStaticViewSitemap(sitemaps.Sitemap):
    priority = 0.9
    changefreq = 'weekly'
    protocol = 'https'

    def items(self):
        return ['shop_url']

    def lastmod(self, obj):
        return Post.objects.last().created_at

    def location(self, item):
        return reverse(item)

class OfferStaticViewSitemap(sitemaps.Sitemap):
    priority = 0.9
    changefreq = 'weekly'
    protocol = 'https'

    def items(self):
        return ['offer_url']

    def lastmod(self, obj):
        return Post.objects.exclude(off='').last().created_at if Post.objects.exclude(off='').last() else None

    def location(self, item):
        return reverse(item)

class ShopViewSiteMap(sitemaps.Sitemap):
    priority = 0.9
    changefreq = "weekly"
    protocol = 'https'

    def items(self):
        return Category.objects.all()

    def lastmod(self, obj):
        return obj.posts.last().created_at if obj.posts.last() else None
        
    def location(self, obj):
        return reverse('shop_url', args=[obj.slug])


class TagViewSiteMap(sitemaps.Sitemap):
    priority = 0.9
    changefreq = "weekly"
    protocol = 'https'

    def items(self):
        return Tag.objects.all()

    def lastmod(self, obj):
        return obj.posts.last().created_at if obj.posts.last() else None
        
    def location(self, obj):
        return reverse('tag_url', args=[obj.slug])