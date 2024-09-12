from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Cart, CartItem
from product.models import Product
from django.contrib import messages
from django.http import JsonResponse

# 장바구니 조회 (View Cart)
@login_required
def cart_view(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_items = cart.cart_items.all()

    # 수량이 0인 항목 제거
    for item in cart_items:
        if item.quantity == 0:
            item.delete()

    # 다시 장바구니 항목 가져오기
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
    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        messages.info(request, "상품의 수량이 추가되었습니다.")
    else:
        messages.success(request, "상품이 장바구니에 추가되었습니다.")
    cart_item.save()

    return redirect('cart:cart_view')

# 장바구니 항목 수정 (Update Cart Item)
@login_required
def update_cart_item(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
            messages.success(request, "상품 수량이 업데이트되었습니다.")
        else:
            cart_item.delete()
            messages.info(request, "상품이 장바구니에서 삭제되었습니다.")
    return redirect('cart:cart_view')

# 장바구니 항목 삭제 (Remove Item from Cart)
@login_required
def remove_cart_item(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)
    cart_item.delete()
    messages.success(request, "상품이 장바구니에서 삭제되었습니다.")
    return redirect('cart:cart_view')

# 장바구니 전체 비우기 (Clear Cart)
@login_required
def cart_clear(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart.cart_items.all().delete()  # 장바구니의 모든 항목 삭제
    messages.success(request, "장바구니가 비워졌습니다.")
    return redirect('cart:cart_view')

# 상품 수량 감소 (Decrease Product)
@login_required
def decrease_product(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)
    
    # 수량이 1 이상일 때만 감소, 그렇지 않으면 항목 삭제
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()
        messages.success(request, "상품 수량이 감소되었습니다.")
    else:
        cart_item.delete()
        messages.info(request, "상품이 장바구니에서 삭제되었습니다.")
    
    return redirect('cart:cart_view')

# 상품 수량 증가 (Add Product)
@login_required
def add_product(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)
    cart_item.quantity += 1
    cart_item.save()
    messages.success(request, "상품 수량이 추가되었습니다.")
    return redirect('cart:cart_view')

# 상품 삭제 (Delete Product)
@login_required
def delete_product(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)
    cart_item.delete()
    messages.success(request, "상품이 장바구니에서 삭제되었습니다.")
    return redirect('cart:cart_view')

# 배송지 변경 (Ship Destination)
@login_required
def ship_destination(request):
    if request.method == 'POST':
        # 배송지 변경 로직 처리
        new_address = request.POST.get('new_address')
        if new_address:
            # 사용자 프로필에 새 주소 저장
            request.user.profile.address = new_address
            request.user.profile.save()
            messages.success(request, "배송지가 변경되었습니다.")
        return redirect('cart:cart_view')
    
    # GET 요청인 경우 배송지 변경 폼 렌더링
    return render(request, 'cart/ship_destination.html')

@login_required
def update_cart_item_ajax(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, cart_item_id=cart_item_id, cart__user=request.user)
    
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()
    
    # 금액 업데이트
    cart = cart_item.cart
    cart_items = cart.cart_items.all()
    
    total_price = sum([item.product.price * item.quantity for item in cart_items])
    shipping_fee = 3000 if total_price < 50000 else 0
    final_price = total_price + shipping_fee
    
    return JsonResponse({
        'total_price': total_price,
        'shipping_fee': shipping_fee,
        'final_price': final_price,
    })