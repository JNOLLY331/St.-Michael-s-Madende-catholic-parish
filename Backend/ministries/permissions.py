from rest_framework.permissions import BasePermission


class IsMinistryManager(BasePermission):
    message = "You don't have permission to manage ministries."

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        return request.user.role in ["SUPER_ADMIN", "PARISH_PRIEST", "SECRETARY"]
