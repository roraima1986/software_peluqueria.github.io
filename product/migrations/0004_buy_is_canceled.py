# Generated by Django 4.1.5 on 2023-04-02 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_remove_product_cant_product_stock'),
    ]

    operations = [
        migrations.AddField(
            model_name='buy',
            name='is_canceled',
            field=models.BooleanField(blank=True, default=False, null=True, verbose_name='Anulado'),
        ),
    ]