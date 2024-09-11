$(document).ready(function () {


    $('.btn_type1').click(function () {
        if ($('#certKey').val() == $('#authKey').val()) {
            alert('인증되었습니다.');
            document.certForm.submit();
        }
        else {
            alert('인증번호가 일치하지 않습니다.');
            $('#certKey').val('');
            document.certForm.certKey.focus();
            return;
        }
    });

    $('.emph').click(function () {
        location.reload();
        alert('인증번호가 재전송되었습니다.');
    })


    document.onkeydown = doNotReload;
});

$(document).keydown(function (e) {
    // F5, ctrl + F5, ctrl + r 새로고침 막기 - problem:안먹힘.
    var allowPageList = new Array('/a.php', '/b.php'); 
    var bBlockF5Key = true; for (number in allowPageList) { 
    var regExp = new RegExp('^' + allowPageList[number] + '.*', 'i'); 
    if (regExp.test(document.location.pathname)) { 
        bBlockF5Key = false; break; } } if (bBlockF5Key) { 
            if (e.which === 116) { if (typeof event == "object") { 
                event.keyCode = 0; } return false; 
            } 
            else if (e.which === 82 && e.ctrlKey) { 
                return false; 
            } 
        }
});


