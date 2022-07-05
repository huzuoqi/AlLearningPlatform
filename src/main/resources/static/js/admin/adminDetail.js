$(function (){
    $("#globeSearch").hide();
    loadAdminInfo();
})

var adminId;

function loadAdminInfo(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getAdminSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            $("#adminAvatarShow").attr('src',"/img/avatar/"+result.avatar);
            $("#adminName").text(result.adminName);
            $("#adminEmail").text(result.email);
            $("#adminTelephone").text(result.telephone);
            $("#adminRegisterTime").text(result.registerTime);
            $("#adminBirthday").text(result.birthday);
            $("#adminAge").text(result.age);
            $("#popAvatarImg").attr('src',"/img/avatar/"+result.avatar);
            adminId = result.id;
        }
    })
}

$("#changeAdminInfo").click(function (){
    window.location.href ="/updateAdmin"
})

$("#changeAvatar").click(function (){
    $('#popAvatar')
        .modal('show')
    ;
})

$("#deleteAdmin").click(function (){
    $('#popDeleteAdmin')
        .modal('show')
    ;
})

$("#confirmDeleteAdmin").click(function (){
    if ($("#confirmPassword").val()===""){
        showMsg("请输入密码！", "warning", 3000);
    }else {
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/confirmAdminPassword", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"password": $("#confirmPassword").val()}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result === true) {
                    deleteAdmin();
                } else {
                    showMsg("密码错误，请重新输入！", "error", 3000);
                }
            }
        })
    }
})

function deleteAdmin(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/deleteAdmin", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":adminId}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType: "application/json",
        success: function (result) {
            if (result === true) {
                showMsg("删除账号成功", "success", 3000);
                setTimeout( function (){window.location.href = "/logout"}, 3000);
            } else {
                showMsg("删除账号有误，请重试！", "error", 3000);
            }
        }
    })
}