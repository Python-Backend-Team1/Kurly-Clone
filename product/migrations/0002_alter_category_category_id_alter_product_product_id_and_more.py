# Generated by Django 5.0.7 on 2024-09-05 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='stock_quantity',
            field=models.IntegerField(),
        ),
    ]
