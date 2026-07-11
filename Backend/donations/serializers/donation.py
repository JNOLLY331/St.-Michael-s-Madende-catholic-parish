from rest_framework import serializers

from donations.models import Donation


class DonationListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing donations.
    """

    donor = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    campaign = serializers.StringRelatedField()

    class Meta:
        model = Donation
        fields = (
            "id",
            "amount",
            "payment_method",
            "payment_status",
            "transaction_reference",
            "receipt_number",
            "anonymous",
            "created_at",
            "donor",
            "category",
            "campaign",
        )


class DonationDetailSerializer(serializers.ModelSerializer):
    """
    Detailed donation serializer.
    """

    donor = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    campaign = serializers.StringRelatedField()

    class Meta:
        model = Donation
        fields = "__all__"


class DonationCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating donations.
    """

    class Meta:
        model = Donation
        exclude = (
            "receipt_number",
            "transaction_reference",
            "created_at",
            "updated_at",
        )

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Donation amount must be greater than zero."
            )
        return value