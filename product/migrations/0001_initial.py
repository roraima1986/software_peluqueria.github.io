# Generated by Django 4.1.5 on 2023-03-21 15:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import product.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Nombre')),
                ('user_creation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_creation', to=settings.AUTH_USER_MODEL)),
                ('user_updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Categoría',
                'verbose_name_plural': 'Categorías',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('name', models.CharField(max_length=100, verbose_name='Nombre proveedor')),
                ('rut', models.CharField(max_length=15, unique=True, verbose_name='RUT')),
                ('phone', models.CharField(blank=True, max_length=15, null=True, verbose_name='Teléfono')),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Correo')),
                ('address', models.CharField(blank=True, max_length=150, null=True, verbose_name='Dirección')),
                ('observation', models.CharField(blank=True, max_length=500, null=True, verbose_name='Observación')),
                ('user_creation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_creation', to=settings.AUTH_USER_MODEL)),
                ('user_updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Proveedor',
                'verbose_name_plural': 'Proveedores',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('name', models.CharField(max_length=200, unique=True, verbose_name='Nombre/Descripción')),
                ('barcode', models.CharField(max_length=20, unique=True, verbose_name='Código de Barra')),
                ('range_stock', models.IntegerField(verbose_name='Stock Minimo')),
                ('cant', models.IntegerField(default=0, verbose_name='Cantidad')),
                ('price_purchase', models.IntegerField(default=0, verbose_name='Precio Compra')),
                ('price_sale', models.IntegerField(default=0, verbose_name='Precio Venta')),
                ('status', models.CharField(choices=[('ACTIVO', 'ACTIVO'), ('INHABILITADO', 'INHABILITADO')], default='ACTIVO', max_length=15, verbose_name='Estado')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='product/%Y/%m/%d', validators=[product.models.validate_image_size], verbose_name='Foto del Producto')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='product.category', verbose_name='Categoría')),
                ('user_creation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_creation', to=settings.AUTH_USER_MODEL)),
                ('user_updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
            },
        ),
        migrations.CreateModel(
            name='Buy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('date_register', models.DateField(verbose_name='Fecha de Registro')),
                ('n_invoice', models.IntegerField(blank=True, null=True, verbose_name='N° Factura')),
                ('date_invoice', models.DateField(blank=True, null=True, verbose_name='Fecha de Factura')),
                ('total_prod', models.IntegerField(default=0, verbose_name='Total Productos')),
                ('total', models.IntegerField(default=0, verbose_name='Total P.C.')),
                ('shopping_products', models.JSONField(blank=True, null=True, verbose_name='Productos Comprados')),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='product.provider', verbose_name='Proveedor')),
                ('user_creation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_creation', to=settings.AUTH_USER_MODEL)),
                ('user_updated', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Compra',
                'verbose_name_plural': 'Compras',
            },
        ),
    ]
