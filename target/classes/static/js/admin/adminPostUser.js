var pageNum=1,pageSize=20;
var postUserId;

$(function (){
    loadAdminPostUser();
})

function prePage(){
    pageNum-=1;
    loadAdminPostUser();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadAdminPostUser();
    $(document).scrollTop(0);
}


function loadAdminPostUser(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryPostUser", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"name":$("#searchPostUserText").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            pageNum = result.pageNum;
            var con = '';
            $.each(result.list, function(index, item){
                con += `<tr>
                    <td>${index+1}</td>
                    <td>${item.adminName}</td>
                    <td>${item.telephone}</td>
                    <td>${item.email}</td>
                    <td>${item.birthday}</td>
                    <td>${item.registerTime}</td>
                    <td>
                        <a href="javascript:void(0);" onclick="deletePostUserButton(${item.id})" class="ui mini red basic button">删除</a>
                    </td>
                </tr>`;
            });
            $("#postUserBody").html(con);
        }
    })
}

function searchPostUser(){
    pageNum = 1;
    loadAdminPostUser();
}

function deletePostUserButton(id){
    $('#popDeletePostUser')
        .modal('show');
    postUserId = id;
}

function deletePostUser(){
    if(confirmPassword($("#confirmPassword").val())===true){
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/deleteAdminPostUser", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"id":postUserId}),//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result === true) {
                    showMsg("封禁成功！", "success", 3000);
                    loadAdminPostUser();
                } else {
                    showMsg("封禁失败！", "error", 3000);
                }
            }
        })
        $('#popDeletePostUser')
            .modal('hide');
    }else{
        showMsg("密码错误！", "error", 3000);
    }
}

function confirmPassword(password){
    var confirm;
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getAdminSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            confirm = result.password === password;
        }
    })
    return confirm;
}