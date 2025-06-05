from rest_framework import permissions

class IsClientOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin users can access all clients
        if request.user.role == 'admin':
            return True
        
        # Regular users can only access clients assigned to them
        return obj.assigned_to == request.user 