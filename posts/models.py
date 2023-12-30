from django.db import models
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from django.urls import reverse

from accounts.validators import PHONE_VALIDATOR, CONTENT_VALIDATOR


class Contact(models.Model):

    full_name = models.CharField('نام و نام خانوادگی', null=True, blank=True, max_length=64)
    email = models.EmailField('ایمیل', max_length=64, null=True, blank=True)
    phone = models.CharField('شماره تلفن', max_length=11, validators=[PHONE_VALIDATOR], null=True, blank=True)
    content = models.TextField('متن', validators=[CONTENT_VALIDATOR])
    created_at = models.DateTimeField('تاریخ ثبت', auto_now_add=True)

    class Meta:
        verbose_name = 'درخواست تماس با ما'
        verbose_name_plural = 'درخواست های تماس با ما'

    def __str__(self):
        return self.email or self.full_name or self.phone


class Post(models.Model):
    OFF_TIME_CHOICES = (
        ('1', 'صبح'),
        ('2', 'ظهر'),
        ('3', 'عصر'),
        ('4', 'شب'),
    )
    id = models.BigAutoField('کد محصول', primary_key=True)
    title = models.CharField('عنوان', max_length=128)
    slug = models.SlugField('اسلاگ', max_length=128, unique=True, allow_unicode=True)
    image1 = models.ImageField('تصویر اول', upload_to='posts/')
    image2 = models.ImageField('تصویر دوم', upload_to='posts/', null=True, blank=True)
    image3 = models.ImageField('تصویر سوم', upload_to='posts/', null=True, blank=True)
    image4 = models.ImageField('تصویر چهارم', upload_to='posts/', null=True, blank=True)
    desc_short = models.CharField('توضیح کوتاه', max_length=120)
    desc = models.TextField('توضیحات')
    price = models.CharField('قیمت', max_length=64, blank=True)
    avail = models.BooleanField('وضعیت موجودی', default=True)
    off = models.CharField('تخفیف', max_length=2, blank=True)
    off_days = models.CharField('تعداد روز', max_length=2, blank=True)
    off_time = models.CharField('زمان تخفیف', max_length=1, choices=OFF_TIME_CHOICES, blank=True)
    off_date = models.CharField('تاریخ پایان تخفیف', max_length=255, editable=False)
    created_at = models.DateTimeField('زمان ایجاد', auto_now_add=True)
    cats = models.ManyToManyField('Category', related_name='posts', verbose_name='دسته بندی ها')
    props = models.ManyToManyField('PropertyValue', related_name='posts', verbose_name='ویژگی ها')
    tags = models.ManyToManyField('Tag', related_name='posts', verbose_name='تگ ها')
    views = models.PositiveIntegerField('تعداد بازدید', default=0, editable=False)
    meta = models.CharField('تگ متا', max_length=255)

    class Meta:
        verbose_name = 'محصول'
        verbose_name_plural = 'محصولات'
        ordering = ['-avail', '-id']
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("detail_url", kwargs={"slug": self.slug})
    

class Category(MPTTModel):
    parent = TreeForeignKey('self', related_name='children', on_delete=models.CASCADE, null=True, blank=True, verbose_name='دسته بندی مادر')
    name = models.CharField('نام', max_length=32)
    slug = models.SlugField('اسلاگ', max_length=32, unique=True, allow_unicode=True)
    props = models.ManyToManyField('Property', related_name='cats', verbose_name='ویژگی ها', blank=True)

    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'

    def __str__(self):
        return self.name


class Property(models.Model):
    name = models.CharField('نام', max_length=32, unique=True)
    searchable = models.BooleanField('قابلیت جستجو در فیلتر فروشگاه', default=True)

    class Meta:
        verbose_name = 'ویژگی'
        verbose_name_plural = 'ویژگی ها'

    def __str__(self):
        return self.name

class PropertyValue(models.Model):
    property = models.ForeignKey('Property', on_delete=models.CASCADE, related_name='prop_values', verbose_name='ویژگی')
    value = models.CharField('مقدار', max_length=32)

    class Meta:
        verbose_name = 'مقدار ویژگی'
        verbose_name_plural = 'مقادیر ویژگی ها'
        unique_together = ('property', 'value',)

    def __str__(self):
        return self.property.name + " " + self.value

class Tag(models.Model):
    title = models.CharField('عنوان',max_length=32)
    slug = models.SlugField('اسلاگ', max_length=32, unique=True, allow_unicode=True)

    class Meta:
        verbose_name = 'تگ'
        verbose_name_plural = 'تگ ها'

    def __str__(self):
        return self.title


class News(models.Model):
    email = models.EmailField('ایمیل', max_length=128, unique=True)

    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران خبرنامه'
        
    def __str__(self):
        return self.email
