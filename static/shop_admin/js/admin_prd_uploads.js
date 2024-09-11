$(document).ready(function() {


    $('.re_upload').click(function(){    //메인 이미지 수정 클릭시 이미지 업로드 버튼으로 연결
        $('#image_input').trigger("click");
        $('#image_container').empty();
    });


    $('.remove').click(function(){
        $('#image_container').empty();
    });



    $('.sub_re_upload').click(function(){
        $('#sub_image_input').trigger("click");
        $('#sub_image_container').empty();
    });


    $('.sub_remove').click(function(){
        $('#sub_image_container').empty();
    });















});