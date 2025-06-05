from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CaseViewSet

router = DefaultRouter()
router.register('', CaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 