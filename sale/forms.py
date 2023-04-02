from django import forms
from django.contrib.auth.models import Group
from .models import *
from user.models import User


class SaleForm(forms.ModelForm):
    user = forms.ModelChoiceField(queryset=User.objects.none())

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['user'].widget.attrs['class'] = 'form-control select2bs4'
        self.fields['user'].widget.attrs['style'] = 'width: 100%'
        grupo = Group.objects.filter(user=user).first()
        if grupo and grupo.name == 'Vendedor':
            self.fields['user'].queryset = User.objects.filter(groups__name='Vendedor', is_active=True).exclude(is_superuser=True)
            self.fields['type_sale'].widget.attrs['disabled'] = True
            self.fields['type_sale'].initial = 'Venta'
        else:
            self.fields['user'].queryset = User.objects.filter(is_active=True).exclude(is_superuser=True)

    class Meta:
        model = Sale
        fields = '__all__'
        exclude = ['user_creation', 'user_updated']
        widgets = {
            'total_prod': forms.NumberInput(attrs={'readonly':True}),
            'total_sale': forms.NumberInput(attrs={'readonly':True}),
        }



