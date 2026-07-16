"""
Business logic for Event operations.

This module keeps the views thin by encapsulating all
event-related business rules.
"""

from django.db import transaction
from django.utils.text import slugify

from events.models import Event


class EventService:
    """
    Handles Event business logic.
    """

    @staticmethod
    @transaction.atomic
    def create_event(validated_data: dict) -> Event:
        """
        Create a new parish event with a unique slug.
        """
        title = validated_data["title"]
        slug = slugify(title)
        counter = 1

        # Resolve slug collisions
        while Event.objects.filter(slug=slug).exists():
            slug = f"{slugify(title)}-{counter}"
            counter += 1

        validated_data["slug"] = slug
        return Event.objects.create(**validated_data)

    @staticmethod
    @transaction.atomic
    def update_event(event: Event, validated_data: dict) -> Event:
        """
        Update an existing event dynamically based on validated data.
        """
        for field, value in validated_data.items():
            setattr(event, field, value)

        event.save()
        return event

    @staticmethod
    @transaction.atomic
    def publish_event(event: Event) -> Event:
        """
        Publish an event and update status flags.
        """
        event.status = "PUBLISHED"
        event.is_published = True
        event.save(update_fields=["status", "is_published"])
        return event

    @staticmethod
    @transaction.atomic
    def unpublish_event(event: Event) -> Event:
        """
        Move an event back to draft status.
        """
        event.status = "DRAFT"
        event.is_published = False
        event.save(update_fields=["status", "is_published"])
        return event

    @staticmethod
    @transaction.atomic
    def cancel_event(event: Event) -> Event:
        """
        Cancel an event.
        """
        event.status = "CANCELLED"
        event.save(update_fields=["status"])
        return event

    @staticmethod
    @transaction.atomic
    def feature_event(event: Event) -> Event:
        """
        Mark an event as featured.
        """
        event.is_featured = True
        event.save(update_fields=["is_featured"])
        return event

    @staticmethod
    @transaction.atomic
    def unfeature_event(event: Event) -> Event:
        """
        Remove the featured status from an event.
        """
        event.is_featured = False
        event.save(update_fields=["is_featured"])
        return event
