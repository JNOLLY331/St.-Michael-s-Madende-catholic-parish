from django.contrib import admin
from .models import (
    ParishInformation,
    HeroSection,
    Leadership,
    MassSchedule,
    Statistic,
    Saint,
)
@admin.register(ParishInformation)
class ParishInformationAdmin(admin.ModelAdmin):
    list_display = (
        "parish_name",
        "phone",
        "email",)

    search_fields = (
        "parish_name",
        "email",
    )
    
@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "position",
        "phone",
        "is_active",
    )
    list_filter = (
        "position",
        "is_active",
    )
    search_fields = (
        "name",
        "position",
    )
    ordering = (
        "display_order",
    )
    
@admin.register(MassSchedule)
class MassScheduleAdmin(admin.ModelAdmin):

    list_display = (
        "day",
        "service_name",
        "language",
        "start_time",
        "is_active",
    )
    list_filter = (
        "day",
        "language",
    )
    ordering = (
        "display_order",
        "start_time",
    )
    
    
@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "value",
        "display_order",
    )

    ordering = (
        "display_order",
    )
    
@admin.register(Saint)
class SaintAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "feast_day",
        "display_order",
    )
    search_fields = (
        "name",
    )
    ordering = (
        "display_order",
    )
    
@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_active",
    )
    list_filter = (
        "is_active",
    )