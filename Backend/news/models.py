from django.conf import settings
from django.db import models
from django.utils.text import slugify

from church.models import ParishInformation
from core.constants import NEWS_STATUS
from core.models import BaseModel

from .managers import NewsManager
from .validators import validate_featured_image


class NewsCategory(BaseModel):
    """Represents a category for organizing parish news articles."""

    name = models.CharField(
        max_length=100,
        unique=True,
        db_index=True,
    )
    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
    )
    description = models.TextField(
        blank=True,
    )
    color = models.CharField(
        max_length=20,
        default="#1565C0",
        help_text="Hex color used for UI display.",
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Optional icon class (Bootstrap Icons, FontAwesome, etc.)",
    )
    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        ordering = ("name",)
        verbose_name = "News Category"
        verbose_name_plural = "News Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class News(BaseModel):
    """Parish news, announcements, and bulletin articles."""

    objects = NewsManager()

    # -------------------------------------------------
    # Basic Information
    # -------------------------------------------------
    title = models.CharField(
        max_length=255,
        db_index=True,
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
    )
    excerpt = models.TextField(
        help_text="Short summary displayed on cards and listings.",
    )
    content = models.TextField()

    # -------------------------------------------------
    # Relationships
    # -------------------------------------------------
    parish = models.ForeignKey(
        ParishInformation,
        related_name="news_articles",
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        NewsCategory,
        related_name="articles",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="published_news",
        on_delete=models.SET_NULL,
        null=True,
    )

    # -------------------------------------------------
    # Media
    # -------------------------------------------------
    featured_image = models.ImageField(
        upload_to="news/images/",
        validators=[validate_featured_image],
        blank=True,
        null=True,
    )
    thumbnail = models.ImageField(
        upload_to="news/thumbnails/",
        blank=True,
        null=True,
    )

    # -------------------------------------------------
    # Publication
    # -------------------------------------------------
    status = models.CharField(
        max_length=20,
        choices=NEWS_STATUS,
        default="DRAFT",
        db_index=True,
    )
    is_featured = models.BooleanField(
        default=False,
    )
    is_published = models.BooleanField(
        default=False,
    )
    allow_comments = models.BooleanField(
        default=True,
    )

    # -------------------------------------------------
    # SEO
    # -------------------------------------------------
    meta_title = models.CharField(
        max_length=255,
        blank=True,
    )
    meta_description = models.TextField(
        blank=True,
    )
    keywords = models.CharField(
        max_length=500,
        blank=True,
    )

    # -------------------------------------------------
    # Statistics
    # -------------------------------------------------
    views = models.PositiveIntegerField(
        default=0,
    )
    likes = models.PositiveIntegerField(
        default=0,
    )
    shares = models.PositiveIntegerField(
        default=0,
    )

    # -------------------------------------------------
    # Publication Dates
    # -------------------------------------------------
    published_at = models.DateTimeField(
        null=True,
        blank=True,
    )
    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Optional expiry date for announcements.",
    )

    class Meta:
        ordering = (
            "-is_featured",
            "-published_at",
            "-created_at",
        )
        verbose_name = "News"
        verbose_name_plural = "News"
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["published_at"]),
            models.Index(fields=["is_featured"]),
            models.Index(fields=["slug"]),
        ]

    def __str__(self):
        return self.title

    @property
    def reading_time(self):
        """Estimated reading time in minutes."""
        words = len(self.content.split())
        return max(1, words // 200)

    def save(self, *args, **kwargs):
        """Automatically generate unique slug."""
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1

            while News.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = slug

        super().save(*args, **kwargs)