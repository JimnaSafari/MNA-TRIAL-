from rest_framework import serializers
from .models import Appointment
from apps.users.serializers import UserSerializer
from apps.clients.serializers import ClientSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    client = ClientSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('title', 'description', 'appointment_type', 'start_time', 
                 'end_time', 'status', 'client', 'assigned_to', 'location', 
                 'notes', 'reminder_sent') 