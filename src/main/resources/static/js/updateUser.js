layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
        elem: "#userBirthday"
    });
    $("#userAge").val(calBirthday());
});

$(function (){
    $("#globeSearch").hide();
    loadUserInfo();
})

function loadUserInfo(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getUserSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            $("#userName").val(result.userName);
            $("#userNickName").val(result.nickName);
            $("#userEmail").val(result.email);
            $("#userTelephone").val(result.telephone);
            $("#userRegisterTime").val(result.registerTime);
            $("#userBirthday").val(result.birthday);
            $("#userAge").val(result.age);
        }
    })
}

function calBirthday(){
    // 获得今天的时间
    var datetime = new Date();
    var birthday = $("#userBirthday").val();
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
    if ($("#userEmail").val() === "") {
        return true;
    }
    if (!$("#userEmail").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        return false;
    }
    return true;
}

//jquery验证手机号码
function checkSubmitMobil() {
    if ($("#userTelephone").val() === "") {
        return true;
    }
    if (!$("#userTelephone").val().match(/^1(3|4|5|7|8)\d{9}$/)) {
        return false;
    }
    return true;
}

function checkNickName(){
    if ($("#userNickName").val() === "") {
        return true;
    }
    if (!$("#userNickName").val().match(/^[a-z0-9_-]{3,15}$/)) {
        return false;
    }
    return true;
}

function updateInfo() {
    loadingText("btn_update", "修改中...");
    if (checkNickName() === false) {
        loadingBack("btn_update", "修改信息");
        showMsg("昵称长度3-15，只能由字母数字下划线组成", "error", 3000);
    }else if ($("#userEmail").val() === "") {
        loadingBack("btn_update", "修改信息");
        showMsg("邮箱不能为空", "error", 3000);
    }else if (checkSubmitEmail()===false) {
        loadingBack("btn_update", "修改信息");
        showMsg("邮箱格式不正确", "error", 3000);
    }else if (checkSubmitMobil()===false) {
        loadingBack("btn_update", "修改信息");
        showMsg("手机格式不正确", "error", 3000);
    }else if ($("#userBirthday").val() === "") {
        loadingBack("btn_update", "修改信息");
        showMsg("生日不能为空", "error", 3000);
    }else if ($("#userAge").val()<5) {
        loadingBack("btn_update", "修改信息");
        showMsg("年龄必须高于5岁", "error", 3000);
    }else {
        var nickname;
        if ($("#userNickName").val() === "") {
            nickname=$("#userName").val();
        }else {
            nickname=$("#userNickName").val();
        }
        var json = {
            userName: $("#userName").val(),
            nickName: nickname,
            telephone: $("#userTelephone").val(),
            email: $("#userEmail").val(),
            age: $("#userAge").val(),
            birthday: $("#userBirthday").val(),
        };
        $.ajax({
            type: "post",
            url: "/updateUserInfo",
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
                            window.location.href = "/userDetail";
                        }
                    });
                } else {
                    loadingBack("btn_update", "修改信息");
                    showMsg(result.map.msg, "error", 3000);
                }
            }, error: function () {
                loadingBack("btn_update", "修改信息");
                showMsg("修改失败", "error", 3000);
            }
        });
    }
}