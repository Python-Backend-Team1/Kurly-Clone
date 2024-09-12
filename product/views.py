from django.shortcuts import render, get_object_or_404, redirect
from product.models import Category, Product
from django.contrib.auth.decorators import user_passes_test
from product.forms import ProductForm

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

    return render(request, 'home.html', context)

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

def staff_member_required(view_func):
    decorated_view_func = user_passes_test(
        lambda u: u.is_staff,
        login_url='users:login'
    )(view_func)
    return decorated_view_func

@staff_member_required
def staff_only_view(request):
    return render(request, 'product/staff-only.html')

def product_add(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('product:product_list')
    else:
        form = ProductForm()
    return render(request, 'product/product_form.html', {'form': form})

def product_edit(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product:product_list')
    else:
        form = ProductForm(instance=product)
    return render(request, 'product/product_form.html', {'form': form})

def product_delete(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('product:product_list')
    return render(request, 'product/product_confirm_delete.html', {'product': product})