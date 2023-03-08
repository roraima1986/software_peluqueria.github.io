from django.contrib.auth import logout
from django.contrib.auth.views import LoginView
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import redirect
from django.views.generic import RedirectView


# Iniciar Sesion
class Login(SuccessMessageMixin, LoginView):
    template_name = 'login/login.html'
    success_message = 'Ha iniciado sesion correctamente'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('sale_add')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


# Cerrar Sesion
class Logout(RedirectView):
    pattern_name = 'login'

    def dispatch(self, request, *args, **kwargs):
        logout(request)
        return super().dispatch(request, *args, **kwargs)