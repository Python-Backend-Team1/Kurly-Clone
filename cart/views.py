from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Cart, CartItem
from product.models import Product

# 장바구니 조회 (View Cart)
@login_required
def cart_view(request):
    # 사용자의 장바구니 가져오기, 없으면 새로 생성
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_items = cart.cart_items.all()
    
    # 총 금액 계산
    total_price = sum([item.product.price * item.quantity for item in cart_items])
    discount_price = 0  # 할인 금액이 있는 경우 적용
    shipping_fee = 3000 if total_price < 50000 else 0  # 배송비 계산
    final_price = total_price - discount_price + shipping_fee

    context = {
        'cart_items': cart_items,
        'total_price': total_price,
        'discount_price': discount_price,
        'shipping_fee': shipping_fee,
        'final_price': final_price,
    }
    return render(request, 'cart/cart.html', context)

# 장바구니 항목 추가 (Add Item to Cart)
@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)  # 상품이 존재하는지 확인
    cart, created = Cart.objects.get_or_create(user=request.user)  # 사용자별 장바구니 가져오기, 없으면 생성

    # CartItem이 이미 장바구니에 있으면 수량을 증가시키고, 없으면 새로 추가
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1  # 이미 존재하는 경우 수량 증가
    cart_item.save()

    # 올바른 네임스페이스와 이름을 사용하여 리다이렉트
    return redirect('cart:cart_view')

# 장바구니 항목 수정 (Update Cart Item)
@login_required
def update_cart_item(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)  # cart_item_id 사용
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()  # 수량이 0이거나 음수일 경우 삭제
    return redirect('cart:cart_view')

# 장바구니 항목 삭제 (Remove Item from Cart)
@login_required
def remove_cart_item(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)  # cart_item_id 사용
    cart_item.delete()
    return redirect('cart:cart_view')