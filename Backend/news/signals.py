from django.db.models.signals import post_save
from django.dispatch import receiver

from news.models import News


@receiver(post_save, sender=News)
def news_created(sender, instance, created, **kwargs):
    """Placeholder signal for handling decoupling tasks (like cache clears) post-save."""
    if created:
        pass