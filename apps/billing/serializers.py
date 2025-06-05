from rest_framework import serializers
from .models import Invoice, Payment
from apps.users.serializers import UserSerializer
from apps.clients.serializers import ClientSerializer

class InvoiceSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class InvoiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ('invoice_number', 'client', 'description', 'items', 
                 'subtotal', 'tax_rate', 'tax_amount', 'total_amount', 
                 'due_date', 'status', 'notes')

class PaymentSerializer(serializers.ModelSerializer):
    invoice = InvoiceSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class PaymentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('payment_number', 'invoice', 'amount', 'payment_date', 
                 'payment_method', 'reference_number', 'notes') 