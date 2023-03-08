from django.contrib import admin
from .models import *

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'user_creation', 'date_creation', 'user_updated', 'date_updated']
    list_display_links = ['name']
    readonly_fields = ['user_creation','date_creation', 'user_updated', 'date_updated']

class ProviderAdmin(admin.ModelAdmin):
    list_display = ['name', 'rut', 'phone', 'email', 'address', 'observation', 'user_creation', 'date_creation', 'user_updated', 'date_updated']
    list_display_links = ['name']
    readonly_fields = ['user_creation', 'date_creation', 'user_updated', 'date_updated']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'barcode', 'category', 'range_stock', 'cant', 'price_purchase', 'price_sale', 'ganancy', 'status', 'user_creation', 'date_creation', 'user_updated', 'date_updated']
    list_display_links = ['name']
    readonly_fields = ['user_creation', 'date_creation', 'user_updated', 'date_updated']

class BuyAdmin(admin.ModelAdmin):
    list_display = ['id', 'provider', 'date_register', 'n_invoice', 'date_invoice', 'product', 'total_prod', 'total', 'user_creation', 'date_creation', 'user_updated', 'date_updated']
    list_display_links = ['id', 'provider']
    readonly_fields = ['user_creation', 'date_creation', 'user_updated', 'date_updated']


admin.site.register(Buy, BuyAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Provider, ProviderAdmin)
admin.site.register(Product, ProductAdmin)
