from django.urls import path
from .views import *
from . import views


urlpatterns = [
    # Categoría
    path('category/list/', CategoryListView.as_view(), name='category_list'),
    path('category/add/', CategoryCreateView.as_view(), name='category_add'),
    path('category/edit/<pk>/', CategoryUpdateView.as_view(), name='category_edit'),
    # Proveedor
    path('provider/list/', ProviderListView.as_view(), name='provider_list'),
    path('provider/add/', ProviderCreateView.as_view(), name='provider_add'),
    path('provider/edit/<pk>/', ProviderUpdateView.as_view(), name='provider_edit'),
    path('new_provider', views.new_provider, name="new_provider"),
    # Productos
    path('product/list/', ProductListView.as_view(), name='product_list'),
    path('product/add/', ProductCreateView.as_view(), name='product_add'),
    path('product/edit/<pk>/', ProductUpdateView.as_view(), name='product_edit'),
    path('new_product', views.new_product, name="new_product"),
    # Reportes Excel de Productos
    path('report_excel_product_all/', views.report_excel_product_all, name='report_excel_product_all'),
    path('report_excel_product_filter/', views.report_excel_product_filter, name='report_excel_product_filter'),
    # Ruta Select de proveedores para modal
    path('get_categories/', views.get_categories, name="get_categories"),
    # Compra
    path('buy/list/', BuyListView.as_view(), name='buy_list'),
    path('buy/add/', BuyCreateView.as_view(), name='buy_add'),
    path('new_buy', views.new_buy, name="new_buy"),
    #carga los productos a comprar
    path('todos_products_compra/', views.todos_products_compra, name='todos_products_compra'),
    # Detalle Compra
    path('detail_buy', views.detail_buy, name="detail_buy"),
    # Reportes Excel de Compra
    path('report_excel_buy_all/', views.report_excel_buy_all, name='report_excel_buy_all'),
    path('report_excel_buy_filter/', views.report_excel_buy_filter, name='report_excel_buy_filter'),
    # Ruta Select de proveedores para modal
    path('get_providers/', views.get_providers, name="get_providers"),
]

