layui.use('laydate', function(){
    var laydate = layui.laydate;
    console.log($("#adminBirthday"))
    laydate.render({
        elem: "#adminBirthday"
    });
});

function calBirthday(){
    // 获得今天的时间
    var datetime = new Date();
    var birthday = $("#adminBirthday").val();
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
    if ($("#adminEmail").val() === "") {
        return true;
    }
    if (!$("#adminEmail").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        return false;
    }
    return true;
}

//jquery验证手机号码
function checkSubmitMobil() {
    if ($("#adminTelephone").val() === "") {
        return true;
    }
    if (!$("#adminTelephone").val().match(/^1(3|4|5|7|8)\d{9}$/)) {
        return false;
    }
    return true;
}

function checkName(){
    if ($("#adminName").val() === "") {
        return true;
    }
    if (!$("#adminName").val().match(/^[a-z0-9_-]{3,15}$/)) {
        return false;
    }
    return true;
}

function getRegister() {
    loadingText("btn_login", "注册中...");
    var tempAge = calBirthday();
    var registertime = nowDate();
    if (checkName() === false) {
        loadingBack("btn_login", "注册");
        showMsg("用户名长度3-15，只能由字母数字下划线组成", "error", 3000);
    }else if ($("#adminPassword1").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("密码不能为空", "error", 3000);
    } else if ($("#adminPassword2").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("验证密码不能为空", "error", 3000);
    }else if($("#adminPassword1").val()!==$("#adminPassword2").val()){
        loadingBack("btn_login", "注册");
        showMsg("两次输入密码不一致", "error", 3000);
    }else if ($("#adminEmail").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("邮箱不能为空", "error", 3000);
    }else if (checkSubmitEmail()===false) {
        loadingBack("btn_login", "注册");
        showMsg("邮箱格式不正确", "error", 3000);
    }else if (checkSubmitMobil()===false) {
        loadingBack("btn_login", "注册");
        showMsg("手机格式不正确", "error", 3000);
    }else if ($("#adminBirthday").val() === "") {
        loadingBack("btn_login", "注册");
        showMsg("生日不能为空", "error", 3000);
    }else if (tempAge<5) {
        loadingBack("btn_login", "注册");
        showMsg("年龄必须高于5岁", "error", 3000);
    }else {
        var json = {
            adminName: $("#adminName").val(),
            password: $("#adminPassword1").val(),
            telephone: $("#adminTelephone").val(),
            email: $("#adminEmail").val(),
            age: tempAge,
            birthday: $("#adminBirthday").val(),
            registerTime: registertime,
            avatar: 'test.jpg'
        };
        $.ajax({
            type: "post",
            url: "/adminRegister",
            dataType: "json",
            async: false,
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (result) {
                if (result['code'] === '1') {
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
                            window.location.href = "/toAdminLogin";
                        }
                    });
                } else {
                    loadingBack("btn_login", "注册");
                    showMsg(result['msg'], "error", 3000);
                }
            }, error: function () {
                loadingBack("btn_login", "注册");
                showMsg("账号已存在！", "error", 3000);
            }
        });
    }
}