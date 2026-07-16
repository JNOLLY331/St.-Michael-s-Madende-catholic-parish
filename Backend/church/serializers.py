from rest_framework import serializers

from .models import (HeroSection, Leadership, MassSchedule, ParishInformation,
                     Saint, Statistic)


class ParishInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParishInformation
        fields = "__all__"


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = "__all__"


class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = "__all__"


class MassScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassSchedule
        fields = "__all__"


class MassScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassSchedule
        fields = "__all__"


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = "__all__"


class SaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saint
        fields = "__all__"
