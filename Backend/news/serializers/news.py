from django.utils import timezone
from rest_framework import serializers

from news.models import News


class NewsListSerializer(serializers.ModelSerializer):
    """Serializer for displaying a scannable summary list of news articles."""

    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    parish = serializers.StringRelatedField()
    reading_time = serializers.ReadOnlyField()

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


class NewsDetailSerializer(serializers.ModelSerializer):
    """Serializer for pulling complete field payloads for target detail layouts."""

    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    parish = serializers.StringRelatedField()
    reading_time = serializers.ReadOnlyField()

    class Meta:
        model = News
        fields = "__all__"


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