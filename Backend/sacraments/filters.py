import django_filters

from sacraments.models import (
    Sacrament,
    SacramentApplication,
    SacramentRequirement,
)


class SacramentFilter(django_filters.FilterSet):
    """Filter class targeting structural attributes of the Sacrament model."""

    class Meta:
        model = Sacrament
        fields = ["is_active"]


class SacramentRequirementFilter(django_filters.FilterSet):
    """Filter class targeting operational properties of Sacrament prerequisites."""

    class Meta:
        model = SacramentRequirement
        fields = ["sacrament", "required"]


class SacramentApplicationFilter(django_filters.FilterSet):
    """Filter class targeting submission workflows within the application pipeline."""

    class Meta:
        model = SacramentApplication
        fields = ["status", "sacrament"]