from this import d
from django import forms
from .models import Contact, News, Post, PropertyValue
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from django.db.models import fields
from datetime import datetime, time, timedelta

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['full_name'].widget.attrs.update({'autocomplete': 'off', 'label': '', 'placeholder': 'نام و نام خانوادگی', 'class': 'form-control bg-gray6 p-3 mt-4'})
        self.fields['full_name'].label = ''
        self.fields['email'].widget.attrs.update({'autocomplete': 'off', 'label': '', 'placeholder': 'ایمیل', 'class': 'form-control bg-gray6 p-3 mt-3'})
        self.fields['email'].label = ''
        self.fields['phone'].widget.attrs.update({'autocomplete': 'off', 'label': '', 'placeholder': 'شماره تماس', 'class': 'form-control bg-gray6 p-3 mt-3'})
        self.fields['phone'].label = ''
        self.fields['content'].widget.attrs.update({'autocomplete': 'off', 'label': '', 'placeholder': 'متن پیام را بنویسید', 'class': 'form-control bg-gray6 p-3 mt-3'})
        self.fields['content'].label = ''
        self.fields['content'].error_messages.update({'required': 'لطفا متن خود را وارد نمایید !'})

    
    def clean(self):
        cleaned_data = super().clean()
        phone = cleaned_data.get('phone')
        email = cleaned_data.get('email')
        if not email and not phone:
            raise ValidationError(_('لطفا شماره تماس یا ایمیل را خالی نگذارید !'))

class NewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'autocomplete': 'off', 'label': '', 'placeholder': 'ایمیل', 'class': 'form-control bg-gray2 text-light rounded-3 py-2 pe-3 ps-6 border-0 text-end'})
        self.fields['email'].label = ''
      
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'
    
    def clean(self) :
        cleaned_data = super().clean()
        avail = cleaned_data.get('avail')
        off = cleaned_data.get('off')
        off_time = cleaned_data.get('off_time')
        off_days = cleaned_data.get('off_days')
        if (off == '' or off_time == '' or off_days == '') and (off != '' or off_time != '' or off_days != ''):
            raise ValidationError('فیلدهای تخفیف وابسته به هم هستند !')
        if avail == False and off != '':
            raise ValidationError('محصول ناموجود تخفیف ندارد !')


    def save(self, commit=True):
        obj = super().save(commit=False)
        if obj.off_time != '':
            off_time = None
            if obj.off_time == '1':
                off_time = time(6,0,0)
            elif obj.off_time == '2':
                off_time = time(12,0,0)
            elif obj.off_time == '3':
                off_time = time(18,0,0)
            elif obj.off_time == '4':
                off_time = time(0,0,0)
            obj.off_date = datetime.combine((datetime.now() + timedelta(days=int(obj.off_days))).date() , off_time).timestamp()
        else:
            obj.off_date = ''
        if commit:
            obj.save()
        return obj