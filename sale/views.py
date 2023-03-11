from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.contrib.auth.models import Group
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import CreateView, ListView
from openpyxl import Workbook
from .models import Sale
from .forms import SaleForm
from django.http import JsonResponse
from product.models import Product

# Registrar venta
class SaleCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'sale.add_sale'
    model = Sale
    template_name = 'sale/add.html'
    form_class = SaleForm

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Para el select de los usuarios
    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'search_products':
                data = []
                prods = Product.objects.filter(Q(name__icontains=request.POST['term']) | Q(barcode__icontains=request.POST['term']))[:10]
                for i in prods:
                    item = i.toJSON()
                    item['value'] = i.name
                    data.append(item)
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
            if not data:
                data.append("No se encontraron productos que coincidan con su búsqueda.")
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Venta de Productos'
        context['content_title'] = 'Nueva Venta'
        context['action'] = 'add'
        context['grupo'] = Group.objects.filter(user=self.request.user).first()
        return context


class SaleListView(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    permission_required = 'sale.view_sale'
    model = Sale
    template_name = 'sale/report.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Sale.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Reportes'
        context['content_title'] = 'Reporte de Venta'
        return context

# @csrf_exempt
# def autocomplete_products(request):
#     q = request.GET.get('term', '')
#     results = Product.objects.filter(Q(name__icontains=q) | Q(barcode__icontains=q))[:10]
#     data = []
#     for result in results:
#         data.append(f"{result.barcode} || {result.name}")
#     if not data:
#         data.append("No se encontraron productos que coincidan con su búsqueda.")
#     return  JsonResponse(data, safe=False)
#
#     return JsonResponse(recorrido, safe=False)


# Reporte Excel de Venta
def report_excel_sale_all(_request):
    sales = Sale.objects.exclude(is_canceled=True)

    wb = Workbook()
    ws = wb.active

    ws.column_dimensions['A'].width = 10
    ws.column_dimensions['B'].width = 40
    ws.column_dimensions['C'].width = 15
    ws.column_dimensions['D'].width = 15
    ws.column_dimensions['E'].width = 15
    ws.column_dimensions['F'].width = 15
    ws.column_dimensions['G'].width = 40
    ws.column_dimensions['H'].width = 10
    ws.column_dimensions['J'].width = 15
    ws.column_dimensions['K'].width = 15

    # cabecera
    ws['A1'] = 'NRO'
    ws['B1'] = 'PERSONAL'
    ws['C1'] = 'TIPO DE VENTA'
    ws['D1'] = 'OBSERVACIÓN'
    ws['E1'] = 'TOTAL PRODUCTOS'
    ws['F1'] = 'TOTAL P/COMPRA'
    ws['G1'] = 'NOMBRE PRODUCTO'
    ws['H1'] = 'CANT'
    ws['I1'] = 'P/COMPRA'
    ws['J1'] = 'P/VENTA'
    ws['K1'] = 'SUBTOTAL'

    # Iniciar en la 2da fila
    cont = 2

    # Contenido
    for sale in sales:
        ws.cell(row=cont, column=1).value = sale.id
        ws.cell(row=cont, column=2).value = sale.user.username
        ws.cell(row=cont, column=3).value = sale.type_sale
        ws.cell(row=cont, column=4).value = sale.observation
        ws.cell(row=cont, column=5).value = sale.total_prod
        ws.cell(row=cont, column=6).value = sale.total_sale

        # Obtener valores de la lista de productos
        ventas = sale.output_products
        # Recorrer lista de productos
        for v in ventas:
            ws.cell(row=cont, column=7).value = v['product_name']
            ws.cell(row=cont, column=8).value = int(v['cant'])
            ws.cell(row=cont, column=9).value = int(v['price_purchase'])
            ws.cell(row=cont, column=10).value = int(v['price_sale'])
            ws.cell(row=cont, column=11).value = int(v['subtotal_prod'])
            cont += 1

        cont += 1

    name_file = 'ReporteVentasExcel.xlsx'
    response = HttpResponse(content_type='application/ms-excel')
    content = 'attachment; filename = {}'.format(name_file)
    response['Content-Disposition'] = content
    wb.save(response)
    return response