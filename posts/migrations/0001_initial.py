# Generated by Django 4.1.2 on 2023-12-30 13:25

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=32, verbose_name="نام")),
                (
                    "slug",
                    models.SlugField(
                        allow_unicode=True,
                        max_length=32,
                        unique=True,
                        verbose_name="اسلاگ",
                    ),
                ),
                ("lft", models.PositiveIntegerField(editable=False)),
                ("rght", models.PositiveIntegerField(editable=False)),
                ("tree_id", models.PositiveIntegerField(db_index=True, editable=False)),
                ("level", models.PositiveIntegerField(editable=False)),
                (
                    "parent",
                    mptt.fields.TreeForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="children",
                        to="posts.category",
                        verbose_name="دسته بندی مادر",
                    ),
                ),
            ],
            options={
                "verbose_name": "دسته بندی",
                "verbose_name_plural": "دسته بندی ها",
            },
        ),
        migrations.CreateModel(
            name="Contact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "full_name",
                    models.CharField(
                        blank=True,
                        max_length=64,
                        null=True,
                        verbose_name="نام و نام خانوادگی",
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        blank=True, max_length=64, null=True, verbose_name="ایمیل"
                    ),
                ),
                (
                    "phone",
                    models.CharField(
                        blank=True,
                        max_length=11,
                        null=True,
                        validators=[
                            django.core.validators.RegexValidator(
                                "^09\\d{9}$", "تلفن باید شبیه 09123456789 باشد !"
                            )
                        ],
                        verbose_name="شماره تلفن",
                    ),
                ),
                (
                    "content",
                    models.TextField(
                        validators=[
                            django.core.validators.MinLengthValidator(
                                10, "متن کوتاه می\u200cباشد !"
                            )
                        ],
                        verbose_name="متن",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ثبت"),
                ),
            ],
            options={
                "verbose_name": "درخواست تماس با ما",
                "verbose_name_plural": "درخواست های تماس با ما",
            },
        ),
        migrations.CreateModel(
            name="News",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        max_length=128, unique=True, verbose_name="ایمیل"
                    ),
                ),
            ],
            options={
                "verbose_name": "کاربر",
                "verbose_name_plural": "کاربران خبرنامه",
            },
        ),
        migrations.CreateModel(
            name="Property",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(max_length=32, unique=True, verbose_name="نام"),
                ),
                (
                    "searchable",
                    models.BooleanField(
                        default=True, verbose_name="قابلیت جستجو در فیلتر فروشگاه"
                    ),
                ),
            ],
            options={
                "verbose_name": "ویژگی",
                "verbose_name_plural": "ویژگی ها",
            },
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=32, verbose_name="عنوان")),
                (
                    "slug",
                    models.SlugField(
                        allow_unicode=True,
                        max_length=32,
                        unique=True,
                        verbose_name="اسلاگ",
                    ),
                ),
            ],
            options={
                "verbose_name": "تگ",
                "verbose_name_plural": "تگ ها",
            },
        ),
        migrations.CreateModel(
            name="PropertyValue",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("value", models.CharField(max_length=32, verbose_name="مقدار")),
                (
                    "property",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="prop_values",
                        to="posts.property",
                        verbose_name="ویژگی",
                    ),
                ),
            ],
            options={
                "verbose_name": "مقدار ویژگی",
                "verbose_name_plural": "مقادیر ویژگی ها",
                "unique_together": {("property", "value")},
            },
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        primary_key=True, serialize=False, verbose_name="کد محصول"
                    ),
                ),
                ("title", models.CharField(max_length=128, verbose_name="عنوان")),
                (
                    "slug",
                    models.SlugField(
                        allow_unicode=True,
                        max_length=128,
                        unique=True,
                        verbose_name="اسلاگ",
                    ),
                ),
                (
                    "image1",
                    models.ImageField(upload_to="posts/", verbose_name="تصویر اول"),
                ),
                (
                    "image2",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="posts/",
                        verbose_name="تصویر دوم",
                    ),
                ),
                (
                    "image3",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="posts/",
                        verbose_name="تصویر سوم",
                    ),
                ),
                (
                    "image4",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="posts/",
                        verbose_name="تصویر چهارم",
                    ),
                ),
                (
                    "desc_short",
                    models.CharField(max_length=120, verbose_name="توضیح کوتاه"),
                ),
                ("desc", models.TextField(verbose_name="توضیحات")),
                (
                    "price",
                    models.CharField(blank=True, max_length=64, verbose_name="قیمت"),
                ),
                (
                    "avail",
                    models.BooleanField(default=True, verbose_name="وضعیت موجودی"),
                ),
                (
                    "off",
                    models.CharField(blank=True, max_length=2, verbose_name="تخفیف"),
                ),
                (
                    "off_days",
                    models.CharField(
                        blank=True, max_length=2, verbose_name="تعداد روز"
                    ),
                ),
                (
                    "off_time",
                    models.CharField(
                        blank=True,
                        choices=[("1", "صبح"), ("2", "ظهر"), ("3", "عصر"), ("4", "شب")],
                        max_length=1,
                        verbose_name="زمان تخفیف",
                    ),
                ),
                (
                    "off_date",
                    models.CharField(
                        editable=False, max_length=255, verbose_name="تاریخ پایان تخفیف"
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="زمان ایجاد"),
                ),
                (
                    "views",
                    models.PositiveIntegerField(
                        default=0, editable=False, verbose_name="تعداد بازدید"
                    ),
                ),
                ("meta", models.CharField(max_length=255, verbose_name="تگ متا")),
                (
                    "cats",
                    models.ManyToManyField(
                        related_name="posts",
                        to="posts.category",
                        verbose_name="دسته بندی ها",
                    ),
                ),
                (
                    "props",
                    models.ManyToManyField(
                        related_name="posts",
                        to="posts.propertyvalue",
                        verbose_name="ویژگی ها",
                    ),
                ),
                (
                    "tags",
                    models.ManyToManyField(
                        related_name="posts", to="posts.tag", verbose_name="تگ ها"
                    ),
                ),
            ],
            options={
                "verbose_name": "محصول",
                "verbose_name_plural": "محصولات",
                "ordering": ["-avail", "-id"],
            },
        ),
        migrations.AddField(
            model_name="category",
            name="props",
            field=models.ManyToManyField(
                blank=True,
                related_name="cats",
                to="posts.property",
                verbose_name="ویژگی ها",
            ),
        ),
    ]
