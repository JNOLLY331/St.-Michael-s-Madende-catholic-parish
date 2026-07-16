"""
Permission classes for the Events application.
"""

from rest_framework.permissions import SAFE_METHODS, BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView


class IsEventManager(BasePermission):
    """
    Allows read access to anyone, but write access only to authorized roles.
    """

    message = "You do not have permission to manage parish events."

    allowed_roles = {
        "SUPER_ADMIN",
        "PARISH_PRIEST",
        "SECRETARY",
        "EVENT_COORDINATOR",
    }

    def has_permission(self, request: Request, view: APIView) -> bool:
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Checks custom role field on custom User model
        return getattr(user, "role", None) in self.allowed_roles


class IsOrganizerOrAdmin(BasePermission):
    """
    Object-level permission allowing updates only by super admins or the event organizer.
    """

    def has_object_permission(self, request: Request, view: APIView, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if not user or not user.is_authenticated:
            return False

        if getattr(user, "role", None) == "SUPER_ADMIN":
            return True

        # Ensure the model instance 'obj' has an 'organizer' field pointing to a user instance
        return getattr(obj, "organizer", None) == user
