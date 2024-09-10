from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Cart, CartItem
from django.http import JsonResponse

# 장바구니 조회 (View Cart)
@login_required
def cart_view(request):
    cart = Cart.objects.get(user=request.user)  # 현재 사용자의 장바구니 가져오기
    cart_items = cart.cart_items.all()
    
    # 총 금액 및 기타 계산
    total_price = sum([item.product.price * item.quantity for item in cart_items])
    discount_price = 0  # 할인 금액 예시 (할인 기능이 있을 경우 적용)
    shipping_fee = 3000 if total_price < 50000 else 0  # 배송비 계산 예시
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
    # 상품을 장바구니에 추가하는 로직
    cart, created = Cart.objects.get_or_create(user=request.user)

    # 장바구니 아이템 추가
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart, 
        product_id=product_id,  # Product ID로 추가
        defaults={'quantity': 1}
    )
    
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    
    return redirect('view_cart')

# 장바구니 항목 수정 (Update Cart Item)
@login_required
def update_cart_item(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()  # 수량이 0이거나 음수일 경우 삭제
    return redirect('view_cart')

# 장바구니 항목 삭제 (Remove Item from Cart)
@login_required
def remove_cart_item(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)
    cart_item.delete()
    return redirect('view_cart')

