import django_filters

from news.models import News


class NewsFilter(django_filters.FilterSet):
    """Advanced filtering engine for sorting and searching parish news articles."""

    category = django_filters.CharFilter(
        field_name="category__slug",
        lookup_expr="iexact",
    )
    author = django_filters.CharFilter(
        field_name="author__username",
        lookup_expr="iexact",
    )
    title = django_filters.CharFilter(
        lookup_expr="icontains",
    )
    status = django_filters.CharFilter()
    is_featured = django_filters.BooleanFilter()
    
    # Date-range operational filters
    published_after = django_filters.DateFilter(
        field_name="published_at",
        lookup_expr="gte",
    )
    published_before = django_filters.DateFilter(
        field_name="published_at",
        lookup_expr="lte",
    )

    class Meta:
        model = News
        fields = (
            "category",
            "author",
            "status",
            "is_featured",
        )