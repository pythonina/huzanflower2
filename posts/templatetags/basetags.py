from django import template
from posts.models import Category

register = template.Library()

@register.inclusion_tag('header.html')
def header(user):
    context = {
        'cats': Category.objects.all(),
        'user': user
    }
    if user.is_authenticated:
        context['basket_count'] = user.basket_items.all().count()
    return context