from django.db import models
from django.conf import settings

class Document(models.Model):
    TYPE_CHOICES = (
        ('court', 'Court Document'),
        ('contract', 'Contract'),
        ('brief', 'Legal Brief'),
        ('memo', 'Memo'),
        ('other', 'Other'),
    )
    
    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    file = models.FileField(upload_to='documents/%Y/%m/%d/')
    description = models.TextField(blank=True)
    case = models.ForeignKey('cases.Case', on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='uploaded_documents')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_confidential = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.title} ({self.get_document_type_display()})" 