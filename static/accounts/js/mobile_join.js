$(document).ready(function() {




    //아이디 조건 만족 불만족 확인하기
    var text_id = $('.field_id input');
    text_id.focus(function(){               //포커스 되면
        $('.field_id .txt_guide').css('display', 'block');
    });
    text_id.blur(function(){              //포커스에서 벗어나면
        
        id_check();              //id_check() 함수 실행
        
    });


    //비밀번호 조건 만족 불만족 확인하기
    var text_pw = $('.field_pw input');
    text_pw.focus(function(){               //포커스 되면
        $('.field_pw .txt_guide').css('display', 'block');
    });
    text_pw.blur(function(){              //포커스에서 벗어나면
        
        pw_check();              //id_check() 함수 실행    
    });

    
    var text_pw2 = $('.field_repw input');
    text_pw2.focus(function(){
        $('.field_repw .txt_guide').css('display', 'block');
    });
    text_pw2.blur(function(){      
        pw2_check();
    });







    //아이디 중복 체크
    $('.field_id .btn').click(function(){

        if ($('.field_id input').val() == '') {    //만약에 아무것도 입력 되지 않은 상태면
            alert('아이디를 입력해주세요');
            $(".field_id .txt_guide .txt_case2").css('color', '#b3130b');
            return;
        }

        id_overlap_input = document.querySelector('input[name="id"]');
    
        $.ajax({
          type: "GET",
          url: "./id_check?id="+id_overlap_input,    //해당 url로 데이터를 넘김
          data: {
            'username': $('.field_id input').val()
          },
          datatype: 'json',
          success: function (data) {
            console.log(data['overlap']);
            if (data['overlap'] == "fail") {
              alert("이미 존재하는 아이디 입니다.");
              $(".field_id .txt_guide .txt_case2").css('color', '#b3130b');
              id_overlap_input.focus();
              return;
            } else {
              alert("사용가능한 아이디 입니다.");
              $(".field_id .txt_guide .txt_case2").css('color', '#0f851a');
              return;
            }
          }
        });
    });










    //이메일 중복 체크
    $('.field_email .btn').click(function(){

        if ($('.field_email input').val() == '') {    //만약에 아무것도 입력 되지 않은 상태면
            alert('이메일을 입력해주세요');
            return;
        }

        email_overlap_input = document.querySelector('input[name="email"]');
    
        $.ajax({
          type: "GET",
          url: "./email_check?id="+email_overlap_input,    //해당 url로 데이터를 넘김
          data: {
            'email': $('.field_email input').val()
          },
          datatype: 'json',
          success: function (data) {
            console.log(data['overlap']);
            if (data['overlap'] == "fail") {
              alert("이미 존재하는 이메일 입니다.");
              email_overlap_input.focus();
              return;
            } else {
              alert("사용가능한 이메일 입니다.");
              return;
            }
          }
        });
    });




    $('.btn_delivery_close').click(function(){
        $('.layout-layer-popup').css('display', 'none');
        $('#user_address').css('display', 'block');
        $('#wrap').css('overflow-y', '');
    });

    $('#addressSearch').click(function(){
        $('.layout-layer-popup').fadeIn(500);
        $('#wrap').css('overflow-y', 'hidden');
        // $('.layout-layer-popup').css('display', 'block');
    });


    $('.research_address').click(function(){
        $('.layer_prev').css('display', 'none');
        $('#sample3_address').css('display', 'none');
        $('#sample3_detailAddress').css('display', 'none');
        $('.no_delivery').css('display', 'none');
    })




   


































});