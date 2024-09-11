const mobile_goTop = () => {
	// Scroll | button show/hide
	window.addEventListener('scroll', () => {
		const mGotop = document.getElementById('m-go-top');
	  if (document.querySelector('html, body').scrollTop > 1000) {
		mGotop.style.opacity = "1";
	  } else {
		mGotop.style.opacity = "0";
	  }
	});
	// back to top
	document.getElementById('m-go-top').addEventListener('click', () => {
	  window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	  });
	})
  };
  mobile_goTop();

// top_bnr 삭제 구현
const top_bnr = document.querySelector('#appBanner');
const top_bnr_close = top_bnr.querySelector('#bnrHeaderClose');
const wrapp = document.querySelector('#wrap'); // padding-top: 95;
const header = document.querySelector('#header_purple'); // top: 0
const lnb = document.querySelector('#lnbMenu'); // top: 50
top_bnr_close.addEventListener('click', function() {
	wrap.style.paddingTop = '95px';
	top_bnr.classList.add('hide');
	header.classList.add('move');
	lnb.classList.add('move');
});

// 로딩 시 3초간 안내메세지 구현
const location_status = document.querySelector('.location_status');
window.addEventListener('load', function() {
    location_status.classList.add('active');
    setTimeout(function() {
        location_status.classList.remove('active');
    }, 3000);
});