from django.contrib import admin
from .models import *

class SaleAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'type_sale', 'observation', 'total_prod', 'total_sale', 'is_canceled', 'user_creation', 'date_creation', 'user_updated', 'date_updated']
    list_display_links = ['id', 'user']
    readonly_fields = ['user_creation','date_creation', 'user_updated', 'date_updated']

admin.site.register(Sale, SaleAdmin)
