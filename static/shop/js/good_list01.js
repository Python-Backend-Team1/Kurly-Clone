window.addEventListener('DOMContentLoaded',function(){ 





    $(document).ready(function() {

        var noBody = $('.noBody');


        var product_name = [];        //이름 변수 리스트
        var product_price = [];       //썸네일 가격 변수 리스트
        var product_cost = [];        //상품 수량변경할떄 쓰는 가격 변수 리스트


        for(i=0; i < 13; i++){
            product_name[i] = $('li:nth-child('+ i +') .name').text();    //포문으로 리스트 에다가 값을 대입함
            
            product_price[i] = $('li:nth-child('+ i +') .price').text();
            
            product_cost[i] = $(' li:nth-child('+ i +') input').val();
            
        }

        

        
        

        
        function cart_button(i){                                // 장바구니 버튼 클릭했을떄 수량,적립금 설정함수
            // $('#cartPut').css('display','block');
            $('#cartPut').fadeIn(300);                 // 서서히 보이게 설정 완료
            $('.bg_loading').css('display','block');    //주변 흐릿해지게 해는거 온!
            $('#cartPut .name').text(product_name[i]);      //초기 이름 설정
            $('#cartPut .dc_price').text(product_price[i]);  // 초기 가격설정
            $('#cartPut .num').text(product_price[i]);  // 초기 가격설정
        
            noBody.addClass('noBody_on');
        
        
        
            var number = $('.inp').val();   //수량
            var cost = product_cost[i];   // 상품의 가격을 설정해줘야됨.
            $('.emph').text((number*cost)/20 + '원 적립');
        
        
            $('.down').click(function(){
                if(number > 0){
                    number--;
                    $(".inp").val(number);
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
                $('#cartPut').css('display','none');
                $('.bg_loading').css('display','none');
        
                noBody.removeClass('noBody_on');
                ///// 닫기 눌렀으면 원래값으로 초기화 시켜줘야됨 ////
                number = 1;
                $('.inp').val(1); 
                $(".num").text(Math.floor(number*cost/1000) + ',' + number*cost%1000);
                $('.emph').text((number*cost)/20 + '원 적립');
        
                
            });
        
        }
        
        // eq(x) x번째 리스트를 클릭하면 cart_button(y) y번째 버튼을 실행함
        
        $('button[name=chk]:eq(0)').click(function(){              //굉장히 줄이고싶다... 어떻게 줄이지 ... 하..
            cart_button(1);
        });
        $('button[name=chk]:eq(1)').click(function(){
            cart_button(2);
        });
        $('button[name=chk]:eq(2)').click(function(){
            cart_button(3);
        });
        $('button[name=chk]:eq(3)').click(function(){
            cart_button(4);
        });
        $('button[name=chk]:eq(4)').click(function(){
            cart_button(5);
        });
        $('button[name=chk]:eq(5)').click(function(){
            cart_button(6);
        });
        $('button[name=chk]:eq(6)').click(function(){
            cart_button(7);
        });
        $('button[name=chk]:eq(7)').click(function(){
            cart_button(8);
        });
        $('button[name=chk]:eq(8)').click(function(){
            cart_button(9);
        });
        $('button[name=chk]:eq(9)').click(function(){
            cart_button(10);
        });
        $('button[name=chk]:eq(10)').click(function(){
            cart_button(11);
        });
        $('button[name=chk]:eq(11)').click(function(){
            cart_button(12);
        });






        



        

        

        

        $('.name_select').click(function(){
            $(".checked").toggle(function(){
                $('.name_select').css('color', '#5f0080');
            });
        });

        $('.btn_type1 .txt_type').click(function(){




            product_name = $('#cartPut .list_goods .name');
            console.log(product_name.text());

            $.ajax({
              type: "GET",
              url: "./product_check?product_name="+product_name,    //해당 url로 데이터를 넘김
              data: {
                'product_name': $('#cartPut .list_goods .name').text()
              },
              datatype: 'json',
              success: function (data) {
                console.log(data['overlap']);
                if (data['overlap'] == "fail") {
                  console.log('성공');
                  return;
                } else {
                  console.log('성공');
                  return;
                }
              }
            });
        });



        







    });





});
