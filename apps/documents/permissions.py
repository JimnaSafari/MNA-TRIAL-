from rest_framework import permissions

class IsDocumentOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin users can access all documents
        if request.user.role == 'admin':
            return True
        
        # Regular users can only access their own documents
        return obj.uploaded_by == request.user 