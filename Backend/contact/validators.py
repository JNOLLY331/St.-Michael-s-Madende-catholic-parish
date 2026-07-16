"""
Validation utilities for the Contact application.
"""

from __future__ import annotations

import mimetypes
import re
from pathlib import Path
from typing import Any

from django.core.exceptions import ValidationError
from django.core.validators import validate_email

# Configuration Limits
MIN_SUBJECT_LENGTH = 5
MAX_SUBJECT_LENGTH = 255
MIN_MESSAGE_LENGTH = 10
MAX_MESSAGE_LENGTH = 5000
MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024  # 10MB

# Allowed File Types
ALLOWED_FILE_EXTENSIONS = {".pdf", ".doc", ".docx", ".txt", ".jpg", ".jpeg", ".png"}
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/jpeg",
    "image/png",
}

# Regex Patterns
PHONE_REGEX = re.compile(r"^\+?[0-9\s\-()]{7,20}$")
URL_REGEX = re.compile(r"(https?://|www\.)", re.IGNORECASE)
REPEATED_CHARACTER_REGEX = re.compile(r"(.)\1{10,}")

# Spam Keywords
BLACKLISTED_TERMS = {"bitcoin", "casino", "crypto", "loan", "forex", "viagra", "free money"}


def validate_contact_email(value: str) -> None:
    """Validate email address structure."""
    validate_email(value)


def validate_phone_number(value: str | None) -> None:
    """Validate phone number format using regex."""
    if not value:
        return

    if not PHONE_REGEX.match(value):
        raise ValidationError("Enter a valid phone number.")


def validate_subject(value: str) -> None:
    """Ensure subject meets length limits."""
    cleaned_value = value.strip()

    if len(cleaned_value) < MIN_SUBJECT_LENGTH:
        raise ValidationError(f"Subject must contain at least {MIN_SUBJECT_LENGTH} characters.")

    if len(cleaned_value) > MAX_SUBJECT_LENGTH:
        raise ValidationError(f"Subject cannot exceed {MAX_SUBJECT_LENGTH} characters.")


def validate_message(value: str) -> None:
    """Ensure message meets length limits and does not contain gibberish."""
    cleaned_value = value.strip()

    if len(cleaned_value) < MIN_MESSAGE_LENGTH:
        raise ValidationError(f"Message must contain at least {MIN_MESSAGE_LENGTH} characters.")

    if len(cleaned_value) > MAX_MESSAGE_LENGTH:
        raise ValidationError(f"Message cannot exceed {MAX_MESSAGE_LENGTH} characters.")

    if REPEATED_CHARACTER_REGEX.search(cleaned_value):
        raise ValidationError("Message contains suspicious repeated characters.")


def validate_attachment(file: Any) -> None:
    """Validate file extension, MIME type, and size."""
    if not file:
        return

    # Check extension
    extension = Path(file.name).suffix.lower()
    if extension not in ALLOWED_FILE_EXTENSIONS:
        raise ValidationError("Unsupported attachment type.")

    # Check MIME type
    mime_type, _ = mimetypes.guess_type(file.name)
    mime_type = mime_type or getattr(file, "content_type", None)
    if mime_type not in ALLOWED_MIME_TYPES:
        raise ValidationError("Invalid attachment format.")

    # Check file size
    if file.size > MAX_ATTACHMENT_SIZE:
        raise ValidationError("Attachment cannot exceed 10 MB.")


def detect_spam(subject: str, message: str) -> bool:
    """Heuristic spam detection based on links, spam words, and gibberish."""
    text = f"{subject} {message}".lower()

    if URL_REGEX.search(text) or REPEATED_CHARACTER_REGEX.search(text):
        return True

    return any(term in text for term in BLACKLISTED_TERMS)