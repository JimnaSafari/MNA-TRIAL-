from rest_framework import permissions

class IsLeaveOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin users can access all leaves
        if request.user.role == 'admin':
            return True
        
        # Regular users can only access their own leaves
        return obj.user == request.user 