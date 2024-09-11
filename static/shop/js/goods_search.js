// 로그인 시 #cartPut .txt_point .no_login에 hide 클래스 추가,
// #cartPut .txt_point .point에 show 클래스 추가
// 로그아웃 시 #cartPut .txt_point .no_login에 hide 클래스 삭제,
// #cartPut .txt_point .point에 show 클래스 삭제

const inner_listgoods = document.querySelector('.inner_listgoods'),
	li = inner_listgoods.querySelectorAll("li"),
	cartput_button = inner_listgoods.querySelectorAll(".btn_cart2"),
	cart_type1 = document.querySelector(".cart_type1"),
	bg_loading = document.querySelector(".bg_loading"),
	cartPut = document.querySelector("#cartPut"),
	cartPut_name = cartPut.querySelector(".name"),
	cartPut_price = cartPut.querySelector(".dc_price"),
	cartPut_sum_price = cartPut.querySelector(".num"),
	cartPut_point = cartPut.querySelector(".emph"),
	cancel = cartPut.querySelector(".txt_type"),
	button_up = cartPut.querySelector(".up"),
	button_down = cartPut.querySelector(".down"),
	count = cartPut.querySelector(".inp"),
	btn_type1 = cartPut.querySelector(".btn_type1"),
    goods_id = btn_type1.querySelector(".txt_type");




var product_name = [];  //상품명 리스트
var product_price = []; //상품 가격 리스트
var product_desc = [];  //상품 한줄소개 리스트
var product_value = []; //상품 갯수 바뀔 때 필요한 value값 리스트
var product_id = [];

for (i=0; i<li.length; i++){           // 리스트 값에 저장해주는 반복문
	product_name[i] = li[i].querySelector(".name");
	product_price[i] = li[i].querySelector(".price");
	product_desc[i] = li[i].querySelector(".desc");
	product_value[i] = li[i].querySelector(".value").value; //클래스 = value, 속성 = value
	product_id[i] = li[i].querySelector(".btn_cart2").value;
}


for (var i = 0; i < li.length; i++) {    // 클릭했을 때 그 인덱스 맞는 값을 넣어주는 반복문
    (function(idx) {
        cartput_button[idx].onclick = function() {
            cart_type1.classList.add('show');
			bg_loading.classList.add ('show');
			goods_id.value = product_id[idx];
			cartPut_name.innerHTML = product_name[idx].innerHTML;
			cartPut_price.innerHTML = product_price[idx].innerHTML;
			cartPut_sum_price.innerHTML = product_price[idx].innerHTML;
			cartPut_point.innerHTML =  comma((product_value[idx] * 1)/20)+'원 적립';

			var k = 1
			button_up.addEventListener('click', function(){   // 수량 올리기 버튼 클릭 함수
				k++;
				count.value = k;
				cartPut_sum_price.innerHTML = comma(product_value[idx] * k);
				cartPut_point.innerHTML =  comma((product_value[idx] * k)/20)+'원 적립';

			});

			button_down.addEventListener('click', function(){  // 수량 내리기 버튼 클릭 함수
				if (k > 0){
					k--;
					count.value = k;
					cartPut_sum_price.innerHTML = comma(product_value[idx] * k);
					cartPut_point.innerHTML =  comma((product_value[idx] * k)/20)+'원 적립';
				}
			});

			cancel.addEventListener('click', function(){   // 취소버튼 클릭시 사라지게 하는 반복문

				cart_type1.classList.remove('show');
				bg_loading.classList.remove('show');
				count.value = 1;
				k = 1;

			});

        }

    })(i);
}




function comma(num){          //콤마찍는 함수
	var len, point, str;

	num = num + "";  //number를 ""와 더해 문자열로 만듦.
	point = num.length % 3 ; //number의 길이를 나눈 후 나머지를 저장. ex) 1000이라는 4글자를 3으로 나눠 나머지 1을 저장.
	len = num.length; //number의 길이 저장

	str = num.substring(0, point);
	// substring() = 문자열 자르기 함수 (시작인덱스, 종료인덱스)
	// * 문자열 = 배열
	while (point < len) {
		if (str != "") str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}

	return str;

}