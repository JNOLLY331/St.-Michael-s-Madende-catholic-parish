import django_filters

from .models import Ministry


class MinistryFilter(django_filters.FilterSet):

    class Meta:
        model = Ministry
        fields = [
            "category",
            "name",
            "is_featured",
            "is_active",
        ]
