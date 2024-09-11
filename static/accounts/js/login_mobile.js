// 아이디 기억 하기 기능 구현(쿠키 저장)
window.onload = function() {
    if (getCookie('id')) { // getCookie함수로 id라는 이름의 쿠키를 불러와서 있을경우
        document.login_form.m_id.value = getCookie('id'); //input 이름이 id인곳에 getCookie("id")값을 넣어줌
        document.login_form.save_id.checked = true; // 체크는 체크됨으로
    }
}

// setCookie 헤더의 구성
// 쿠키이름 = 쿠키 값; Domain = 도메인 값; Path = 경로값; Expires = GMT 형식의 만료 일시

function setCookie(name, value, expiredays) //쿠키 저장함수
    {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires="
            + todayDate.toGMTString() + ";"
}

function getCookie(Name) { // 쿠키 불러오는 함수
    let search = Name + "=";
    if (document.cookie.length > 0) { // if there are any cookies
        offset = document.cookie.indexOf(search);
        if (offset != -1) { // if cookie exists
            offset += search.length; // set index of beginning of value
            end = document.cookie.indexOf(";", offset); // set index of end of cookie value
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
}



// 아이디, 비밀번호 유효성 검사
let id = "test"
let pw = "test"

// getId = '${m_id}';
// getPw = '${password}';

function check_input(){
    if (!document.login_form.m_id.value){
        alert("아이디를 입력하세요");
        document.login_form.m_id.focus();
        return;
    }
    if (!document.login_form.password.value){
        alert("비밀번호를 입력하세요");
        document.login_form.password.focus();
        return;
    }
    if (document.login_form.m_id.value != id || document.login_form.password.value != pw){
        alert("아이디 또는 비밀번호가 틀렸습니다.");
        history.go(0);
        return;
    }

    if (document.login_form.save_id.checked === true) { // 아이디 저장을 체크 했을 때
        setCookie('id', document.login_form.m_id.value, 7); // 쿠키이름을 id로, 아이디 입력 필드 값을 7일 동안 저장
    } else { // 아이디 저장을 체크하지 않았을 때
        setCookie('id', login_form.m_id.value, 0); // 날짜를 0으로 저장하여 쿠키 삭제
    }

    document.login_form.submit(); // 유효성 검사가 통과되면 서버로 전송
}