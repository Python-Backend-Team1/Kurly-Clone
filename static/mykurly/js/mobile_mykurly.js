$(document).ready(function(){



  
    //비밀번호 조건 만족 불만족 확인하기
    var text_pw = $('.field_pw input');
    text_pw.focus(function(){               //포커스 되면
        $('.field_pw .txt_guide').css('display', 'block');
    });
    text_pw.blur(function(){              //포커스에서 벗어나면
        
        pw_check();              //id_check() 함수 실행    
    });


    //비밀번호 확인 조건 만족 불만족 확인하기

    var text_pw2 = $('.field_repw input');
    text_pw2.focus(function(){
        $('.field_repw .txt_guide').css('display', 'block');
    });
    text_pw2.blur(function(){      
        pw2_check();
    });



})


function pw_check(){
    var pw = $(".field_pw input").val();                   // 변수 pw에 pw값 대입
    var now_pw = $(".field_nowpw input").val();
    var num = /[0-9]/;
    var eng = /[a-zA-Z]/;
    var spe = /[~!@#$%^&*()_+|<>?:{}]/;



    if(pw.length < 10){                                  //pw의 길이가 10 이하일 때
        $(".field_pw .txt_guide .txt_case1").css('color', '#b3130b');
        $(".field_pw .txt_guide .txt_case1").addClass("bad");
    }

    if(pw.length >= 10){                                  //pw의 길이가 10 이상일 때
        $(".field_pw .txt_guide .txt_case1").css('color', '#0f851a'); 
        $(".field_pw .txt_guide .txt_case1").addClass("good");
    }

    if(num.test(pw) == 0 || eng.test(pw) == 0 || spe.test(pw) == 0){    // pw의 숫자가 없거나 , 영어가 없거나, 특수문자가 없을경우 실패
        $(".field_pw .txt_guide .txt_case2").css('color', '#b3130b');
        $(".field_pw .txt_guide .txt_case2").addClass("bad");
    }

    if(num.test(pw) == 1 && eng.test(pw) == 1 && spe.test(pw) == 1){ // pw의 숫자,영어,특수문자가 1개이상씩 있을경우 성공
        $(".field_pw .txt_guide .txt_case2").css('color', '#0f851a');
        $(".field_pw .txt_guide .txt_case2").addClass("good");
    }

    if(pw != now_pw){
        $(".field_pw .txt_guide .txt_case3").css('color', '#0f851a');
        $(".field_pw .txt_guide .txt_case3").addClass("good");
    }

    if(pw == now_pw){
        $(".field_pw .txt_guide .txt_case3").css('color', '#b3130b');
        $(".field_pw .txt_guide .txt_case3").addClass("bad");
    }
    

}



function pw2_check(){
    var pwd1 = $(".field_pw input").val(); 
    var pwd2 = $(".field_repw input").val();

    if ( pwd1 != '' && pwd2 == '' ) {          //둘다 빈칸일 경우 아무것도 하지 않음
        null;
    } else if (pwd1 != "" || pwd2 != "") {     // 빈칸이 아닐 경우
        if (pwd1 == pwd2) {                    // 비교해서 같으면
            $(".field_repw .txt_guide .txt_case1").css('color', '#0f851a');                 
            $(".field_repw .txt_guide .txt_case1").text("비밀번호가 동일합니다.");
            $(".field_repw .txt_guide .txt_case1").addClass("good");
    
        
        } else {        // 비교해서 같지 않으면
            $(".field_repw .txt_guide .txt_case1").css('color', '#b3130b');
            $(".field_repw .txt_guide .txt_case1").text("비밀번호가 일치하지 않습니다.");
            $(".field_repw .txt_guide .txt_case1").addClass("bad");
        
        
        }
    }
}
