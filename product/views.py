from django.shortcuts import render, get_object_or_404
from product.models import Category, Product

# Create your views here.
def product_list(request, category_id=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter()

    if category_id:
        category = get_object_or_404(Category, id=category_id)
        products = products.filter(category_id=category_id)
    
    else:
        category = None
        products = Product.objects.all()

    context = {
        'category': category,
        'categories': categories,
        'products': products,
    }

    return render(request, 'product/list.html', context)

def product_detail(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)
    context = {
        'product': product,
    }

    return render(request, 'product/detail.html', context)
