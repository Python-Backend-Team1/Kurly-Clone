from django.shortcuts import render, get_object_or_404
from product.models import Category, Product

# Create your views here.
def product_list(request, category_id=None):
    categories = Category.objects.all()
    products = Product.objects.all()

    if category_id:
        category = get_object_or_404(Category, id=category_id)
        products = products.filter(category_id=category_id)
    else:
        category = None

    context = {
        'category': category,
        'categories': categories,
        'products': products,
    }

    return render(request, 'product/list.html', context)

from django.shortcuts import get_object_or_404, render
from .models import Product

def product_detail(request, product_id):
    # 'id' 필드를 사용하여 상품을 조회
    product = get_object_or_404(Product, id=product_id)
    context = {
        'product': product,
    }

    return render(request, 'product/detail.html', context)
def home(request):
    products = Product.objects.all()  # 모든 상품을 가져옴
    return render(request, 'home.html', {'products': products})
