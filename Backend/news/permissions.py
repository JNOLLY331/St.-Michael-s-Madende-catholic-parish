from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsNewsManager(BasePermission):
    """Permission guard for users authorized to manage parish news and bulletins."""

    message = "You do not have permission to manage parish news."

    def has_permission(self, request, view):
        # 1. Allow read-only operations globally
        if request.method in SAFE_METHODS:
            return True

        user = request.user

        # 2. Block unauthenticated traffic for mutation paths
        if not user or not user.is_authenticated:
            return False

        # 3. Grant administrative super-access
        if user.is_superuser or user.is_staff:
            return True

        # 4. Enforce strict role-based constraints for parish executives
        return getattr(user, "role", None) in (
            "ADMIN",
            "PARISH_PRIEST",
            "SECRETARY",
            "COMMUNICATION",
        )