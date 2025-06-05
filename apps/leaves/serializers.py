from rest_framework import serializers
from .models import Leave
from apps.users.serializers import UserSerializer

class LeaveSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    approved_by = UserSerializer(read_only=True)

    class Meta:
        model = Leave
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class LeaveCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ('leave_type', 'start_date', 'end_date', 'reason', 'status') 