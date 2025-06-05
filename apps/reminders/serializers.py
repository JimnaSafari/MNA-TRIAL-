from rest_framework import serializers
from .models import Reminder
from apps.users.serializers import UserSerializer

class ReminderSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Reminder
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class ReminderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ('title', 'description', 'reminder_type', 'due_date', 
                 'status', 'assigned_to', 'priority', 'notes') 