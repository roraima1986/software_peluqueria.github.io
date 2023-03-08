from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.db.models import F
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *
from .forms import *
from .models import *
import json
from django.http import JsonResponse
import datetime
from openpyxl import Workbook
from django.http.response import HttpResponse
from django.db.models import Q

# Lista de Categoría
class CategoryListView(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    permission_required = 'product.view_category'
    model = Category
    template_name = 'product/category/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Category.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Categoría de Productos'
        context['content_title'] = 'Lista Categoría'
        context['create_url'] = reverse_lazy('category_add')
        context['list_url'] = reverse_lazy('category_list')
        return context

# Registrar Categoria
class CategoryCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'product.add_category'
    model = Category
    template_name = 'product/category/add.html'
    form_class = CategoryForm
    success_url = reverse_lazy('category_list')

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Categoría de Productos'
        context['content_title'] = 'Nueva Categoría'
        context['create_url'] = reverse_lazy('category_add')
        context['list_url'] = reverse_lazy('category_list')
        context['action'] = 'add'
        return context


# Editar Categoria
class CategoryUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    permission_required = 'product.change_category'
    model = Category
    template_name = 'product/category/add.html'
    form_class = CategoryForm
    success_url = reverse_lazy('category_list')

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Categoría de Productos'
        context['content_title'] = 'Editar Categoría'
        context['create_url'] = reverse_lazy('category_add')
        context['list_url'] = reverse_lazy('category_list')
        context['action'] = 'edit'
        return context


# Lista de Proveedor
class ProviderListView(LoginRequiredMixin,PermissionRequiredMixin, ListView):
    permission_required = 'product.view_provider'
    model = Provider
    template_name = 'product/provider/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Provider.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Proveedores'
        context['content_title'] = 'Lista Proveedor'
        context['create_url'] = reverse_lazy('provider_add')
        context['list_url'] = reverse_lazy('provider_list')
        return context


# Registrar Proveedor
class ProviderCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'product.add_provider'
    model = Provider
    template_name = 'product/provider/add.html'
    form_class = ProviderForm
    success_url = reverse_lazy('provider_list')

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Proveedores'
        context['content_title'] = 'Nuevo Proveedor'
        context['create_url'] = reverse_lazy('provider_add')
        context['list_url'] = reverse_lazy('provider_list')
        context['action'] = 'add'
        return context
    

# Editar Proveedor
class ProviderUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    permission_required = 'product.change_provider'
    model = Provider
    template_name = 'product/provider/add.html'
    form_class = ProviderForm
    success_url = reverse_lazy('provider_list')

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Proveedor'
        context['content_title'] = 'Editar Proveedor'
        context['create_url'] = reverse_lazy('provider_add')
        context['list_url'] = reverse_lazy('provider_list')
        context['action'] = 'edit'
        return context


# Lista de Productos
class ProductListView(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    permission_required = 'product.view_product'
    model = Product
    template_name = 'product/product/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Product.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Productos'
        context['content_title'] = 'Lista Productos'
        context['create_url'] = reverse_lazy('product_add')
        context['list_url'] = reverse_lazy('product_list')
        context['total_product'] = Product.objects.all().count()
        context['total_p_activos'] = Product.objects.filter(status__contains='ACTIVO').count()
        context['total_p_inhab'] = Product.objects.filter(status__contains='INHABILITADO').count()
        return context


# Registrar Productos
class ProductCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'product.add_product'
    model = Product
    template_name = 'product/product/add.html'
    form_class = ProductForm
    success_url = reverse_lazy('product_list')

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Productos'
        context['content_title'] = 'Nuevo Producto'
        context['create_url'] = reverse_lazy('product_add')
        context['list_url'] = reverse_lazy('product_list')
        context['action'] = 'add'
        return context


# Editar Productos
class ProductUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    permission_required = 'product.change_product'
    model = Product
    template_name = 'product/product/add.html'
    form_class = ProductForm
    #fields = ['name', 'barcode', 'category', 'range_stock', 'price_purchase', 'price_sale', 'status', 'photo']
    success_url = reverse_lazy('product_list')

    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Productos'
        context['content_title'] = 'Editar Producto'
        context['create_url'] = reverse_lazy('product_add')
        context['list_url'] = reverse_lazy('product_list')
        context['action'] = 'edit'
        return context


# Reporte Excel de Productos
def report_excel_product_all(_request):
    products = Product.objects.exclude(status="INHABILITADO")

    wb = Workbook()
    ws = wb.active

    ws.column_dimensions['A'].width = 40
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 10
    ws.column_dimensions['D'].width = 15
    ws.column_dimensions['E'].width = 15
    ws.column_dimensions['F'].width = 15
    ws.column_dimensions['G'].width = 20

    # cabecera
    ws['A1'] = 'NOMBRE PRODUCTO'
    ws['B1'] = 'CATEGORIA'
    ws['C1'] = 'CANT'
    ws['D1'] = 'P/COMPRA'
    ws['E1'] = 'P/VENTA'
    ws['F1'] = 'GANANCIA'
    ws['G1'] = 'ESTADO'

    # Iniciar en la 2da fila
    cont = 2

    # Contenido
    for product in products:
        ws.cell(row=cont, column=1).value = product.name
        ws.cell(row=cont, column=2).value = product.category.name
        ws.cell(row=cont, column=3).value = product.cant
        ws.cell(row=cont, column=4).value = product.price_purchase
        ws.cell(row=cont, column=5).value = product.price_sale
        ws.cell(row=cont, column=6).value = product.ganancy
        ws.cell(row=cont, column=7).value = product.status

        cont += 1

    name_file = 'ReporteProductosExcel.xlsx'
    response = HttpResponse(content_type='application/ms-excel')
    content = 'attachment; filename = {}'.format(name_file)
    response['Content-Disposition'] = content
    wb.save(response)
    return response


# Reporte Excel Filtro de Productos
def report_excel_product_filter(request):
    product_name = request.GET['product_name']
    cbo_category = request.GET['cbo_category']
    cbo_stock = request.GET['cbo_stock']
    cbo_status = request.GET['cbo_status']

    # Trae todos los productos
    products = Product.objects.all()

    # Filtro de nombre de producto
    if product_name is not None:
        products = products.filter(name__icontains=product_name)

    # Filtro de categoria
    if cbo_category and cbo_category.strip():
        products = products.filter(category=cbo_category)

    # Filtro de stock de productos
    if cbo_stock == '1':
        products = products.filter(cant__gt=0)
    if cbo_stock == '2':
        products = products.filter(cant__gt=0, cant__lte=F('range_stock'))
    if cbo_stock == '3':
        products = products.filter(cant__exact=0)

    # Filtro de estado
    if cbo_status and cbo_status.strip():
        products = products.filter(status=cbo_status)

    wb = Workbook()
    ws = wb.active

    ws.column_dimensions['A'].width = 40
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 10
    ws.column_dimensions['D'].width = 15
    ws.column_dimensions['E'].width = 15
    ws.column_dimensions['F'].width = 15
    ws.column_dimensions['G'].width = 20

    # cabecera
    ws['A1'] = 'NOMBRE PRODUCTO'
    ws['B1'] = 'CATEGORIA'
    ws['C1'] = 'CANT'
    ws['D1'] = 'P/COMPRA'
    ws['E1'] = 'P/VENTA'
    ws['F1'] = 'GANANCIA'
    ws['G1'] = 'ESTADO'

    # Iniciar en la 2da fila
    cont = 2

    # Contenido
    for product in products:
        ws.cell(row=cont, column=1).value = product.name
        ws.cell(row=cont, column=2).value = product.category.name
        ws.cell(row=cont, column=3).value = product.cant
        ws.cell(row=cont, column=4).value = product.price_purchase
        ws.cell(row=cont, column=5).value = product.price_sale
        ws.cell(row=cont, column=6).value = product.ganancy
        ws.cell(row=cont, column=7).value = product.status

        cont += 1

    name_file = 'ReporteProductosExcel.xlsx'
    response = HttpResponse(content_type='application/ms-excel')
    content = 'attachment; filename = {}'.format(name_file)
    response['Content-Disposition'] = content
    wb.save(response)
    return response


# Valores de Categoria en el Modal
def get_categories(_request):
    categories = list(Category.objects.order_by('name').values())
    if (len(categories)>0):
        data = {
            'message':'Success',
            'categories': categories
        }
    else:
        data = {
            'message': 'No encontrado',
        }
    return JsonResponse(data)


# Lista de Compra
class BuyListView(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    permission_required = 'product.view_buy'
    model = Buy
    template_name = 'product/buy/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Buy.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Compras'
        context['content_title'] = 'Lista Compra'
        context['create_url'] = reverse_lazy('buy_add')
        context['list_url'] = reverse_lazy('buy_list')
        return context


# Registrar Compra
class BuyCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'product.add_buy'
    model = Buy
    form_class = BuyForm
    template_name = 'product/buy/add.html'
    success_url = reverse_lazy('buy_list')

    @method_decorator(login_required())
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'add':
                form = self.get_form()
                if form.is_valid():
                    form.save()
                else:
                    data['error'] = form.errors
            else:
                data['error'] = 'No ha ingresado a ninguna opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Compras'
        context['content_title'] = 'Nueva Compra'
        context['create_url'] = reverse_lazy('buy_add')
        context['list_url'] = reverse_lazy('buy_list')
        context['action'] = 'add'
        context['form_provider'] = ProviderForm
        context['form_product'] = ProductForm
        return context


# Registrar Proveedor desde el formulario de Compra
def new_provider(request):
        data1={}

        try:
            #formulario = self.get_form()
            name = request.POST['name']
            rut = request.POST['rut']
            phone = request.POST['phone']
            email = request.POST['email']
            address = request.POST['address']
            observation = request.POST['observation']
            
            buscar=Provider.objects.filter(rut=rut).exists() 
            if buscar:
                print('El proveedor ya existe###',buscar, flush=True)
                data1['error']='El proveedor ya existe'
                return JsonResponse(data1)
            else:
                proveedor= Provider.objects.create(
                    name=name,
                    rut=rut, 
                    phone=phone, 
                    email=email, 
                    address=address, 
                    observation=observation
                )
                # Traemos son el id nombre y rut de los proveedores
                
                data1= Provider.objects.all().values('id','name','rut')
                
                # luego los retornamos en formato lista de la siguiente forma
                # return JsonResponse(list(data1),safe=False)
                return JsonResponse(list(data1),safe=False)
            
        except Exception as e:
            data1['error']=str(e)
        return JsonResponse(data1)


# Registrar Producto desde el formulario de Compra
def new_product(request):
    data2={}
    try:
        name= request.POST['name']
        barcode= request.POST['barcode']
        category= request.POST['category']
        
        range_stock= request.POST['range_stock']
        cant= request.POST.get('cant',0)
        price_purchase= request.POST.get('price_purchase',0)
        price_sale= request.POST.get('price_sale',0)
        status= request.POST['status']
        
        # validar datos vacios
        if not request.FILES:
            photo=None
        else:
            photo= request.FILES['photo']
        if not range_stock:
            range_stock=0
        if not cant:
            cant=0
        if not price_purchase:
            price_purchase=0
        if not price_sale:
            price_sale=0
        if not status:
            status=1

        buscar_code=Product.objects.filter(barcode=barcode).exists()
        buscar_name=Product.objects.filter(name=name)
        categoria=Category.objects.filter(id=category)
        
        # validacion de repetido
        if buscar_code or buscar_name:
            data2['error_dupli']='El producto ya existe'
            return JsonResponse(data2)
        else:
            # continua con el guardado
            producto = Product.objects.create(
                name=name,
                barcode=barcode,
                category=Category.objects.get(id=category),
                range_stock=range_stock,
                cant=cant,
                price_purchase=price_purchase,
                price_sale=price_sale,
                status=status,
                photo=photo
            )
            # Traemos todos los productos
            data2= Product.objects.all().values('id','name','barcode','price_purchase','price_sale')
            """ retornar={
                'id':producto.id,
                'name':producto.name,
                'barcode':producto.barcode,
                'precio_compra':producto.price_purchase,
                'precio_venta':producto.price_sale,
            } """
            return JsonResponse(list(data2), safe=False)
    except Exception as e:
        data2['error']=str(e)  
        return JsonResponse(data2) 


# Guardar compra de mercancia
def new_buy(request):

    # Datos estaticos de la compra
    fecha_factura= request.POST['datos_r[fecha_factura]']
    id_proveedor= request.POST['datos_r[id_proveedor]']
    numero_factura= request.POST['datos_r[numero_factura]'] 
    total_compra= request.POST['datos_r[total_compra]']  
    total_productos= request.POST['datos_r[total_productos]']
    
    # validar existencias en la db
    factura=Buy.objects.filter(n_invoice=numero_factura).exists()
    proveedor=Provider.objects.filter(id=id_proveedor).exists()

    data1={}
    listado_productos_save=[]

    # Tomamos la lista y la convertimos en diccionario con json.loads
    lista_str = request.POST['list_prod[]']
    lista_diccionario = json.loads(lista_str)
    
    #recorrer productos
    try:
        if proveedor:
            if not factura:
                for i in lista_diccionario['produc']:
                        id_producto=i['id_producto']
                        buscar= Product.objects.filter(id=id_producto).exists()
                        if buscar:
                            # rellenar el stock de los pructos y actualizar los precios de compra y venta
                            producto=Product.objects.get(id=id_producto)
                            producto.cant= int(producto.cant) + int(i['cantidad'])
                            producto.price_purchase=i['precio_compra']
                            producto.price_sale=i['precio_venta']
                            #provider=Provider.objects.get(id=id_proveedor)
                            producto.save()

                            subtotal_prod= int(i['cantidad']) * float(i['precio_compra'])
                            
                            listado_productos_save.append({
                            'product_id': id_producto,
                            'product_name': producto.name,
                            'cant': int(i['cantidad']),
                            'price_purchase': i['precio_compra'],
                            'price_sale': i['precio_venta'],
                            'subtotal_prod': subtotal_prod,})
                        else:
                            data1['error']='El producto No se encuentra registrado'
                            return JsonResponse(data1)
                    
                    
                      
                # Guardar compra en la tabla de compras
                compra=Buy.objects.create(
                    provider=Provider.objects.get(id=id_proveedor),
                    # fecha actual
                    date_register= datetime.datetime.now(),
                    n_invoice=numero_factura,
                    date_invoice=fecha_factura,
                    product=Product.objects.get(id=id_producto),
                    #cant= total_productos,
                    #price_purchase=total_compra,
                    #price_sale=i['precio_venta'],
                    #subtotal=i['subtotal'],
                    total=total_compra,
                    total_prod=total_productos,
                    shopping_products=listado_productos_save,
                )
            
            else:
                data1['error']='El numero de factura ya se encuentra registrado'
                return JsonResponse(data1)
        else:
            data1['error']='El proveedor no se encuentra registrado'
            return JsonResponse(data1)
                                
    
    except Exception as e:
        data1['error']=str(e)  
        return JsonResponse(data1)

    # retonar el exito de la compra    
    data1['exito']='Compra registrada con exito'
    return JsonResponse(data1)


# Detalle de la compra
def detail_buy(request):
    data={}
    recorrido=[]
    id_detalle=request.GET['id_detalle']
    try:
        compra=Buy.objects.get(id=id_detalle)
        if compra:
            for i in compra.shopping_products:
            # llenamos el objeto data, con la clave y valor del for del detalle
                data= {
                    'product_id': i['product_id'],
                    'product_name':i['product_name'],
                    'cant': i['cant'],
                    'price_purchase': i['price_purchase'],
                    'price_sale': i['price_sale'],
                    'subtotal_prod': i['subtotal_prod'],
                }
                recorrido.append(data)
        else:
            data['error']='No se encuentra la compra'
            return JsonResponse(data)   
    except Exception as e:
        data['error']=str(e)  
        return JsonResponse(data)

    return JsonResponse(recorrido, safe=False)


# Reporte Excel de Compra
def report_excel_buy_all(_request):
    buys = Buy.objects.all()

    wb = Workbook()
    ws = wb.active

    ws.column_dimensions['A'].width = 10
    ws.column_dimensions['B'].width = 15
    ws.column_dimensions['C'].width = 40
    ws.column_dimensions['D'].width = 15
    ws.column_dimensions['E'].width = 15
    ws.column_dimensions['F'].width = 15
    ws.column_dimensions['G'].width = 15
    ws.column_dimensions['H'].width = 15
    ws.column_dimensions['I'].width = 40
    ws.column_dimensions['J'].width = 15
    ws.column_dimensions['K'].width = 15
    ws.column_dimensions['L'].width = 15
    ws.column_dimensions['M'].width = 15

    # cabecera
    ws['A1'] = 'NRO'
    ws['B1'] = 'FECHA'
    ws['C1'] = 'PROVEEDOR'
    ws['D1'] = 'RUT PROVEEDOR'
    ws['E1'] = 'N° FACTURA'
    ws['F1'] = 'FECHA FACTURA'
    ws['G1'] = 'TOTAL PRODUCTOS'
    ws['H1'] = 'TOTAL P/COMPRA'
    ws['I1'] = 'NOMBRE PRODUCTO'
    ws['J1'] = 'CANT'
    ws['K1'] = 'P/COMPRA'
    ws['L1'] = 'P/VENTA'
    ws['M1'] = 'SUBTOTAL'

    # Iniciar en la 2da fila
    cont = 2

    # Contenido
    for buy in buys:
        ws.cell(row=cont, column=1).value = buy.id
        ws.cell(row=cont, column=2).value = buy.date_register
        ws.cell(row=cont, column=3).value = buy.provider.name
        ws.cell(row=cont, column=4).value = buy.provider.rut
        ws.cell(row=cont, column=5).value = buy.n_invoice
        ws.cell(row=cont, column=6).value = buy.date_invoice
        ws.cell(row=cont, column=7).value = buy.total_prod
        ws.cell(row=cont, column=8).value = buy.total

        # Obtener valores de la lista de productos
        productos = buy.shopping_products
        # Recorrer lista de productos
        for p in productos:
            ws.cell(row=cont, column=9).value = p['product_name']
            ws.cell(row=cont, column=10).value = int(p['cant'])
            ws.cell(row=cont, column=11).value = int(p['price_purchase'])
            ws.cell(row=cont, column=12).value = int(p['price_sale'])
            ws.cell(row=cont, column=13).value = int(p['subtotal_prod'])
            cont += 1

        cont += 1

    name_file = 'ReporteComprasExcel.xlsx'
    response = HttpResponse(content_type='application/ms-excel')
    content = 'attachment; filename = {}'.format(name_file)
    response['Content-Disposition'] = content
    wb.save(response)
    return response


# Reporte Excel Filtro
def report_excel_buy_filter(request):
    radioDate = request.GET['radioDate']
    start_date = request.GET['start_date']
    finish_date = request.GET['finish_date']
    providers = request.GET['cbo_provider']

    # Traer todas las compras
    buys = Buy.objects.all()

    if radioDate == "date_invoice":
        buys = buys.filter(date_invoice__range=(start_date, finish_date))

    if radioDate == "date_system":
        buys = buys.filter(date_register__range=(start_date, finish_date))

    if providers:
        buys = buys.filter(provider=providers)

    wb = Workbook()
    ws = wb.active

    ws.column_dimensions['A'].width = 10
    ws.column_dimensions['B'].width = 15
    ws.column_dimensions['C'].width = 40
    ws.column_dimensions['D'].width = 15
    ws.column_dimensions['E'].width = 15
    ws.column_dimensions['F'].width = 15
    ws.column_dimensions['G'].width = 15
    ws.column_dimensions['H'].width = 15
    ws.column_dimensions['I'].width = 40
    ws.column_dimensions['J'].width = 10
    ws.column_dimensions['K'].width = 15
    ws.column_dimensions['L'].width = 15
    ws.column_dimensions['M'].width = 15

    # cabecera
    ws['A1'] = 'NRO'
    ws['B1'] = 'FECHA'
    ws['C1'] = 'PROVEEDOR'
    ws['D1'] = 'RUT PROVEEDOR'
    ws['E1'] = 'N° FACTURA'
    ws['F1'] = 'FECHA FACTURA'
    ws['G1'] = 'TOTAL PRODUCTOS'
    ws['H1'] = 'TOTAL P/COMPRA'
    ws['I1'] = 'NOMBRE PRODUCTO'
    ws['J1'] = 'CANT'
    ws['K1'] = 'P/COMPRA'
    ws['L1'] = 'P/VENTA'
    ws['M1'] = 'SUBTOTAL'

    # Iniciar en la 2da fila
    cont = 2

    # Contenido
    for buy in buys:
        ws.cell(row=cont, column=1).value = buy.id
        ws.cell(row=cont, column=2).value = buy.date_register
        ws.cell(row=cont, column=3).value = buy.provider.name
        ws.cell(row=cont, column=4).value = buy.provider.rut
        ws.cell(row=cont, column=5).value = buy.n_invoice
        ws.cell(row=cont, column=6).value = buy.date_invoice
        ws.cell(row=cont, column=7).value = buy.total_prod
        ws.cell(row=cont, column=8).value = buy.total

        # Obtener valores de la lista de productos
        productos = buy.shopping_products
        # Recorrer lista de productos
        for p in productos:
            ws.cell(row=cont, column=9).value = p['product_name']
            ws.cell(row=cont, column=10).value = int(p['cant'])
            ws.cell(row=cont, column=11).value = int(p['price_purchase'])
            ws.cell(row=cont, column=12).value = int(p['price_sale'])
            ws.cell(row=cont, column=13).value = int(p['subtotal_prod'])
            cont += 1

        cont += 1

    name_file = 'ReporteComprasExcel.xlsx'
    response = HttpResponse(content_type='application/ms-excel')
    content = 'attachment; filename = {}'.format(name_file)
    response['Content-Disposition'] = content
    wb.save(response)
    return response


# Valores de proveedores en el modal
def get_providers(request):
    providers = list(Provider.objects.order_by('name').values())
    if (len(providers)>0):
        data = {
            'message':'Success',
            'providers': providers
        }
    else:
        data = {
            'message': 'No encontrado',
        }
    return JsonResponse(data)


# Carga de productos en el menu de compras cuando se hace una buqueda

def todos_products_compra(request):
    print("++entro++")
    data = list(Product.objects.all().values('id','name','barcode','price_purchase','price_sale'))
    return  JsonResponse(data, safe=False)


""" @csrf_exempt
def autocomplete_products_compra(request):
    q = request.GET.get('term', '')
    results = Product.objects.filter(Q(name__icontains=q) | Q(barcode__icontains=q))[:10]
    data = []
    for result in results:
        data.append(f" {result.barcode} || {result.name} || P.Compra: {result.price_purchase} || P.Venta: {result.price_sale}")
    if not data:
        data.append("No se encontraron productos que coincidan con su búsqueda.")
    return  JsonResponse(data, safe=False)
"""




