
from django.core.management.base import BaseCommand
from datetime import datetime
from posts.models import Post

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Post.objects.filter(off_date__lt=datetime.now().timestamp()).update(off='', off_days='', off_time='', off_date='')

