window.addEventListener('DOMContentLoaded', function () {

    const juso = document.querySelector('#juso');
    const user_address = document.querySelector('#addrMain');
    const user_detail_address = document.querySelector('#addrSub');
    const juso_search = document.querySelector('.feild');

    juso.addEventListener('click', addr_search);
    // 검색 클릭 하면 함수 실행

    function addr_search() { //주소 검색 카카오 api 
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 지번 주소를 선택했을 경우
                    addr = data.jibunAddress;
                }

                // 도로명 타입일 때 참고항목을 조합
                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                } else {
                    document.getElementById("sample6_extraAddress").value = '';
                }

                // 주소 정보 필드에 넣기
                document.getElementById("addrMain").value = addr;
                document.getElementById("addrSub").focus(); // 상세주소로 포커스 이동
            }
        }).open();
    }
});

$(function () {
    $('.plus').click(function () { // count up
        var n = $('.plus').index(this);
        var num = $(".num:eq(" + n + ")").val();
        num = $(".num:eq(" + n + ")").val(num * 1 + 1);

        var cartItemId = $(".num:eq(" + n + ")").data('cart-item-id');
        updateCartItem(cartItemId, num); // AJAX로 수량 변경 요청
    });

    $('.minus').click(function () { // count down
        var n = $('.minus').index(this);
        var num = $(".num:eq(" + n + ")").val();
        if (num != 1) {
            num = $(".num:eq(" + n + ")").val(num * 1 - 1);

            var cartItemId = $(".num:eq(" + n + ")").data('cart-item-id');
            updateCartItem(cartItemId, num); // AJAX로 수량 변경 요청
        }
    });
});

function updateCartItem(cartItemId, quantity) {
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(`/cart/update_ajax/${cartItemId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,
        },
        body: `quantity=${quantity}`
    })
        .then(response => response.json())
        .then(data => {
            // 페이지에서 금액 업데이트
            document.querySelector('.total_price').textContent = data.total_price.toLocaleString() + '원';
            document.querySelector('.shipping_fee').textContent = data.shipping_fee.toLocaleString() + '원';
            document.querySelector('.final_price').textContent = data.final_price.toLocaleString() + '원';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function check_sel_all(checkbox) { /* 개별 선택에 따른 전체선택 상태 변경 */
    const selectall = document.querySelectorAll('input[name="checkAll"]');
    const checkboxes = document.querySelectorAll('input[name="checkOne"]');
    var temp = false;
    var temp2 = true;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            temp = true;
        }
        if (!checkbox.checked) {
            temp2 = false;
        }
        if (selectall[0].checked && !checkbox.checked) {
            selectall[0].checked = false;
            selectall[1].checked = false;
        }
    });

    if (temp === false) {
        selectall[0].checked = false;
        selectall[1].checked = false;
    } else if (temp2 === true) {
        selectall[0].checked = true;
        selectall[1].checked = true;
    }
}

function sel_all(selectAll) { /* 전체 선택 버튼 활성화 */
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    });
}

function del_row(ths) {
    var ths = $(ths);
    ths.parents("li").remove(); // 해당 항목 삭제
}

function dropup() { /* 접기 / 펼치기 */
    if (document.getElementById('dropup_list').style.display === 'block') {
        document.getElementById('dropup_list').style.display = 'none';
        $(".btn_dropup").addClass('off');
        return;
    } else {
        document.getElementById('dropup_list').style.display = 'block';
        $(".btn_dropup").removeClass('off');
    }
}

$(document).ready(function () { /* 체크박스 선택 후 삭제하기 */
    $('.btn_delete').click(function () {
        $("input:checkbox[name=checkOne]").each(function () {
            if (this.checked) {
                var ths = $(this);
                ths.parents("li").remove();
            }
        });
    });
});
