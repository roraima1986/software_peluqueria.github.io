# Generated by Django 4.1.5 on 2023-02-09 02:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sale', '0002_alter_sale_date_sale'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sale',
            name='cant',
        ),
        migrations.AlterField(
            model_name='sale',
            name='date_sale',
            field=models.DateTimeField(default=datetime.datetime(2023, 2, 8, 23, 8, 4, 443119), verbose_name='Fecha/Hora'),
        ),
    ]
