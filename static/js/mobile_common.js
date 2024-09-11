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