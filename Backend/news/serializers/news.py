import cloudinary
import cloudinary.utils
from django.utils import timezone
from rest_framework import serializers

from news.models import News


def _cloudinary_url(field_value):
    """Convert a Cloudinary public_id or relative path to a full HTTPS URL."""
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    # Plain ImageField paths like 'news/images/foo.jpg' go through cloudinary_storage
    # but their .url may still be relative in the serializer; build explicitly.
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class NewsListSerializer(serializers.ModelSerializer):
    """Serializer for displaying a scannable summary list of news articles."""

    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    parish = serializers.StringRelatedField()
    reading_time = serializers.ReadOnlyField()
    featured_image = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = (
            "id",
            "title",
            "slug",
            "excerpt",
            "featured_image",
            "thumbnail",
            "category",
            "author",
            "parish",
            "status",
            "is_featured",
            "views",
            "likes",
            "shares",
            "reading_time",
            "published_at",
        )

    def get_featured_image(self, obj):
        if not obj.featured_image:
            return None
        try:
            return obj.featured_image.url
        except Exception:
            return _cloudinary_url(str(obj.featured_image))

    def get_thumbnail(self, obj):
        if not obj.thumbnail:
            return None
        try:
            return obj.thumbnail.url
        except Exception:
            return _cloudinary_url(str(obj.thumbnail))


class NewsDetailSerializer(serializers.ModelSerializer):
    """Serializer for pulling complete field payloads for target detail layouts."""

    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    parish = serializers.StringRelatedField()
    reading_time = serializers.ReadOnlyField()
    featured_image = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = "__all__"

    def get_featured_image(self, obj):
        if not obj.featured_image:
            return None
        try:
            return obj.featured_image.url
        except Exception:
            return _cloudinary_url(str(obj.featured_image))

    def get_thumbnail(self, obj):
        if not obj.thumbnail:
            return None
        try:
            return obj.thumbnail.url
        except Exception:
            return _cloudinary_url(str(obj.thumbnail))


class NewsCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer guarding payload extraction for administrative mutations."""

    class Meta:
        model = News
        exclude = (
            "slug",
            "views",
            "likes",
            "shares",
            "created_at",
            "updated_at",
        )

    def validate_title(self, value):
        value = value.strip()
        if len(value) < 5:
            raise serializers.ValidationError(
                "Title must contain at least 5 characters."
            )
        return value

    def validate_excerpt(self, value):
        value = value.strip()
        if len(value) < 20:
            raise serializers.ValidationError(
                "Excerpt must contain at least 20 characters."
            )
        return value

    def validate_content(self, value):
        value = value.strip()
        if len(value) < 100:
            raise serializers.ValidationError(
                "Content must contain at least 100 characters."
            )
        return value

    def validate(self, attrs):
        # Gracefully merge existing instance states for PATCH/partial operations
        published_at = attrs.get(
            "published_at", getattr(self.instance, "published_at", None)
        )
        expires_at = attrs.get(
            "expires_at", getattr(self.instance, "expires_at", None)
        )
        status = attrs.get("status", getattr(self.instance, "status", "DRAFT"))

        if published_at and expires_at and expires_at <= published_at:
            raise serializers.ValidationError(
                {"expires_at": "Expiry date must be after the publication date."}
            )

        if published_at and published_at > timezone.now() and status == "PUBLISHED":
            raise serializers.ValidationError(
                {
                    "published_at": (
                        "Publication date cannot be in the future for published news."
                    )
                }
            )

        return attrs