from crum import get_current_user
from django.core.exceptions import ValidationError
from django.db import models
from django.forms import model_to_dict
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _



class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        user = get_current_user()
        if user is not None:
            if not self.pk:
                self.user_creation = user
            else:
                self.user_updated = user
        super(Category, self).save()

    def toJSON(self):
        item = model_to_dict(self)
        return item

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        ordering = ['-id']

class Provider(BaseModel):
    name = models.CharField(max_length=100, verbose_name='Nombre proveedor')
    rut = models.CharField(max_length=15, unique=True, verbose_name='RUT')
    phone = models.CharField(max_length=15, blank=True, null=True, verbose_name='Teléfono')
    email = models.EmailField(blank=True, null=True, verbose_name='Correo')
    address = models.CharField(max_length=150, null=True, blank=True, verbose_name='Dirección')
    observation = models.CharField(max_length=500, null=True, blank=True, verbose_name='Observación')

    def __str__(self):
        return '%s %s' % (self.name, self.rut)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        user = get_current_user()
        if user is not None:
            if not self.pk:
                self.user_creation = user
            else:
                self.user_updated = user
        super(Provider, self).save()

    def toJSON(self):
        item = model_to_dict(self)
        return item

    class Meta:
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'


def validate_image_size(value):
    filesize= value.size
    if filesize > 100*1024:
        raise ValidationError(_("La imagen no debe pesar más de 100KB."))


class Product(BaseModel):
    name = models.CharField(max_length=200, unique=True, verbose_name='Nombre/Descripción')
    barcode = models.CharField(max_length=20, unique=True, verbose_name='Código de Barra')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='Categoría')
    range_stock = models.IntegerField(verbose_name='Stock Minimo')
    cant = models.IntegerField(verbose_name='Cantidad', default=0)
    price_purchase = models.IntegerField(verbose_name='Precio Compra', default=0)
    price_sale = models.IntegerField(verbose_name='Precio Venta', default=0)
    status = models.CharField(max_length=15, choices=[('ACTIVO', 'ACTIVO'), ('INHABILITADO', 'INHABILITADO')],
                              default='ACTIVO', verbose_name='Estado')
    photo = models.ImageField(upload_to='product/%Y/%m/%d', null=True, blank=True, verbose_name='Foto del Producto', validators=[validate_image_size])

    def __str__(self):
        #return self.name
        return '{} || Cod: {} || P. compra: ${} || P.venta: ${} '.format(self.name, self.barcode, self.price_purchase, self.price_sale,self.pk)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        user = get_current_user()
        if user is not None:
            if not self.pk:
                self.user_creation = user
            else:
                self.user_updated = user
        super(Product, self).save()

    def toJSON(self):
        item = model_to_dict(self)
        item['category'] = self.category.name
        item['photo'] = str(self.photo)
        return item

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

# Modelo de Compra
class Buy(BaseModel):
    provider = models.ForeignKey(Provider, on_delete=models.PROTECT, verbose_name='Proveedor')
    date_register = models.DateField(verbose_name='Fecha de Registro')
    n_invoice = models.IntegerField(verbose_name='N° Factura', null=True, blank=True)
    date_invoice = models.DateField(verbose_name='Fecha de Factura', null=True, blank=True)
    total_prod = models.IntegerField(verbose_name='Total Productos', default=0)
    total = models.IntegerField(verbose_name='Total P.C.',default=0)
    shopping_products=models.JSONField(null=True, blank=True, verbose_name='Productos Comprados')
    """
        Ejemplo del JSONField
        {
            'product_id': id_producto,
            'product_name': producto.name,
            'cant': int(i['cantidad']),
            'price_purchase': i['precio_compra'],
            'price_sale': i['precio_venta'],
            'subtotal_prod': subtotal_prod,
        }
    """

    def __str__(self):
        return '{} / Factura N°{} '.format(self.provider.name, self.n_invoice)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        user = get_current_user()
        if user is not None:
            if not self.pk:
                self.user_creation = user
            else:
                self.user_updated = user
        super(Buy, self).save()


    def toJSON(self):
        item = model_to_dict(self)
        item['provider'] = self.provider.name
        item['date_register'] = self.date_register.strftime('%d/%m/%Y')
        item['date_invoice'] = self.date_register.strftime('%d/%m/%Y')
        return item

    class Meta:
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'


