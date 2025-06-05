from rest_framework import serializers
from .models import Case
from apps.users.serializers import UserSerializer
from apps.clients.serializers import ClientSerializer

class CaseSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    client = ClientSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class CaseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ('title', 'case_number', 'description', 'status', 'priority',
                 'assigned_to', 'client', 'court_date', 'court_location') 