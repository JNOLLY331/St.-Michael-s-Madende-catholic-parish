from rest_framework.permissions import SAFE_METHODS, BasePermission
from rest_framework.request import Request
from django.views import View
from typing import Any


class IsContactAdmin(BasePermission):
    """Allows access only to authenticated staff users."""

    def has_permission(self, request: Request, view: View) -> bool:
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsAssignedStaff(BasePermission):
    """Allows access only to the staff member assigned to the object."""

    def has_object_permission(self, request: Request, view: View, obj: Any) -> bool:
        return bool(
            request.user 
            and request.user.is_authenticated 
            and getattr(obj, "assigned_to", None) == request.user
        )


class ReadOnly(BasePermission):
    """Allows access only via safe HTTP methods (GET, HEAD, OPTIONS)."""

    def has_permission(self, request: Request, view: View) -> bool:
        return request.method in SAFE_METHODS