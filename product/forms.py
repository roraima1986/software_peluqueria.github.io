from datetime import date
from django import forms
from django.core.validators import RegexValidator

from .models import *

# Categoría
class CategoryForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['name'].widget.attrs['autofocus'] = True

    class Meta:
        model = Category
        fields = '__all__'
        exclude = ['user_creation', 'user_updated']


# Proveedor
class ProviderForm(forms.ModelForm):
    rut = forms.CharField(
        min_length=9,
        help_text='Sin Puntos. Ejemplo: 12345678-9',
        validators=[RegexValidator(r'^(\d{1,8}-[\dkK])$')],
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['name'].widget.attrs['autofocus'] = True

    class Meta:
        model = Provider
        fields = '__all__'
        exclude = ['user_creation', 'user_updated']

# Productos
class ProductForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['name'].widget.attrs['autofocus'] = True
        self.fields['category'].widget.attrs['class'] = 'form-control select2bs4'
        self.fields['photo'].widget.attrs['class'] = 'form-control-file'
        self.fields['price_purchase'].widget.attrs['class'] = 'form-control'
        self.fields['price_sale'].widget.attrs['class'] = 'form-control'

    class Meta:
        model = Product
        fields = '__all__'
        exclude = ['user_creation', 'user_updated']
        widgets = {
            'name': forms.TextInput(),
            'category': forms.Select(attrs={'style': 'width:100%'}),
            'range_stock': forms.NumberInput(attrs={'min': 0}),
            'stock': forms.NumberInput(attrs={'min': 0}),
            'price_purchase': forms.NumberInput(attrs={'min': 0}),
            'price_sale': forms.NumberInput(attrs={'min': 0})
        }


# Compras
class BuyForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['provider'].widget.attrs = {
            'autofocus': True,
            'class': 'form-control select2bs4',
        }


    class Meta:
        model = Buy
        fields = '__all__'
        exclude = ['user_creation', 'user_updated']
        widgets = {
            'id': forms.TextInput(attrs={'readonly':True}),
            'date_register': forms.TextInput(attrs={'type': 'date', 'value': date.today, 'readonly':True}),
            'date_invoice': forms.TextInput(attrs={'type': 'date'}),
            'subtotal': forms.NumberInput(attrs={'readonly':True}),
            'total': forms.NumberInput(attrs={'readonly':True}),
            'total_prod': forms.NumberInput(attrs={'readonly':True}),
        }


# Agregar Productos en el formulario de Compra
class ProductBuyForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['name'].widget.attrs['autofocus'] = True
        self.fields['category'].widget.attrs['class'] = 'form-control select2bs4'

    class Meta:
        model = Product
        fields = ['name', 'barcode', 'category', 'range_stock', 'status']
        widgets = {
            'name': forms.TextInput(),
            'range_stock': forms.NumberInput(attrs={'min': 0}),
        }





