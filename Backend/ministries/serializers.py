from rest_framework import serializers

from .models import Ministry


class MinistrySerializer(serializers.ModelSerializer):
    leader_name = serializers.SerializerMethodField()
    assistant_name = serializers.SerializerMethodField()

    class Meta:
        model = Ministry
        fields = "__all__"
        read_only_fields = (
            "id",
            "slug",
            "created_at",
            "updated_at",
        )

    def get_leader_name(self, obj):
        if obj.leader:
            return obj.leader.get_full_name()
        return None

    def get_assistant_name(self, obj):
        if obj.assistant_leader:
            return obj.assistant_leader.get_full_name()
        return None
