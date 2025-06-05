from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Leave
from .serializers import LeaveSerializer, LeaveCreateSerializer
from .permissions import IsLeaveOwner

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'leave_type', 'user']
    search_fields = ['reason']
    ordering_fields = ['start_date', 'end_date', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return LeaveCreateSerializer
        return LeaveSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Leave.objects.all()
        return Leave.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [IsLeaveOwner()]
        return [permissions.IsAuthenticated()] 