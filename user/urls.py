from django.urls import path
from .views import *

urlpatterns = [
    # Usuario
    path('list/', UserListView.as_view(), name='user_list'),
    path('add/', UserCreateView.as_view(), name='user_add'),
    path('edit/<pk>/', UserUpdateView.as_view(), name='user_edit'),

]