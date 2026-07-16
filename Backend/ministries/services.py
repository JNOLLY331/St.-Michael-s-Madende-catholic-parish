from .models import Ministry


class MinistryService:

    @staticmethod
    def create_ministry(validated_data):
        return Ministry.objects.create(**validated_data)

    @staticmethod
    def update_ministry(instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance
