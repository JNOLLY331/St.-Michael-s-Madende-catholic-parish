from django.apps import AppConfig


class MinistriesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "ministries"

    def ready(self):
        import ministries.signals
