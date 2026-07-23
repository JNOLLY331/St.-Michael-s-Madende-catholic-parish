import cloudinary
from rest_framework import serializers

from .models import (HeroSection, Leadership, MassSchedule, ParishInformation,
                     Saint, Statistic)


def _cloudinary_url(field_value):
    """Return a full HTTPS Cloudinary URL for a CloudinaryField value.

    CloudinaryField stores a public_id string. When the value is already
    an absolute URL (e.g. already resolved) we return it unchanged.
    When it is a raw public_id we build the URL via cloudinary.utils.
    """
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    # Build a secure URL from the public_id
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class ParishInformationSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    about_image = serializers.SerializerMethodField()

    class Meta:
        model = ParishInformation
        fields = "__all__"

    def get_logo(self, obj):
        return _cloudinary_url(obj.logo)

    def get_about_image(self, obj):
        return _cloudinary_url(obj.about_image)


class HeroSectionSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = "__all__"

    def get_background_image(self, obj):
        return _cloudinary_url(obj.background_image)


class LeadershipSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Leadership
        fields = "__all__"

    def get_photo(self, obj):
        return _cloudinary_url(obj.photo)


class MassScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassSchedule
        fields = "__all__"


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = "__all__"


class SaintSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Saint
        fields = "__all__"

    def get_image(self, obj):
        return _cloudinary_url(obj.image)
