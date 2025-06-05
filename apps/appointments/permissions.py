from rest_framework import permissions

class IsAppointmentParticipant(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin users can access all appointments
        if request.user.role == 'admin':
            return True
        
        # Regular users can only access appointments they're assigned to
        return obj.assigned_to == request.user 