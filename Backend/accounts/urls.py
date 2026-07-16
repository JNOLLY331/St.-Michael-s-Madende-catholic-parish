from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (ChangePasswordView, ForgotPasswordView, LoginView,
                    LogoutView, ProfileView, RegisterView, ResetPasswordView,
<<<<<<< HEAD
                    VerifyEmailView, UserListView)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("users/", UserListView.as_view(), name="users"),
=======
                    VerifyEmailView)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
    path(
        "verify-email/<uidb64>/<token>/", VerifyEmailView.as_view(), name="verify-email"
    ),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordView.as_view(),
        name="reset-password",
    ),
]
