'use strict';


// 로그인 시 top_event, sign_menu .login 추가


// top_bnr 삭제 구현
const top_event = document.querySelector('#top_event');
const top_event_close = document.querySelector('.top_event_close.login');
top_event_close.addEventListener('click', function() {
    top_event.classList.add('hide');
});

// 로딩 시 3초 간 안내메세지
const location_login = document.querySelector('.location_login');
const location_notice = location_login.querySelector('.location_notice');
window.addEventListener('load', function() {
    location_login.classList.add('active');
    setTimeout(function() {
        location_login.classList.remove('active');
    }, 3000);
});


// gnb 상단 고정 구현
const gnb = document.querySelector('.gnb');
const gnbTopOffset = gnb.offsetTop;
window.addEventListener('scroll', e =>{

    if (window.pageYOffset >= gnbTopOffset) {
        gnb.style.position = 'fixed';
        gnb.style.top = 0;
        gnb.style.left = 0;
        gnb.style.right = 0;
    } else {
        gnb.style.position = '';
        gnb.style.top = '';
    }
});
// gnb 상단 고정 끝 --


// gnb_search
// (1) btn_delete 클릭 > value 값 초기화
const btnD = document.querySelector('.btn_delete');
const inpSearch = document.querySelector('.inp_search');

btnD.onclick = function () {
    inpSearch.value = '';
}

// (2) 입력 창 focus > 배경 #fff 변경, focus를 잃으면 원래대로.
// transition 0.3초 추가
inpSearch.addEventListener('focus', function(changeBg) {
    this.style.backgroundColor = '#fff';
}, true);
inpSearch.addEventListener('blur', function(changeBg) {
    this.style.backgroundColor = '';
}, true);
// gnb_search 끝