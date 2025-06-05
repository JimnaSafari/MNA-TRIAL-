from django.db import models
from django.conf import settings

class Reminder(models.Model):
    PRIORITY_CHOICES = (
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('sent', 'Sent'),
        ('cancelled', 'Cancelled'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reminders')
    case = models.ForeignKey('cases.Case', on_delete=models.CASCADE, related_name='reminders', null=True, blank=True)
    appointment = models.ForeignKey('appointments.Appointment', on_delete=models.CASCADE, related_name='reminders', null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_reminders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reminder_sent = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['due_date']
        
    def __str__(self):
        return f"{self.title} - Due: {self.due_date.strftime('%Y-%m-%d %H:%M')}" 