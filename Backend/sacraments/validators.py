"""Validation utilities for the Sacraments application."""

from __future__ import annotations

import mimetypes
import re
from pathlib import Path
from typing import Any

from django.core.exceptions import ValidationError
from django.core.validators import validate_email

MAX_NAME_LENGTH = 150
MIN_NAME_LENGTH = 3

MAX_MESSAGE_LENGTH = 3000
MIN_MESSAGE_LENGTH = 10

MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024  # 10 MB

PHONE_REGEX = re.compile(r"^\+?[0-9\s\-()]{7,20}$")

ALLOWED_FILE_EXTENSIONS = {
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
}

ALLOWED_MIME_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
}


def validate_applicant_name(value: str) -> None:
    """Validates that the applicant name falls within acceptable bounds."""
    if not value:
        raise ValidationError("Applicant name cannot be empty.")
        
    value = value.strip()

    if len(value) < MIN_NAME_LENGTH:
        raise ValidationError(
            f"Applicant name must contain at least {MIN_NAME_LENGTH} characters."
        )

    if len(value) > MAX_NAME_LENGTH:
        raise ValidationError(
            f"Applicant name cannot exceed {MAX_NAME_LENGTH} characters."
        )


def validate_contact_email(value: str) -> None:
    """Validates that the email string conforms to standard structure formats."""
    validate_email(value)


def validate_phone_number(value: str | None) -> None:
    """Validates structural components of incoming phone strings."""
    if value and not PHONE_REGEX.match(value):
        raise ValidationError("Enter a valid phone number.")


def validate_message(value: str | None) -> None:
    """Validates structural components of incoming multi-line messages."""
    if not value:
        return

    value = value.strip()

    if len(value) < MIN_MESSAGE_LENGTH:
        raise ValidationError(
            f"Message must contain at least {MIN_MESSAGE_LENGTH} characters."
        )

    if len(value) > MAX_MESSAGE_LENGTH:
        raise ValidationError(
            f"Message cannot exceed {MAX_MESSAGE_LENGTH} characters."
        )


def validate_attachment(file: Any) -> None:
    """Validates uploaded media extensions, actual MIME types, and total size constraints."""
    if not file:
        return

    extension = Path(file.name).suffix.lower()

    if extension not in ALLOWED_FILE_EXTENSIONS:
        raise ValidationError("Unsupported attachment type.")

    mime_type, _ = mimetypes.guess_type(file.name)

    mime_type = mime_type or getattr(
        file,
        "content_type",
        None,
    )

    if mime_type not in ALLOWED_MIME_TYPES:
        raise ValidationError("Invalid attachment format.")

    if file.size > MAX_ATTACHMENT_SIZE:
        raise ValidationError("Attachment cannot exceed 10 MB.")