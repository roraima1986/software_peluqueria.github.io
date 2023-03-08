import datetime
from crum import get_current_user
from django.db import models
from core.models import BaseModel
from django.forms import model_to_dict
from user.models import User


class Sale(BaseModel):
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Usuario')
    type_sale = models.CharField(max_length=10, null=True, blank=True, choices=[('Venta', 'Venta'), ('Merma', 'Merma'), ('Personal', 'Personal')], default='Venta', verbose_name='Tipo de Salida')
    observation = models.CharField(max_length=200, null=True, blank=True, verbose_name='Observación')
    total_prod = models.IntegerField(verbose_name='Total Productos', default=0)
    total_sale = models.IntegerField(verbose_name='Total', default=0)
    output_products = models.JSONField(null=True, blank=True, verbose_name='Productos')
    is_canceled = models.BooleanField(null=True, blank=True, verbose_name='Anulado', default=False)

    """
            Ejemplo del JSONField
            {
                'product_id': id_producto,
                'product_name': producto.name,
                'barcode': producto.barcode,
                'cant': int(i['cantidad']),                
                'price_sale': i['precio_venta'],
                'subtotal_prod': subtotal_prod,
            }
        """

    def __str__(self):
        return 'Venta N°{} / {} '.format(self.id, self.user.username)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        user = get_current_user()
        if user is not None:
            if not self.pk:
                self.user_creation = user
            else:
                self.user_updated = user
        super(Sale, self).save()


    def toJSON(self):
        item = model_to_dict(self)
        item['user'] = self.user.username
        item['date_creation'] = self.date_creation.strftime('%d/%m/%Y %H:%M:%S')
        return item

    class Meta:
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'
        ordering = ['-id']
