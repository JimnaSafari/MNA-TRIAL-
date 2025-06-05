from django.db import models
from django.conf import settings

class Appointment(models.Model):
    TYPE_CHOICES = (
        ('court', 'Court Hearing'),
        ('client', 'Client Meeting'),
        ('internal', 'Internal Meeting'),
        ('other', 'Other'),
    )
    
    title = models.CharField(max_length=200)
    appointment_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    attendees = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='appointments')
    case = models.ForeignKey('cases.Case', on_delete=models.CASCADE, related_name='appointments', null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_appointments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reminder_sent = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['start_time']
        
    def __str__(self):
        return f"{self.title} - {self.start_time.strftime('%Y-%m-%d %H:%M')}" 