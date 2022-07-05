layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
        elem: "#adminBirthday"
    });
    $("#adminAge").val(calBirthday());
});

$(function (){
    loadAdminInfo();
})

function loadAdminInfo(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getAdminSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            $("#adminName").val(result.adminName);
            $("#adminEmail").val(result.email);
            $("#adminTelephone").val(result.telephone);
            $("#adminRegisterTime").val(result.registerTime);
            $("#adminBirthday").val(result.birthday);
            $("#adminAge").val(result.age);
        }
    })
}

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

function updateInfo() {
    loadingText("btn_update", "修改中...");
    if (checkName() === false) {
        loadingBack("btn_update", "修改信息");
        showMsg("用户名长度3-15，只能由字母数字下划线组成", "error", 3000);
    }else if ($("#adminEmail").val() === "") {
        loadingBack("btn_update", "修改信息");
        showMsg("邮箱不能为空", "error", 3000);
    }else if (checkSubmitEmail()===false) {
        loadingBack("btn_update", "修改信息");
        showMsg("邮箱格式不正确", "error", 3000);
    }else if (checkSubmitMobil()===false) {
        loadingBack("btn_update", "修改信息");
        showMsg("手机格式不正确", "error", 3000);
    }else if ($("#adminBirthday").val() === "") {
        loadingBack("btn_update", "修改信息");
        showMsg("生日不能为空", "error", 3000);
    }else if ($("#adminAge").val()<5) {
        loadingBack("btn_update", "修改信息");
        showMsg("年龄必须高于5岁", "error", 3000);
    }else {
        var json = {
            adminName: $("#adminName").val(),
            telephone: $("#adminTelephone").val(),
            email: $("#adminEmail").val(),
            age: $("#adminAge").val(),
            birthday: $("#adminBirthday").val(),
        };
        $.ajax({
            type: "post",
            url: "/updateAdminInfo",
            dataType: "json",
            async: false,
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (result) {
                if (result['code'] === "1") {
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
                            window.location.href = "/adminDetail";
                        }
                    });
                } else {
                    loadingBack("btn_update", "修改信息");
                    showMsg(result['msg'], "error", 3000);
                }
            }, error: function () {
                loadingBack("btn_update", "修改信息");
                showMsg("用户名重复！", "error", 3000);
            }
        });
    }
}