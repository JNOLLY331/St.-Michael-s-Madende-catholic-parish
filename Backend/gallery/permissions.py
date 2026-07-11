"""
Permissions for the Gallery application APIs.
"""

from rest_framework.permissions import BasePermission


class IsGalleryManager(BasePermission):
    """Restricts content modification endpoints to administrative or staff users."""

    message = "You do not have permission to manage gallery content."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.is_superuser)
        )


class CanUploadMedia(BasePermission):
    """Allows any verified, logged-in portal user to submit and upload files."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)