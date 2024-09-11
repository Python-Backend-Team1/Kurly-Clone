$(document).ready(function(){


    
    $('li[name=cate_gory]').click(function(){                  // li태그에서 name이 cate_gory인걸 클릭했을 때
        var cate_index = $('li[name=cate_gory]').index(this);  // 변수 cate_index에다 , 현재 클릭한 name=category의 인덱스를 저장
        

        
        if($('.inner_lnb ul li a').hasClass("on") === true){      // 여기서 on은 글자색 보라색으로 해주는 css클래스요소
            $('.inner_lnb ul li a').removeClass('on');            // 기존에 있던 on은 비활성화 시키고 , 이번에 클릭한 요소에다가 on을 활성화 시키기 위함임
        }
        
        $('.inner_lnb ul li:eq(' + cate_index + ') a').addClass('on');  // 위에서 기존에있던 on을 비활성화 시켰으니 , 방금 클릭한 얘 한테 on을 활성화 해줌

        var change_bg = $('.inner_lnb ul li:eq(' + cate_index + ') a').innerWidth();  //change_bg라는 변수에다가 방금 클릭한 a태그의 가로길이 값을 저장(막대 바 크기 조절을 위해)
        
        
        

        var pos = $('.inner_lnb ul li:eq(' + cate_index + ') a').position();  // 변수 pos에다가 현재 클릭한 a 태그의 위치값 저장
       
        $('.bg_loading').css('display', 'block'); // 로딩창 display block 했다가
        setTimeout(function() {
            $('.bg_loading').css('display', 'none');  //0.5초 뒤에 다시 로딩창 display none 하기
        }, 300);

        
       


        $('.bg').stop().animate({    //bg막대 이동 animate실행
            "left": pos.left+16 + "px",  //left값은 위에서 구한 pos의 left값 만큼 이동
            
        }, 150, function(){  // 150의 속도만큼
            $('.bg').css('width', change_bg+'px');  // 막대길이는 위에서구한 change_bg만큼 변화
        });


    });

    $('.sort_menu .name_select').click(function(){ // name_select 클릭하면 checked 클래스 추가/삭제 
        $('.sort_menu .user_sort').toggleClass('checked');
    });

    $('#goodsList .user_sort .list li').click(function(){
        var _index = $('#goodsList .user_sort .list li').index(this);
                  
        if($('#goodsList .user_sort .list li a').hasClass("on") === true){      // 여기서 on은 글자색 보라색으로 해주는 css클래스요소
            $('#goodsList .user_sort .list li a').removeClass('on');            // 기존에 있던 on은 비활성화 시키고 , 이번에 클릭한 요소에다가 on을 활성화 시키기 위함임
        }
       
        $('#goodsList .user_sort .list li:eq(' + _index + ') a').addClass('on'); 

    });






    var noBody = $('.noBody');


    var product_name = [];        //이름 변수 리스트
    var product_price = [];       //썸네일 가격 변수 리스트
    var product_cost = [];        //상품 수량변경할떄 쓰는 가격 변수 리스트
    var product_id = [];          //상품 아이디값 가져오기

    for(i=0; i < $('.list_goods ul li').length+1; i++){
        product_name[i] = $('li:nth-child('+ i +') .name').text();    //포문으로 리스트 에다가 값을 대입함
        product_price[i] = $('li:nth-child('+ i +') .price').text();
            
        product_cost[i] = $('li:nth-child('+ i +') input').val();
        product_id[i] = $('li:nth-child('+ i +') .btn_cart').val();    
    }

        

        
        

        
        function cart_button(i){                                // 장바구니 버튼 클릭했을떄 수량,적립금 설정함수
            
            $('#cartPut').fadeIn(300);                 // 서서히 보이게 설정 완료
            $('.bg_loading').css('display','block');    //주변 흐릿해지게 해는거 온!
            $('#cartPut .name').text(product_name[i]);      //초기 이름 설정
            $('#cartPut .dc_price').text(product_price[i]);  // 초기 가격설정
            $('#cartPut .num').text(product_price[i]);  // 초기 가격설정

            $('.count_num').text(i);
    
            noBody.addClass('noBody_on');
            
            btn_val = product_id[i];
            $('#cartPut .btn_type1 .txt_type').val(btn_val);
            console.log(btn_val);
        
        
            var number = $('.inp').val();   //수량
            var cost = product_cost[i];   // 상품의 가격을 설정해줘야됨.
            $('.emph').text((number*cost)/20 + '원 적립');
        
        
            $('.down').click(function(){
                if(number > 0){
                    number--;
                    $(".inp").val(number);
                    $(".count_num").text(number);
                    if(number == 0){               // 0원이면 0출력
                        $(".num").text(0);
                    }

                    else if(number*cost < 1000){
                        $(".num").text(number*cost);
                    }


                    else if((number*cost % 1000) == 0){
                        
                        $(".num").text(Math.floor(number*cost/1000) + ',' + '000');
                    }
                    else{
                    
                    $(".num").text(Math.floor(number*cost/1000) + ',' + number*cost%1000);
                    }
                }
        
                if(number < 0){             //0 이하면 false 반환
                    return false;
                }
        
        
                $('.emph').text((number*cost)/20 + '원 적립');
                
            
                
                
            });
        
        
        
            $('.up').click(function(){
                number++;
                $(".inp").val(number);
                $(".count_num").text(number);
                if((number*cost % 1000) == 0){
                    $(".num").text(Math.floor(number*cost/1000) + ',' + '000');
                }

                else if(number*cost < 1000){
                    $(".num").text(number*cost);
                }
        
                else{
                    $(".num").text(Math.floor(number*cost/1000) + ',' + number*cost%1000);
                    
        
                }
        
        
        
                
                $('.emph').text((number*cost)/20 + '원 적립');
                
        
                
            });
        
            $('.btn_type2').click(function(){
                $('#cartPut').hide();
                $('.bg_loading').hide();
        
                noBody.removeClass('noBody_on');
                ///// 닫기 눌렀으면 원래값으로 초기화 시켜줘야됨 ////
                number = 1;
                $('.inp').val(1); 
                $(".num").text(Math.floor(number*cost/1000) + ',' + number*cost%1000);
                $('.emph').text((number*cost)/20 + '원 적립');
        
                
            });
        
        }
        
        

        $('button[name=chk]').click(function(){            
            var _index =$('button[name=chk]').index(this);
            cart_button(_index+1);
        });



   

   





});