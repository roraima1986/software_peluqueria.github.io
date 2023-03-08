from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *
from .models import User
from .forms import *


class UserListView(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    permission_required = 'user.view_user'
    model = User
    template_name = 'user/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in User.objects.all().exclude(is_superuser = True):
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    # Product.objects.filter(status__contains='ACTIVO').count()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Usuarios'
        context['content_title'] = 'Lista Usuarios'
        context['create_url'] = reverse_lazy('user_add')
        context['list_url'] = reverse_lazy('user_list')
        return context


class UserCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'user.add_user'
    model = User
    template_name = 'user/add.html'
    form_class = UserForm
    success_url = reverse_lazy('user_list')

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Usuarios'
        context['content_title'] = 'Nuevo Usuario'
        context['create_url'] = reverse_lazy('user_add')
        context['list_url'] = reverse_lazy('user_list')
        context['action'] = 'add'
        return context


class UserUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    permission_required = 'user.change_user'
    model = User
    template_name = 'user/add.html'
    form_class = UserForm
    success_url = reverse_lazy('user_list')

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Usuarios'
        context['content_title'] = 'Editar Usuario'
        context['create_url'] = reverse_lazy('user_add')
        context['list_url'] = reverse_lazy('user_list')
        context['action'] = 'edit'
        return context