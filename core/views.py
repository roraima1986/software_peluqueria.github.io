from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import TemplateView


# class IndexView(LoginRequiredMixin, TemplateView):
#     template_name = 'core/index.html'
#
#     def dispatch(self, request, *args, **kwargs):
#         return super().dispatch(request, *args, **kwargs)
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['title'] = 'Inicio'
#         return context


class Error404View(LoginRequiredMixin, TemplateView):
     template_name = 'core/error_404.html'


class Error500View(LoginRequiredMixin, TemplateView):
    template_name = 'core/error_500.html'

    @classmethod
    def as_error_view(cls):
        v = cls.as_view()
        def view(request):
            r = v(request)
            r.render()
            return r
        return view