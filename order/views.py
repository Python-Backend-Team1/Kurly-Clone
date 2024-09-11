from django.shortcuts import render, redirect, get_object_or_404
from cart.models import Cart, CartItem
from .models import Order, OrderItem
from django.contrib.auth.decorators import login_required

@login_required
def create_order(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.cart_items.all()

    if not cart_items:
        return redirect('cart:cart_view')  # 장바구니가 비어있으면 장바구니 페이지로 리다이렉트

    # 주문 생성
    order = Order.objects.create(user=request.user, total_price=0, shipping_address="사용자 주소")
    total_price = 0

    # OrderItem 생성 및 총 가격 계산
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price * item.quantity
        )
        total_price += item.product.price * item.quantity

    # 주문의 총 가격 업데이트
    order.total_price = total_price
    order.save()

    # 장바구니 비우기
    cart.cart_items.all().delete()

    return redirect('home')  # 주문 상세 페이지로 리다이렉트

@login_required
def order_list(request):
    orders = Order.objects.filter(user=request.user)
    return render(request, 'orders/order_list.html', {'orders': orders})

@login_required
def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'orders/order_detail.html', {'order': order})

@login_required
def base_view(request):
    # 사용자의 최근 주문 가져오기
    recent_order = None
    if request.user.is_authenticated:
        recent_order = Order.objects.filter(user=request.user).order_by('-created_at').first()
    return render(request, 'base.html', {'recent_order': recent_order})