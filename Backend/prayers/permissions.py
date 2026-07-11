"""
Permissions for Prayer APIs.
"""

from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsPrayerCoordinator(BasePermission):
    """Allows staff or administrators to manage global prayer requests."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return bool(
            request.user 
            and request.user.is_authenticated 
            and (request.user.is_staff or request.user.is_superuser)
        )


class IsPrayerOwner(BasePermission):
    """Restricts access to updating or deleting an individual prayer request to its creator."""

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user 
            and request.user.is_authenticated 
            and obj.requester == request.user
        )