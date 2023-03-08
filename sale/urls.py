from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('add/', SaleCreateView.as_view(), name='sale_add'),
    path('report/', SaleListView.as_view(), name='sale_report'),
    path('autocomplete_products/', views.autocomplete_products, name='autocomplete_products'),
    # path('listado_usuarios/',views.listado_usuarios, name='listado_usuarios'),
    # path('listado_productos/',views.listado_productos, name='listado_productos'),
    path('report_excel_sale_all/', views.report_excel_sale_all, name='report_excel_sale_all'),
]