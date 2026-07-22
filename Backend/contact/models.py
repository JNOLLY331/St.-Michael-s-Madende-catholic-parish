"""
Enterprise models for the Contact application.
"""

from __future__ import annotations

import uuid
from typing import Any

from django.conf import settings
from django.core.validators import MaxLengthValidator, MinLengthValidator
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify
from cloudinary.models import CloudinaryField

from core.models import BaseModel
from contact.managers import ContactDepartmentManager, ContactMessageManager, FAQManager
from contact.validators import (
    detect_spam,
    validate_attachment,
    validate_contact_email,
    validate_message,
    validate_phone_number,
    validate_subject,
)


class MessageStatus(models.TextChoices):
    NEW = "NEW", "New"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    RESPONDED = "RESPONDED", "Responded"
    CLOSED = "CLOSED", "Closed"
    SPAM = "SPAM", "Spam"


class MessagePriority(models.TextChoices):
    LOW = "LOW", "Low"
    NORMAL = "NORMAL", "Normal"
    HIGH = "HIGH", "High"
    URGENT = "URGENT", "Urgent"


class ContactDepartment(BaseModel):
    """Parish office or ministry department routing contact requests."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True, db_index=True)
    slug = models.SlugField(unique=True, max_length=120)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True, validators=[validate_phone_number])
    description = models.TextField(blank=True)
    office_hours = models.CharField(max_length=255, blank=True)
    icon = models.CharField(max_length=100, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)

    objects = ContactDepartmentManager()

    class Meta:
        ordering = ("display_order", "name")
        verbose_name = "Contact Department"
        verbose_name_plural = "Contact Departments"
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["is_active"]),
            models.Index(fields=["display_order"]),
        ]

    def __str__(self) -> str:
        return self.name

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("contact:department-detail", kwargs={"pk": self.pk})


class ContactMessage(BaseModel):
    """Contact enquiry submitted by a website visitor."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference = models.CharField(max_length=20, unique=True, editable=False, db_index=True)
    department = models.ForeignKey(
        ContactDepartment,
        related_name="messages",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    full_name = models.CharField(max_length=150)
    email = models.EmailField(validators=[validate_contact_email], db_index=True)
    phone = models.CharField(max_length=30, blank=True, validators=[validate_phone_number])
    subject = models.CharField(max_length=255, validators=[validate_subject, MinLengthValidator(5)])
    message = models.TextField(
        validators=[validate_message, MinLengthValidator(10), MaxLengthValidator(5000)]
    )
    attachment = CloudinaryField(
        'attachment',
        folder="contact/attachments",           # organizes files nicely
        resource_type="auto",                   # allows images, pdfs, docs etc.
        blank=True,
        null=True,
        validators=[validate_attachment],

    )
  
    status = models.CharField(
        max_length=20, choices=MessageStatus.choices, default=MessageStatus.NEW, db_index=True
    )
    priority = models.CharField(
        max_length=20, choices=MessagePriority.choices, default=MessagePriority.NORMAL, db_index=True
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="assigned_contact_messages",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    response = models.TextField(blank=True)
    internal_notes = models.TextField(blank=True)
    is_read = models.BooleanField(default=False, db_index=True)
    is_spam = models.BooleanField(default=False, db_index=True)
    responded_at = models.DateTimeField(null=True, blank=True)

    objects = ContactMessageManager()

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
        indexes = [
            models.Index(fields=["reference"]),
            models.Index(fields=["email"]),
            models.Index(fields=["status"]),
            models.Index(fields=["priority"]),
            models.Index(fields=["department"]),
            models.Index(fields=["is_read"]),
            models.Index(fields=["is_spam"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self) -> str:
        return f"{self.reference} - {self.subject}"

    @property
    def sender(self) -> str:
        return f"{self.full_name} <{self.email}>"

    @property
    def is_open(self) -> bool:
        return self.status not in (MessageStatus.CLOSED, MessageStatus.SPAM)

    def generate_reference(self) -> None:
        """Generates a unique reference number using timestamp or fallback."""
        if self.reference:
            return
        
        # Safe fallback logic if created_at hasn't been set by database lifecycle yet
        date_obj = self.created_at or timezone.now()
        date_part = date_obj.strftime("%Y%m%d")
        unique = uuid.uuid4().hex[:6].upper()
        self.reference = f"CNT-{date_part}-{unique}"

    def mark_as_read(self) -> None:
        self.is_read = True
        self.save(update_fields=["is_read"])

    def mark_as_unread(self) -> None:
        self.is_read = False
        self.save(update_fields=["is_read"])

    def assign(self, user: Any) -> None:
        self.assigned_to = user
        if self.status == MessageStatus.NEW:
            self.status = MessageStatus.IN_PROGRESS
        self.save(update_fields=["assigned_to", "status"])

    def close(self) -> None:
        self.status = MessageStatus.CLOSED
        self.save(update_fields=["status"])

    def mark_as_spam(self) -> None:
        self.is_spam = True
        self.status = MessageStatus.SPAM
        self.save(update_fields=["is_spam", "status"])

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.reference:
            self.generate_reference()

        if detect_spam(self.subject, self.message):
            self.is_spam = True
            self.status = MessageStatus.SPAM

        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("contact:message-detail", kwargs={"pk": self.pk})


class FAQ(BaseModel):
    """Frequently Asked Questions."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=255, unique=True, db_index=True)
    slug = models.SlugField(max_length=260, unique=True, blank=True)
    answer = models.TextField(validators=[MinLengthValidator(10)])
    category = models.CharField(max_length=100, default="General", db_index=True)
    display_order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_published = models.BooleanField(default=True, db_index=True)

    objects = FAQManager()

    class Meta:
        ordering = ("display_order", "question")
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["is_featured"]),
            models.Index(fields=["is_published"]),
            models.Index(fields=["display_order"]),
            models.Index(fields=["slug"]),
        ]

    def __str__(self) -> str:
        return self.question

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            self.slug = slugify(self.question)
        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("contact:faq-detail", kwargs={"pk": self.pk})