'use strict';

// #go-top smooth 적용이 안됨 ㅠ
// a 태그에 #값을 넣으면 top으로 가지만 smooth 적용 안됐던 것. > button으로 변경
const commonGoTop = document.getElementById('go-top');

let goTop = () => {
  // Scroll | button show/hide
  window.addEventListener('scroll', () => {
    if (document.querySelector('html, body').scrollTop > 1000) {
      commonGoTop.style.opacity = "1";
    } else {
      commonGoTop.style.opacity = "0";
    }
  });
  // back to top
  commonGoTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })
};
goTop();

// floating banner (.qnb)
// 현재 스크롤이 이동한 높이를 배너의 높이에 적용
// https://m.blog.naver.com/PostView.nhn?blogId=pjh445&logNo=220261440747&proxyReferer=https:%2F%2Fwww.google.com%2F
// https://mastmanban.tistory.com/600