from django.db import transaction
from django.db.models import F
from django.utils import timezone
from django.utils.text import slugify

from news.models import News


class NewsService:
    """Encapsulates all business logic related to News."""

    @staticmethod
    def _generate_unique_slug(title: str, instance=None) -> str:
        """Generate a unique slug for a news article."""
        base_slug = slugify(title)
        slug = base_slug
        counter = 1

        queryset = News.objects.all()
        if instance:
            queryset = queryset.exclude(pk=instance.pk)

        while queryset.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        return slug

    @staticmethod
    @transaction.atomic
    def create_news(validated_data: dict) -> News:
        """Create a news article."""
        validated_data["slug"] = NewsService._generate_unique_slug(
            validated_data["title"]
        )
        return News.objects.create(**validated_data)

    @staticmethod
    @transaction.atomic
    def update_news(news: News, validated_data: dict) -> News:
        """Update an existing article."""
        if "title" in validated_data:
            news.slug = NewsService._generate_unique_slug(
                validated_data["title"],
                news,
            )

        for field, value in validated_data.items():
            setattr(news, field, value)

        news.save()
        return news

    @staticmethod
    @transaction.atomic
    def publish(news: News) -> News:
        """Publish an article."""
        news.status = "PUBLISHED"
        news.is_published = True

        if not news.published_at:
            news.published_at = timezone.now()

        news.save(update_fields=["status", "is_published", "published_at"])
        return news

    @staticmethod
    @transaction.atomic
    def archive(news: News) -> News:
        """Archive an article."""
        news.status = "ARCHIVED"
        news.is_published = False
        news.save(update_fields=["status", "is_published"])
        return news

    @staticmethod
    @transaction.atomic
    def feature(news: News) -> News:
        """Mark article as featured."""
        news.is_featured = True
        news.save(update_fields=["is_featured"])
        return news

    @staticmethod
    @transaction.atomic
    def unfeature(news: News) -> News:
        """Remove featured flag."""
        news.is_featured = False
        news.save(update_fields=["is_featured"])
        return news

    @staticmethod
    def increment_views(news: News) -> None:
        """Increase article view count safely using F expressions to avoid race conditions."""
        news.views = F("views") + 1
        news.save(update_fields=["views"])

    @staticmethod
    def increment_likes(news: News) -> None:
        """Increase like count safely using F expressions."""
        news.likes = F("likes") + 1
        news.save(update_fields=["likes"])

    @staticmethod
    def increment_shares(news: News) -> None:
        """Increase share count safely using F expressions."""
        news.shares = F("shares") + 1
        news.save(update_fields=["shares"])