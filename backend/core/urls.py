from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "API is running",
        "auth": "/api/auth/",
        "token": "/api/token/",
        "prompts": "/api/prompts/"
    })

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api_root),

    path("api/auth/", include("authentication.urls")),
    path("api/prompts/", include("prompts.urls")),

    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]