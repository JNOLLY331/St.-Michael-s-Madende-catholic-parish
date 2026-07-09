from rest_framework import serializers

from news.models import NewsCategory


class NewsCategorySerializer(serializers.ModelSerializer):
    """Serializer for listing and retrieving news categories with active counts."""

    total_articles = serializers.SerializerMethodField()

    class Meta:
        model = NewsCategory
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "color",
            "is_active",
            "total_articles",
            "created_at",
            "updated_at",
        )

    def get_total_articles(self, obj):
        # Dynamically calculate only public-facing articles
        return obj.news.filter(
            is_published=True,
            status="PUBLISHED",
        ).count()


class NewsCategoryCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer optimized for adding or modifying news categories."""

    class Meta:
        model = NewsCategory
        fields = (
            "name",
            "description",
            "color",
            "is_active",
        )