from rest_framework.permissions import BasePermission


class IsSuperAdmin(BasePermission):
    def has_permission(
        self,
        request,
        view,
    ):
        return request.user.is_authenticated and request.user.role == "SUPER_ADMIN"


class IsPriest(BasePermission):
    def has_permission(
        self,
        request,
        view,
    ):
        return request.user.is_authenticated and request.user.role in [
            "PARISH_PRIEST",
            "ASSISTANT_PRIEST",
        ]


class IsFinanceOfficer(BasePermission):
    def has_permission(
        self,
        request,
        view,
    ):
        return request.user.is_authenticated and request.user.role == "FINANCE"


class IsSecretary(BasePermission):
    def has_permission(
        self,
        request,
        view,
    ):
        return request.user.is_authenticated and request.user.role == "SECRETARY"
