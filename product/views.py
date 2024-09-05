from django.shortcuts import render, get_object_or_404
from product.models import Category, Product

# Create your views here.
def product_list(request):
    category = None
    categories = Category.objects.all()
    products = Product.objects.all()

    return render(request, 'main.html',
                  {'category':category, 'categories':categories, 'products':products})

def product_detail(request, id):
    product = get_object_or_404(Product, id=id)

    return render(request, 'goods/<int:product_id>.html',
                  {'product':product})
