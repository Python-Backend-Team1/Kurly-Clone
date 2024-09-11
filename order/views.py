from django.shortcuts import render, get_object_or_404, redirect
from .models import Order, OrderItem
from product.models import Product 
from django.contrib.auth.decorators import login_required

@login_required
def create_order(request):
    if request.method == 'POST':
        order = Order.objects.create(user=request.user, total_price=0)
        total_price = 0
        
        # 장바구니에서 상품 정보를 받아와서 주문 항목을 생성하는 부분
        cart = request.session.get('cart', {})

        for product_id, quantity in cart.items():
            product = get_object_or_404(Product, id=product_id)
            price = product.price * quantity
            total_price += price
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)
        
        order.total_price = total_price
        order.save()
        
        # 주문 완료 후 장바구니 비우기
        request.session['cart'] = {}
        
        return redirect('order_success', order_id=order.id)
    return redirect('cart')

@login_required
def order_list(request):
    orders = Order.objects.filter(user=request.user)
    return render(request, 'orders/order_list.html', {'orders': orders})

@login_required
def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'orders/order_detail.html', {'order': order})