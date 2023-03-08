from datetime import datetime
from django import forms
from django.contrib.auth.models import Group

from .models import *
from user.models import User


class SaleForm(forms.ModelForm):
    user = forms.ModelChoiceField(queryset=User.objects.none())

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        # show_username = kwargs.pop('show_username', False)
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['user'].widget.attrs['class'] = 'form-control select2bs4'
        self.fields['user'].widget.attrs['style'] = 'width: 100%'
        grupo = Group.objects.filter(user=user).first()
        if grupo and grupo.name == 'Vendedor':
            self.fields['user'].queryset = User.objects.filter(groups__name='Vendedor').exclude(is_superuser=True).values_list('internal_code', 'username')
        else:
            self.fields['user'].queryset = User.objects.all().exclude(is_superuser=True).values_list('internal_code', 'username')

    class Meta:
        model = Sale
        fields = '__all__'
        exclude = ['user_creation', 'user_updated']
        widgets = {
            'total_prod': forms.NumberInput(attrs={'readonly':True}),
            'total_sale': forms.NumberInput(attrs={'readonly':True}),
        }

