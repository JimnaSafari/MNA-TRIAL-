from rest_framework import serializers
from .models import Document
from apps.users.serializers import UserSerializer
from apps.cases.serializers import CaseSerializer

class DocumentSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    case = CaseSerializer(read_only=True)

    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class DocumentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('title', 'document_type', 'file', 'description', 'case', 'is_confidential') 