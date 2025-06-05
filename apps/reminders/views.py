from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Reminder
from .serializers import ReminderSerializer, ReminderCreateSerializer
from .permissions import IsReminderOwner

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'reminder_type', 'assigned_to']
    search_fields = ['title', 'description']
    ordering_fields = ['due_date', 'created_at']
    ordering = ['-due_date']

    def get_serializer_class(self):
        if self.action == 'create':
            return ReminderCreateSerializer
        return ReminderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Reminder.objects.all()
        return Reminder.objects.filter(assigned_to=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [IsReminderOwner()]
        return [permissions.IsAuthenticated()] 