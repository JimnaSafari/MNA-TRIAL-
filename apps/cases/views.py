from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Case
from .serializers import CaseSerializer, CaseCreateSerializer
from .permissions import IsAssignedToCase

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'assigned_to']
    search_fields = ['title', 'case_number', 'description']
    ordering_fields = ['created_at', 'updated_at', 'court_date']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return CaseCreateSerializer
        return CaseSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Case.objects.all()
        return Case.objects.filter(assigned_to=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [IsAssignedToCase()]
        return super().get_permissions() 