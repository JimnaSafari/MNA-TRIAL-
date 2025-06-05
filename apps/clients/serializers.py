from rest_framework import serializers
from .models import Client
from apps.users.serializers import UserSerializer

class ClientSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class ClientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'email', 'phone_number', 
                 'company_name', 'address', 'status', 'assigned_to', 
                 'notes', 'preferred_contact_method') 