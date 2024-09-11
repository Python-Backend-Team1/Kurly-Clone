
$(document).ready(function(){
    $(".slide").slideDown(500);  // 새로고침 될 때 슬라이드 효과
    

    $('li[type=mobile]').click(function(){             
        var _index =$('li[type=mobile]').index(this);
        index = _index+1;   // _index 값과 nth-child 값이 1 차이가 나서 똑같이 하기 위한 작업
        $('#gnbMenu .list_gnb li:nth-child('+ index +') div').toggle();   // 메뉴가 보였다 안보였다 하는거
        $('#gnbMenu .list_gnb li:nth-child('+ index +') .menu').toggleClass('on'); // 오른쪽 화살표 아이콘 돌아가는거
        $('#gnbMenu .list_gnb li:nth-child('+ index +') .menu span:nth-child(1)').toggle();
        $('#gnbMenu .list_gnb li:nth-child('+ index +') .menu span:nth-child(2)').toggle();

        
    });

    
    setTimeout(function() { 
      $('.bg_loading').css('display', 'none');
  }, 200);



    function hideAni () {    //안내 메세지 사라지게 하기
        const tooltip = $('.location_status');
        tooltip && setTimeout(() => {
          
          tooltip.animate({
            opacity: 0,
          }, 300, () => {
            tooltip.remove();
          });
        }, 3000);
      }

    hideAni();

    


});