from django.db import models

class Client(models.Model):
    TYPE_CHOICES = (
        ('individual', 'Individual'),
        ('corporate', 'Corporate'),
        ('government', 'Government'),
    )
    
    name = models.CharField(max_length=200)
    client_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    registration_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    
    # For corporate clients
    company_name = models.CharField(max_length=200, blank=True)
    registration_number = models.CharField(max_length=50, blank=True)
    tax_number = models.CharField(max_length=50, blank=True)
    
    # For individual clients
    id_number = models.CharField(max_length=50, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        
    def __str__(self):
        if self.client_type == 'corporate':
            return f"{self.company_name} ({self.get_client_type_display()})"
        return f"{self.name} ({self.get_client_type_display()})" 