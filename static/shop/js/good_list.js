window.addEventListener('DOMContentLoaded',function(){ 





    $(document).ready(function() {

        var noBody = $('.noBody');


        var product_name = [];        //이름 변수 리스트
        var product_price = [];       //썸네일 가격 변수 리스트
        var product_cost = [];        //상품 수량변경할떄 쓰는 가격 변수 리스트
        var product_id = [];          //상품 아이디값 가져오기

        for(i=0; i < $('.list_goods .inner_listgoods ul li').length+1; i++){
            product_name[i] = $('li:nth-child('+ i +') .name').text();    //포문으로 리스트 에다가 값을 대입함

            product_price[i] = $('li:nth-child('+ i +') .price').text();

            product_cost[i] = $(' li:nth-child('+ i +') input').val();

            product_id[i] = $('li:nth-child('+ i +') .btn_cart').val();
        }







        function cart_button(i){                                // 장바구니 버튼 클릭했을떄 수량,적립금 설정함수
            // $('#cartPut').css('display','block');
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
                    // if(number == 0){               // 0원이면 0출력
                    //     $(".num").text(0);
                    // }

                    // else if(number*cost < 1000){
                    //     $(".num").text(number*cost);
                    // }


                    // else if((number*cost % 1000) == 0){

                    //     $(".num").text(Math.floor(number*cost/1000) + ',' + '000');
                    // }
                    // else{

                    // $(".num").text(Math.floor(number*cost/1000) + ',' + number*cost%1000);
                    // }
                    $(".num").text(comma(number*cost));

                }

                if(number < 0){             //0 이하면 false 반환
                    return false;
                }


                // $('.emph').text((number*cost)/20 + '원 적립');
                $('.emph').text(comma((number*cost)/20) + '원 적립');



            });





            $('.up').click(function(){
                number++;
                $(".inp").val(number);
                $(".count_num").text(number);
                // if((number*cost % 1000) == 0){
                //     $(".num").text(Math.floor(number*cost/1000) + ',' + '000');
                // }

                // else if(number*cost < 1000){
                //     $(".num").text(number*cost);
                // }

                // else{
                //     $(".num").text(Math.floor(number*cost/1000) + ',' + number*cost%1000);


                // }
                $(".num").text(comma(number*cost));




                // $('.emph').text((number*cost)/20 + '원 적립');
                $('.emph').text(comma((number*cost)/20) + '원 적립');



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

        // eq(x) x번째 리스트를 클릭하면 cart_button(y) y번째 버튼을 실행함

        // $('button[name=chk]:eq(0)').click(function(){              //굉장히 줄이고싶다... 어떻게 줄이지 ... 하..
        //     cart_button(1);
        // });
        // $('button[name=chk]:eq(1)').click(function(){
        //     cart_button(2);
        // });
        // $('button[name=chk]:eq(2)').click(function(){
        //     cart_button(3);
        // });
        // $('button[name=chk]:eq(3)').click(function(){
        //     cart_button(4);
        // });
        // $('button[name=chk]:eq(4)').click(function(){
        //     cart_button(5);
        // });
        // $('button[name=chk]:eq(5)').click(function(){
        //     cart_button(6);
        // });
        // $('button[name=chk]:eq(6)').click(function(){
        //     cart_button(7);
        // });
        // $('button[name=chk]:eq(7)').click(function(){
        //     cart_button(8);
        // });
        // $('button[name=chk]:eq(8)').click(function(){
        //     cart_button(9);
        // });
        // $('button[name=chk]:eq(9)').click(function(){
        //     cart_button(10);
        // });
        // $('button[name=chk]:eq(10)').click(function(){
        //     cart_button(11);
        // });
        // $('button[name=chk]:eq(11)').click(function(){
        //     cart_button(12);
        // });

        $('button[name=chk]').click(function(){             // 위에꺼 줄인거 성공!
            var _index =$('button[name=chk]').index(this);
            cart_button(_index+1);
        });










        //카테고리 클릭시 활성화되면서 움직이는 bar

        $('li[name=cate_gory]').click(function(){                  // li태그에서 name이 cate_gory인걸 클릭했을 때
            var cate_index = $('li[name=cate_gory]').index(this);  // 변수 cate_index에다 , 현재 클릭한 name=category의 인덱스를 저장


            for(i=0;i<$('.inner_lnb ul li').length;i++){           // li의 갯수만큼 반복해서 on이라는 클래스를 가지고 있는 애를 찾아서 on 삭제
                if($('.inner_lnb ul li a').hasClass("on") === true){      // 여기서 on은 글자색 보라색으로 해주는 css클래스요소
                    $('.inner_lnb ul li a').removeClass('on');            // 기존에 있던 on은 비활성화 시키고 , 이번에 클릭한 요소에다가 on을 활성화 시키기 위함임
                }
            }
            $('.inner_lnb ul li:eq(' + cate_index + ') a').addClass('on');  // 위에서 기존에있던 on을 비활성화 시켰으니 , 방금 클릭한 얘 한테 on을 활성화 해줌

            var change_bg = $('.inner_lnb ul li:eq(' + cate_index + ') a').innerWidth();  //change_bg라는 변수에다가 방금 클릭한 a태그의 가로길이 값을 저장(막대 바 크기 조절을 위해)




            var pos = $('.inner_lnb ul li:eq(' + cate_index + ') a').position()  // 변수 pos에다가 현재 클릭한 a 태그의 위치값 저장

//            $('.bg_loading').css('display', 'block'); // 로딩창 display block 했다가
//            setTimeout(function() {
//                $('.bg_loading').css('display', 'none');  //0.5초 뒤에 다시 로딩창 display none 하기
//            }, 500);






//            $('.bg').stop().animate({    //bg막대 이동 animate실행
//                "left": pos.left + "px",  //left값은 위에서 구한 pos의 left값 만큼 이동
//                "bottom" : pos.bottom + "px" // bottom은 pos의 bottom값 만큼 이동
//            }, 150, function(){  // 150의 속도만큼
//                $('.bg').css('width', change_bg+'px');  // 막대길이는 위에서구한 change_bg만큼 변화
//            });


        });



        function comma(num){          //콤마찍는 함수
            var len, point, str;

            num = num + "";
            point = num.length % 3 ;
            len = num.length;

            str = num.substring(0, point);
            while (point < len) {
                if (str != "") str += ",";
                str += num.substring(point, point + 3);
                point += 3;
            }

            return str;

        }











       
        

        

       



       





        



        

        

        

        $('.name_select').click(function(){
            $(".checked").toggle(function(){
                $('.name_select').css('color', '#5f0080');
            });
        });




        // $('.btn_type1 .txt_type').click(function(){

            
            
           
        //     product_name = $('#cartPut .list_goods .name');
        //     console.log(product_name.text());

        //     $.ajax({
        //       type: "GET",
        //       url: "./id_check?id="+product_name,    //해당 url로 데이터를 넘김
        //       data: {
        //         'username': $('#cartPut .list_goods .name').text()
        //       },
        //       datatype: 'json',
        //       success: function (data) {
        //         console.log(data['overlap']);
        //         if (data['overlap'] == "fail") {
        //           console.log('성공');
        //           return;
        //         } else {
        //           console.log('성공');
        //           return;
        //         }
        //       }
        //     });
        // });









        







    });





});