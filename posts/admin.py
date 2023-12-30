from django.contrib import admin
from .models import *
from django import forms
from django.urls import reverse
from mptt.admin import MPTTModelAdmin
from .forms import PostForm
from datetime import datetime
from django.utils.html import format_html


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'searchable', 'prop_values')
    list_filter = ('prop_values', 'cats', 'searchable', )
    search_fields = ('name', 'prop_values__value', 'cats__name')
    list_editable = ('name', 'searchable', )
    list_display_links = None
    list_per_page = 20

    def prop_values(self, obj):
        info = (PropertyValue._meta.app_label, PropertyValue._meta.model_name)
        return format_html("<div style='display: flex; flex-wrap: wrap; max-height: 6rem; overflow-y: auto'>{}</div>", format_html(' '.join([format_html("<a style='padding: 0.25rem 0.5rem; background-color: #efefef80; border-radius: 0.5rem; margin: 0.25rem 0.5rem;' href={}>{}</a>", reverse('admin:%s_%s_change' % info, args=(props.id,)), props.value) for props in obj.prop_values.only('value')])))

    prop_values.short_description = 'مقادیر ویژگی'

@admin.register(PropertyValue)
class PropertyValueAdmin(admin.ModelAdmin):
    list_display = ('property', 'value', )
    list_filter = ('property', )
    search_fields = ('property', 'value', )
    list_editable = ('property', 'value', )
    list_display_links = None
    list_per_page = 20
    
    search_fields = ['value', 'property__name']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'avail', 'views', 'off', )
    list_filter = ('cats', 'props', 'price', 'avail', 'off', )
    search_fields = ('title', 'props__value', 'props__property__name')
    list_editable = ('price', )
    list_per_page = 20

    form = PostForm
    autocomplete_fields = ['props', 'cats', 'tags']

    class Media:
        js = ('js/admin.js',)
    

@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    list_display = ('name', 'parent', 'cat_props', )
    search_fields = ('name', )
    list_editable = ('parent', )

    
    def cat_props(self, obj):
        info = (Property._meta.app_label, Property._meta.model_name)
        return format_html("<div style='display: flex; flex-wrap: wrap; max-height: 6rem; overflow-y: auto'>{}</div>", format_html(' '.join([format_html("<a style='padding: 0.25rem 0.5rem; background-color: #efefef80; border-radius: 0.5rem; margin: 0.25rem 0.5rem;' href={}>{}</a>", reverse('admin:%s_%s_change' % info, args=(props.id,)), props.name) for props in obj.props.only('name')])))

    cat_props.short_description = 'لیست ویژگی های مربوط به دسته بندی'

    search_fields = ['name']
    class Media:
        js = ('js/admin.js',)

        
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag_posts')
    search_fields = ('title', )
    list_per_page = 20
    
    def tag_posts(self, obj):
        info = (Post._meta.app_label, Post._meta.model_name)
        return format_html("<div style='display: flex; flex-wrap: wrap; max-height: 6rem; overflow-y: auto'>{}</div>", format_html(' '.join([format_html("<a style='padding: 0.25rem 0.5rem; background-color: #efefef80; border-radius: 0.5rem; margin: 0.25rem 0.5rem;' href={}>{}</a>", reverse('admin:%s_%s_change' % info, args=(post.id,)), post.title) for post in obj.posts.only('title')[:20]])))
    tag_posts.short_description = '20 عدد از آخرین پست های شامل این تگ'
    
    class Media:
        js = ('js/admin.js',)
