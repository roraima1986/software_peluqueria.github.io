from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'is_active', 'is_staff', 'is_superuser')
    list_display_links = ('id', 'username')

admin.site.register(User, UserAdmin)


