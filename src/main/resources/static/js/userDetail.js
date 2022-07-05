$(function (){
    $("#globeSearch").hide();
    loadUserInfo();
})

var userId;

function loadUserInfo(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getUserSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            $("#userAvatarShow").attr('src',"/img/avatar/"+result.avatar);
            $("#userName").text(result.userName);
            $("#userNickName").text(result.nickName);
            $("#userEmail").text(result.email);
            $("#userTelephone").text(result.telephone);
            $("#userRegisterTime").text(result.registerTime);
            $("#userBirthday").text(result.birthday);
            $("#userAge").text(result.age);
            $("#popAvatarImg").attr('src',"/img/avatar/"+result.avatar);
            userId = result.id;
        }
    })
}

$("#changeUserInfo").click(function (){
    window.location.href ="/updateUser"
})

$("#changeAvatar").click(function (){
    $('#popAvatar')
        .modal('show')
    ;
})

$("#deleteUser").click(function (){
    $('#popDeleteUser')
        .modal('show')
    ;
})

$("#confirmDeleteUser").click(function (){
    if ($("#confirmPassword").val()===""){
        showMsg("请输入密码！", "warning", 3000);
    }else {
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/confirmPassword", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"password": $("#confirmPassword").val()}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result === true) {
                    deleteUser();
                } else {
                    showMsg("密码错误，请重新输入！", "error", 3000);
                }
            }
        })
    }
})

function deleteUser(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/deleteUser", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":userId}),
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