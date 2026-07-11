"""
Campaign serializers for the Donations application.
"""

from rest_framework import serializers

from donations.models import Campaign


class CampaignProgressMixin:
    """Shared mixin computing campaign funding progress percentage safely."""

    def get_progress(self, obj: Campaign) -> float:
        if not obj.target_amount or obj.target_amount == 0:
            return 0.0

        return round((obj.amount_raised / obj.target_amount) * 100, 2)


class CampaignListSerializer(CampaignProgressMixin, serializers.ModelSerializer):
    """Lightweight summary view for listing campaigns on public directories."""

    progress = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = (
            "id",
            "title",
            "slug",
            "target_amount",
            "amount_raised",
            "progress",
            "start_date",
            "end_date",
            "is_active",
        )


class CampaignDetailSerializer(CampaignProgressMixin, serializers.ModelSerializer):
    """Detailed profile view disclosing all structural metrics for a target campaign."""

    progress = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = "__all__"


class CampaignCreateUpdateSerializer(serializers.ModelSerializer):
    """Write-only serializer validating inputs used to spin up or edit active campaigns."""

    class Meta:
        model = Campaign
        exclude = (
            "slug",
            "amount_raised",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):
        # Gracefully account for partial updates (PATCH) where fields might be omitted
        start = attrs.get("start_date", getattr(self.instance, "start_date", None))
        end = attrs.get("end_date", getattr(self.instance, "end_date", None))

        if start and end and end < start:
            raise serializers.ValidationError(
                {"end_date": "End date cannot be before start date."}
            )

        return attrs