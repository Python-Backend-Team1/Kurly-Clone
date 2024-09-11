

// 장바구니
const list_goods = document.querySelector('.search_list'),
      li = list_goods.querySelectorAll('.list_item'),
      rate = list_goods.querySelector('.dc'),
      cartPut_button = list_goods.querySelectorAll('.btn_cart'),
      cart_type3 = document.querySelector('.cart_type3'),
      bg_loading = document.querySelector('.bg_loading'),
      cartPut = document.querySelector('#cartPut'),
      cartPut_name = cartPut.querySelector('.name'),
      cartPut_dc_price = cartPut.querySelector('.dc_price'),
      cartPut_ori_price = cartPut.querySelector('.original_price'),
      cartPut_sum_price = cartPut.querySelector('.num'), //dc_price의 합계
      
      cartPut_point = cartPut.querySelector('.emph'),
      cancel = cartPut.querySelector(".txt_type"),
      button_up = cartPut.querySelector(".up"),
	    button_down = cartPut.querySelector(".down"),
      count = cartPut.querySelector(".inp");


let product_name = [];  //상품명 리스트
let product_price = []; //상품 (할인) 가격 리스트
let product_origin_price = []; //원가 리스트
let product_value = []; //상품 갯수 바뀔 때 필요한 value값 리스트

  for (i=0; i<li.length; i++){           // 리스트 값에 저장해주는 반복문
    product_name[i] = li[i].querySelector(".name"); //li 상품 이름
    product_price[i] = li[i].querySelector(".price"); // li 상품 (할인) 가격
    product_origin_price[i] = li[i].querySelector('.original'); // li 원가
    product_value[i] = li[i].querySelector(".value").value; // 상품 갯수 바뀔 때 필요한 value
  }
  
  
  for (let i = 0; i < li.length; i++) {    // 클릭했을 때 그 인덱스 맞는 값을 넣어주는 반복문
    
    (function(idx) {
        cartPut_button[idx].onclick = function() {
                if (li[idx].querySelector('.dc') === null) { //li에게 할인율이 없다면
                  cartPut_ori_price.style = 'display: none'; //cartPut에서 원가 삭제
                } else {
                  cartPut_ori_price.innerHTML = product_origin_price[idx].innerHTML; //carPut에 원가 체크 후 있으면 보이게, 없으면 안보이게.
                  cartPut_ori_price.style = 'display: inline';
                
                };

                cart_type3.classList.add('show');
                bg_loading.classList.add ('show');
                document.body.classList.add ('fixed_bg');
                cartPut_name.innerHTML = product_name[idx].innerHTML;
                cartPut_dc_price.innerHTML = product_price[idx].innerHTML;
                cartPut_sum_price.innerHTML = product_price[idx].innerHTML;
                cartPut_point.innerHTML = Math.round(Number(((product_value[idx] * 1)*0.005))).toLocaleString('ko')+'원 적립';
                //Math.round() :소수점 반올림, 정수형 변환
                // Number().toLocaleString('ko'): 숫자의 사용 언어에 따른 문자열 반환
            
                
  
                var k = 1
                button_up.addEventListener('click', function(){   // 수량 올리기 버튼 클릭 함수
                  k++;
                  count.value = k;
                  cartPut_sum_price.innerHTML = Math.round(Number((product_value[idx] * k))).toLocaleString('ko');
                  cartPut_point.innerHTML =  Math.round(Number((product_value[idx] * k)*0.005)).toLocaleString('ko')+'원 적립';
                
                });
              
                button_down.addEventListener('click', function(){  // 수량 내리기 버튼 클릭 함수
                  if (k > 0){
                    k--;
                    count.value = k;
                    cartPut_sum_price.innerHTML = Math.round(Number((product_value[idx] * k))).toLocaleString('ko');
                    cartPut_point.innerHTML =  Math.round(Number(((product_value[idx] * k)/20))).toLocaleString('ko')+'원 적립';
                  }
                });
              
                cancel.addEventListener('click', function(){   // 취소버튼 클릭시 사라지게 하는 반복문
                
                  cart_type3.classList.remove('show');
                  bg_loading.classList.remove('show');
                  document.body.classList.remove ('fixed_bg');
                  count.value = 1;
                  k = 1;

                
                });
        
        }
  
    })(i);
  }

  // 로딩 시 3초간 안내메세지
  const location_status = document.querySelector('.location_status');
  window.addEventListener('load', function() {
      location_status.classList.add('active');
      setTimeout(function() {
          location_status.classList.remove('active');
      }, 3000);
  });

$(document).ready(function(){


    $('.shortcut_home').click(function(){
        for(i=0;i<$('.menu_shortcut ul li').length;i++){           // li의 갯수만큼 반복해서 on이라는 클래스를 가지고 있는 애를 찾아서 on 삭제
            if($('.menu_shortcut ul li a').hasClass("on") === true){      // 여기서 on은 글자색 보라색으로 해주는 css클래스요소
                $('.menu_shortcut ul li a').removeClass('on');            // 기존에 있던 on은 비활성화 시키고 , 이번에 클릭한 요소에다가 on을 활성화 시키기 위함임
            }
        }
        $('.shortcut_home').addClass('on');
    });

    $('.shortcut_menu').click(function(){
        for(i=0;i<$('.menu_shortcut ul li').length;i++){           // li의 갯수만큼 반복해서 on이라는 클래스를 가지고 있는 애를 찾아서 on 삭제
            if($('.menu_shortcut ul li a').hasClass("on") === true){      // 여기서 on은 글자색 보라색으로 해주는 css클래스요소
                $('.menu_shortcut ul li a').removeClass('on');            // 기존에 있던 on은 비활성화 시키고 , 이번에 클릭한 요소에다가 on을 활성화 시키기 위함임
            }
        }
        $('.shortcut_menu').addClass('on');
    });

    $('.shortcut_mypage').click(function(){
        for(i=0;i<$('.menu_shortcut ul li').length;i++){           // li의 갯수만큼 반복해서 on이라는 클래스를 가지고 있는 애를 찾아서 on 삭제
            if($('.menu_shortcut ul li a').hasClass("on") === true){      // 여기서 on은 글자색 보라색으로 해주는 css클래스요소
                $('.menu_shortcut ul li a').removeClass('on');            // 기존에 있던 on은 비활성화 시키고 , 이번에 클릭한 요소에다가 on을 활성화 시키기 위함임
            }
        }
        $('.shortcut_mypage').addClass('on');
    });
});


