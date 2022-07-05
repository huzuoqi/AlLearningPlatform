//回车登录事件
function keyup(event){
    if (event.keyCode === 13) {
        getLogin();
    }
}

function getLogin() {
    var json = {
        adminName: $("#adminName").val(),
        adminPassword: $("#adminPassword").val()
    };
    loadingText("btn_login", "登录中...");
    if ($("#adminName").val() === "") {
        loadingBack("btn_login", "登录");
        showMsg("账号不能为空", "error", 3000);
    } else if ($("#adminPassword").val() === "") {
        loadingBack("btn_login", "登录");
        showMsg("密码不能为空", "error", 3000);
    } else {
        $.ajax({
            type: "post",
            url: "/adminLogin",
            dataType: "json",
            async: false,
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (result) {
                if (result['code']==='1') {
                    $.toast({
                        text: result['msg'],
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
                            window.location.href = "/adminArticle";
                        }
                    });
                } else {
                    loadingBack("btn_login", "登录");
                    showMsg(result['msg'], "error", 3000);
                }
            }, error: function () {
                loadingBack("btn_login", "登录");
                showMsg("账号名或密码错误!", "error", 3000);
            }
        });
    }
}

function register(){
    window.location.href = "/toAdminRegister";
}

function forget(){
    window.location.href = "/toAdminForget";
}

function toLogin(){
    window.location.href = "/toLogin";
}