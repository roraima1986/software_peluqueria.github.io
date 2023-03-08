from datetime import date
from django import forms
from .models import User


class UserForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['autocomplete'] = 'off'
            form.field.widget.attrs['class'] = 'form-control'
        self.fields['first_name'].widget.attrs['autofocus'] = True
        self.fields['groups'].widget.attrs = {
            'class': 'form-control select2',
            'style': 'width: 100%',
        }

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'rut', 'internal_code', 'phone', 'address', 'blood_type', 'allergy', 'contact_name', 'contact_phone', 'is_active', 'groups', 'date_joined']
        exclude = ['user_permissions', 'last_login', 'is_superuser', 'is_staff', 'user_creation', 'user_updated',]
        widgets = {
            'password': forms.PasswordInput(
                render_value=True,
                attrs = {'type':'password'}
            ),
            'date_joined': forms.TextInput(attrs={'readonly': True}),
        }
        labels = {
            'date_joined':'Fecha de Registro'
        }


    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                pwd = self.cleaned_data['password']
                u = form.save(commit=False)
                if u.pk is None:
                    u.set_password(pwd)
                else:
                    user = User.objects.get(pk=u.pk)
                    if user.password != pwd:
                        u.set_password(pwd)
                u.save()
                u.groups.clear()
                for g in self.cleaned_data['groups']:
                    u.groups.add(g)
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data
