
from django.core.management.base import BaseCommand
from datetime import datetime
from posts.models import Post
from datetime import timedelta
from django.db.models import F
from django.utils.timezone import make_aware


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        up_list = []
        posts = Post.objects.exclude(off='').only('off_date')
        for post in posts:
            post.off_date = (make_aware(datetime.fromtimestamp(float(post.off_date))) -timedelta(days=1)).timestamp()
            up_list.append(post)

        posts.bulk_update(up_list, ['off_date'])
        # Post.objects.filter(off_date__lt=datetime.now().timestamp()).update(off='', off_days='', off_time='', off_date='')

