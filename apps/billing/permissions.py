from rest_framework import permissions

class IsInvoiceOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admin users can access all invoices
        if request.user.role == 'admin':
            return True
        
        # Regular users can only access invoices they created
        return obj.created_by == request.user 