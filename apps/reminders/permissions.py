from rest_framework import permissions

class IsReminderOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin users can access all reminders
        if request.user.role == 'admin':
            return True
        
        # Regular users can only access reminders assigned to them
        return obj.assigned_to == request.user 