// aside 검색창은 공통부분으로 common_mobile.js에 넣었습니다!
// >> 카테고리 html 파일에 <aside id="search-menu" class="layout-search-area"> 이부분 넣어주시면 돼요!

// 1. 검색 버튼 누르면 #wrap의 max-height 기기의 높이값에 맞게 변경
// + #wrap style에 overflow-y: hidden; 추가 (백그라운드 스크롤 방지)
// + 검색 버튼 누르면 검색창(searchMenu) 오픈
const searchOpen = document.querySelector('#search-area-open'),
    wrap = document.querySelector('#wrap'),
    searchMenu = document.querySelector('.layout-search-area'),
    searchClose = document.querySelector('#search-area-close'),
    searchForm = document.querySelector('.layout-search-form'),
    searchWrap = document.querySelector('.layout-search-wrapper '),
    searchInput = document.querySelector('.inp_search'),
    searchDelete = document.querySelector('#searchDelete'),
    searchUl = document.querySelector('.layout-search-result-list'),
    searchItemDel = searchUl.querySelectorAll('.btn_del');



    // 검색 레이어가 나타나면 배경을 고정시켜 스크롤 되지 않게 함.
    searchOpen.addEventListener('click', function() {
        wrap.style.cssText = "padding-top: 95px; overflow-y: hidden";
        searchMenu.classList.add('__active');
        searchDelete.classList.add('on');

    // 2. input에 값이 있으면 btn_del에 on 클래스 추가, 값이 없을 때 삭제
        searchInput.addEventListener('input', function() {
            if (searchInput.value !== null) {
                searchDelete.classList.add('on');
            };
        });
    });

    searchDelete.addEventListener('click', function() {
        searchInput.value = '';
        searchDelete.classList.remove('on');
    });

    // 3. 닫기 버튼 클릭시 검색창(searchMenu) 클로즈
    searchClose.addEventListener('click', function() {
        searchMenu.classList.remove('__active');
        wrap.style.cssText = "padding-top: 95px;";
    });


const search_list = document.querySelector('.layout-search-result-list'); //ul
let idNumbers = 1; // 쿠키에 저장할 리스트 번호 주는 변수
let search_list_save = []; // 이 배열에 저장했다가 쿠키에 저장할꺼임

searchForm.addEventListener('submit', function() { //엔터치면 paint_list() 함수 실행. input = input 값
    const input = document.querySelector('.inp_search').value;
    paint_list(input);
});

function save_list() {
    // localStorage: 웹 브라우저에 key, value로 이루어진 데이터 저장. 창 끼리 데이터 공유. 창을 닫아도 데이터가 남음.
    // string이 아닌 원본 데이터를 그대로 가져오기 위해 JSON으로 직렬화 해줌.
    //키에 데이터 쓰기: localStorage.setItem('key', value);
    //데이터를 서버에 전송할 때 JSON.stringify를 이용해 JSON 표기법의 문자열로 변환
    localStorage.setItem('key', JSON.stringify(search_list_save));
}

function paint_list(text) { //input 값 받아와서 추가하는 함수
    const li = document.createElement("li");
    const a = document.createElement("a");
    const delBtn = document.createElement("button");
    const newId = idNumbers;
    idNumbers += 1; // 쿠키에 변수 저장하고 숫자증가

    li.style.position = "relative";
    a.innerText = text;
    a.classList.add("link");
    delBtn.classList.add("btn_del");
    delBtn.addEventListener("click", delete_list);
    li.appendChild(delBtn);
    li.appendChild(a);
    li.appendChild(delBtn);
    li.id = newId;
    search_list.appendChild(li);

    const search_result = {
        text : text, // a 태그 안에 들어갈 text
        id : newId //idNumbers = 쿠키에 저장할 리스트 번호
    };
    search_list_save.push(search_result); //배열에 search_list 키와 값들을 넣음.
    save_list(); // 배열에 넣은 키, 값 들을 localStorage에 저장
}

    function delete_list(e) {
        const btn = e.target;
        const li = btn.parentNode;
        search_list.removeChild(li);
        const clean_list = search_list_save.filter(function(se_list){
            console.log(se_list.id);
            console.log(li);
            return se_list.id !== parseInt(li.id);
        });
        search_list_save = clean_list;
        save_list();
    }




    function load_search_list() { // 브라우저 실행했을 때 localStroage에 있는 값을 불러오는 함수
        const loadedlist = localStorage.getItem('key');

        if (loadedlist !== null) { // 값 체크
            const parsedlist = JSON.parse(loadedlist); // string이 아닌 원본 데이터를 그대로 가져오기 위해 JSON으로 역직렬화 해줌.
            parsedlist.forEach(function(_index) {
                paint_list(_index.text);
            });
        }
    }

load_search_list();

