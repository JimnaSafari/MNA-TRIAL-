from rest_framework import permissions

class IsAssignedToCase(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow admin users to access all cases
        if request.user.role == 'admin':
            return True
        
        # Allow users to access cases they are assigned to
        return obj.assigned_to == request.user 