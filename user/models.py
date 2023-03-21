from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.core.serializers import json
from django.db import models
from django.forms import model_to_dict
from .choices import *


class User(AbstractUser):
    first_name = models.CharField(max_length=100, verbose_name='Nombre')
    last_name = models.CharField(max_length=100, verbose_name='Apellido', null=True, blank=True)
    rut = models.CharField(max_length=15, unique=True, null=True, blank=True, verbose_name='RUT/Pasaporte')
    internal_code = models.CharField(max_length=15, unique=True, null=True, blank=True, verbose_name='Código Interno')
    phone = models.CharField(max_length=15, blank=True, null=True, verbose_name='Teléfono')
    email = models.EmailField(blank=True, null=True, verbose_name='Correo')
    address = models.CharField(max_length=150, null=True, blank=True, verbose_name='Dirección')
    blood_type = models.CharField(max_length=15, null=True, blank=True, choices=blood_type_choices, verbose_name='Tipo de Sangre')
    allergy = models.CharField(max_length=200, null=True, blank=True, verbose_name='Alergias')
    contact_name = models.CharField(max_length=100, null=True, blank=True, verbose_name='Persona de Contacto')
    contact_phone = models.CharField(max_length=15, null=True, blank=True, verbose_name='Teléfono de Contacto')

    def __str__(self):
        return '{} - {}'.format(self.username, self.internal_code)

    def toJSON(self):
        item = model_to_dict(self)
        item['date_joined'] = self.date_joined.strftime('%d/%m/%Y')
        item['groups'] = [{'id':g.id, 'name':g.name} for g in self.groups.all()]
        return item



