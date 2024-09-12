from django import forms
from product.models import Product, Category

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['category_id', 'product_id', 'name', 'image', 'unit', 'description', 'price']