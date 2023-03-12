from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('add/', SaleCreateView.as_view(), name='sale_add'),
    path('report/', SaleListView.as_view(), name='sale_report'),
    # path('autocomplete_products/', views.autocomplete_products, name='autocomplete_products'),
    path('report_excel_sale_all/', views.report_excel_sale_all, name='report_excel_sale_all'),
    path('report_excel_sale_filter/', views.report_excel_sale_filter, name='report_excel_sale_filter'),
    # Ruta Select de usuarios para modal
    path('get_users/', views.get_users, name="get_users"),
]