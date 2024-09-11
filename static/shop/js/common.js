window.addEventListener('DOMContentLoaded',function(){

    const top_event_close= document.querySelector('.top_event_close');


    
    top_event_close.addEventListener('click', close);

    
    function close(){
       
        $("#top_event").css('display', 'none');
    }

    //////////////////////////////////////////////////////////////////
    //스르륵 없어지는 효과 /////////////////////////////////////////////
    // $(document).ready(function(){
    //     var imgs;
    //     var img_count;
        


    //     imgs = $("#top_event");
    //     img_count = imgs.children().length;



        

    //     $('.top_event_close').click(function () {
    //         next();
    //         
    //     });


    //     function next(){
    //             imgs.animate({
    //                 top:'-=50px'
    //             });
                

    //     }
        
        
    // });
    
    //////////////////////////////////////////////////////////////////////




});