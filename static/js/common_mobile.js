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
    function search_click(){
        wrap.style.cssText = "padding-top: 95px; overflow-y: hidden";
        searchMenu.classList.add('__active');
        searchDelete.classList.add('on');
    }
    // searchOpen.addEventListener('click', function() {
    //     console.log("ghh");
    //     wrap.style.cssText = "padding-top: 95px; overflow-y: hidden";
    //     searchMenu.classList.add('__active');
    //     searchDelete.classList.add('on');
    //
    // // 2. input에 값이 있으면 btn_del에 on 클래스 추가, 값이 없을 때 삭제
    //     searchInput.addEventListener('input', function() {
    //         if (searchInput.value !== null) {
    //             searchDelete.classList.add('on');
    //         };
    //     });
    // });

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