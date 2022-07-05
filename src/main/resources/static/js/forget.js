function checkSubmitEmail() {
    if (!$("#email").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        return false;
    }
    return true;
}

function sendMail(){
    loadingBack("send", "发送中...");
    if ($("#userName").val() === "") {
        loadingBack("send", "发送");
        showMsg("账号不能为空", "error", 3000);
    }else if(checkSubmitEmail()!==true){
        loadingBack("send", "发送");
        showMsg("邮箱格式不正确", "error", 3000);
    }else{
        var json = {
            userName: $("#userName").val(),
            email: $("#email").val(),
        }
        $.ajax({
            type: "post",
            url: "/mail",
            async: false,
            dataType: "json",
            data:JSON.stringify(json) ,
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
                    });
                    loadingBack("send", "发送成功");
                } else {
                    loadingBack("send", "发送");
                    showMsg(result.map.msg, "error", 3000);
                }
            }, error: function () {
                loadingBack("send", "发送");
                showMsg("发送失败", "error", 3000);
            }
        });
    }
}

function findPassword(){
    loadingBack("forget", "发送中...");
    if ($("#userName").val() === "") {
        loadingBack("forget", "修改密码");
        showMsg("账号不能为空", "error", 3000);
    }else if(checkSubmitEmail()!==true){
        loadingBack("forget", "修改密码");
        showMsg("邮箱格式不正确", "error", 3000);
    }else if ($("#confirm").val() === "") {
        loadingBack("forget", "修改密码");
        showMsg("验证码不能为空", "error", 3000);
    }else if ($("#userPwd1").val() === "") {
        loadingBack("forget", "修改密码");
        showMsg("密码不能为空", "error", 3000);
    } else if ($("#userPwd2").val() === "") {
        loadingBack("forget", "修改密码");
        showMsg("验证密码不能为空", "error", 3000);
    }else if($("#userPwd1").val()!==$("#userPwd2").val()){
        loadingBack("forget", "修改密码");
        showMsg("两次输入密码不一致", "error", 3000);
    }else {
        var json = {
            userName: $("#userName").val(),
            email: $("#email").val(),
            password: $("#userPwd1").val(),
            confirm: $("#confirm").val(),
        }
        $.ajax({
            type: "post",
            url: "/forget",
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
                            window.location.href = "/toLogin";
                        }
                    });
                } else {
                    loadingBack("forget", "修改密码");
                    showMsg(result.map.msg, "error", 3000);
                }
            }, error: function () {
                loadingBack("forget", "修改密码");
                showMsg("修改失败", "error", 3000);
            }
        });
    }
}