//回车登录事件
function keyup(event){
    if (event.keyCode === 13) {
        getLogin();
    }
}

function getLogin() {
    var json = {
        userName: $("#userName").val(),
        password: $("#userPwd").val()
    };
    loadingText("btn_login", "登录中...");
    if ($("#userName").val() === "") {
        loadingBack("btn_login", "登录");
        showMsg("账号不能为空", "error", 3000);
    } else if ($("#userPwd").val() === "") {
        loadingBack("btn_login", "登录");
        showMsg("密码不能为空", "error", 3000);
    } else {
        $.ajax({
            type: "post",
            url: "/login",
            dataType: "json",
            async: false,
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (result) {
                if (result.code === 1) {
                    $.toast({
                        text: result.map.msg,
                        heading: '提示',
                        icon: 'success',
                        showHideTransition: 'fade',
                        allowToastClose: true,
                        hideAfter: 1000,
                        stack: 1,
                        position: 'top-center',
                        textAlign: 'left',
                        loader: true,
                        loaderBg: '#ffffff',
                        afterHidden: function () {
                            window.location.href = "/index";
                        }
                    });
                } else {
                    loadingBack("btn_login", "登录");
                    showMsg(result.map.msg, "error", 3000);
                }
            }, error: function () {
                loadingBack("btn_login", "登录");
                showMsg("登录失败", "error", 3000);
            }
        });
    }
}

function register(){
    window.location.href = "/toRegister";
}

function forget(){
    window.location.href = "/toForget";
}

function toAdminLogin(){
    window.location.href = "/toAdminLogin"
}