layui.use('laydate', function(){
    var laydate = layui.laydate;
    console.log($("#birthday"))
    laydate.render({
        elem: "#birthday"
    });
});

function calBirthday(){
    // 获得今天的时间
    var datetime = new Date();
    var birthday = $("#birthday").val();
    var startDate = new Date(birthday);
    var newDate = datetime.getTime() - startDate.getTime();
    var tempAge = Math.ceil(newDate / 1000 / 60 / 60 / 24 /365);
    if (isNaN(tempAge)){
        tempAge = "";
    }
    return tempAge
}

function nowDate(){
    var datetime = new Date();
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return  year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

function checkSubmitEmail() {
    if ($("#email").val() === "") {
        return true;
    }
    if (!$("#email").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        return false;
    }
    return true;
}

//jquery验证手机号码
function checkSubmitMobil() {
    if ($("#telephone").val() === "") {
        return true;
    }
    if (!$("#telephone").val().match(/^1(3|4|5|7|8)\d{9}$/)) {
        return false;
    }
    return true;
}

function checkNickName(){
    if ($("#nickName").val() === "") {
        return true;
    }
    if (!$("#nickName").val().match(/^[a-z0-9_-]{3,15}$/)) {
        return false;
    }
    return true;
}

function getRegister() {
    loadingText("btn_login", "注册中...");
    var tempAge = calBirthday();
    var registertime = nowDate();
    if ($("#userName").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("账号不能为空", "error", 3000);
    }else if (checkNickName() === false) {
        loadingBack("btn_login", "注册");
        showMsg("昵称长度3-15，只能由字母数字下划线组成", "error", 3000);
    }else if ($("#userPwd1").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("密码不能为空", "error", 3000);
    } else if ($("#userPwd2").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("验证密码不能为空", "error", 3000);
    }else if($("#userPwd1").val()!==$("#userPwd2").val()){
        loadingBack("btn_login", "注册");
        showMsg("两次输入密码不一致", "error", 3000);
    }else if ($("#email").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("邮箱不能为空", "error", 3000);
    }else if (checkSubmitEmail()===false) {
        loadingBack("btn_login", "注册");
        showMsg("邮箱格式不正确", "error", 3000);
    }else if (checkSubmitMobil()===false) {
        loadingBack("btn_login", "注册");
        showMsg("手机格式不正确", "error", 3000);
    }else if ($("#birthday").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("生日不能为空", "error", 3000);
    }else if (tempAge<5) {
        loadingBack("btn_login", "注册");
        showMsg("年龄必须高于5岁", "error", 3000);
    }else {
        var nickname;
        if ($("#nickName").val() === "") {
            nickname=$("#userName").val();
        }else {
            nickname=$("#nickName").val();
        }
        var json = {
            userName: $("#userName").val(),
            password: $("#userPwd1").val(),
            nickName: nickname,
            telephone: $("#telephone").val(),
            email: $("#email").val(),
            age: tempAge,
            birthday: $("#birthday").val(),
            registerTime: registertime,
            avatar: 'test.jpg'
        };
        $.ajax({
            type: "post",
            url: "/register",
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
                    loadingBack("btn_login", "注册");
                    showMsg(result.map.msg, "error", 3000);
                }
            }, error: function () {
                loadingBack("btn_login", "注册");
                showMsg("注册失败", "error", 3000);
            }
        });
    }
}