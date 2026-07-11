from typing import Any
from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsSacramentAdmin(BasePermission):
    """Allows access only to authenticated administrative or staff users."""

    def has_permission(self, request: Any, view: Any) -> bool:
        return bool(
            request.user 
            and request.user.is_authenticated 
            and request.user.is_staff
        )


class ReadOnly(BasePermission):
    """Allows public access exclusively for safe HTTP methods (GET, HEAD, OPTIONS)."""

    def has_permission(self, request: Any, view: Any) -> bool:
        return request.method in SAFE_METHODS