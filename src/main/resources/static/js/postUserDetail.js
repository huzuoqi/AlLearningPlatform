var url=window.location.search;
//将返回的字符串以=分割
var postUserId = url.split("=")[1];

var userId;

var friendExistId;

$(function (){
    $("#globeSearchText").val("");
    loadPostUser();
    loadPostUserArticle();
    loadFriendNum();
    existFriend()
})

var pageNum=1,pageSize=15;

function prePage(){
    pageNum-=1;
    loadPostUserArticle();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadPostUserArticle();
    $(document).scrollTop(0);
}

function getSpecifyPage() {
    if ($("#inputPage").val() !== '') {
        var reg = /^[0-9]+.?[0-9]*$/;
        var pattern = new RegExp(reg);
        if (!pattern.test($("#inputPage").val()))
            $("#inputPage").placeholder("请输入数值类型");
        else {
            pageNum=$("#inputPage").val()
            pageNum = parseInt(pageNum);
            loadPostUserArticle();
            $(document).scrollTop(0);
        }
    }
}

function loadPostUser(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getOneAdmin", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":postUserId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#postUserName").text(result.adminName);
            $("#postUserAge").text(result.age);
            $("#postUserEmail").text(result.email);
            $("#postUserTelephone").text(result.telephone);
            $("#PostUserBirthday").text(result.birthday);
            $("#postUserRegisterTime").text(result.registerTime);
            $("#postUserAvatar").attr("src","/img/avatar/"+result.avatar);
        }
    })
}

function loadPostUserArticle(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryAdminArticles", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"adminId": postUserId,"title":$("#globeSearchText").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function (result) {
            $("#postUserArticleNum").html(result.total);
            $("#inputPage").attr('placeholder', (result.pageNum + "/" + result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function (index, item) {
                con += `<div class="ui mobile reversed stackable grid" onclick="getArticleDetail(${item.id})">
                            <div class="twelve wide column">
                                <a class="ui header button">${item.title}</a>
                                <p class="m-text">${item.digest}</p>
                            </div>
                            <div class="four wide column">
                                <img style="width: 100%;height: 100%;" src="/img/label/${item.labelId}.jpg" alt="" class="ui rounded image">
                            </div>
                        </div>
                        <div class="ui mobile reversed stackable grid">
                            <div class="six wide column">
                                <div class="ui mini horizontal link list">
                                    <div class="content">
                                        <i class="user icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${item.adminName}</span>
                                        <i class="idea icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${item.labelName}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right aligned ten wide column">
                                <div class="ui mini horizontal link list">
                                    <i class="calendar alternate icon blue" style="margin:0 10px"></i>
                                    <span class="text">${item.date}</sapn>
                                    <i class="eye icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${item.readNum}</sapn>
                                    <i class="thumbs up icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${item.likeNum}</sapn>
                                    <i class="comment alternate icon blue" style="margin: 0 10px;"></i>
                                    <span class="text" >'${item.commentCount}</sapn>
                                </div>
                            </div>
                        </div>
                        <hr />`;
            });
            $("#content").html(con); //把内容入到这个div中即完成
        }
    })
}

function loadFriendNum(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getFriendNum", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"adminId":postUserId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#postUserFriendNum").text(result);
        }
    })
}

function getArticleDetail(id){
    window.location.href = "/getArticleDetail?id="+id;
}

function existFriend(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getUserSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            userId=result.id;
        }
    })
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/existFriend", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"userId":userId,"friendId":postUserId}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result) {
            if(result>0){
                friendExistId = result;
                $("#friendButton").text("已关注");
            }
        }
    })
}


function addFriend(){
    if( $("#friendButton").text()==="已关注"){
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/deleteFriend", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"id": friendExistId}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    $("#friendButton").text("关注");
                    showMsg("取消关注成功", "success", 3000);
                } else {
                    showMsg("取消关注失败", "error", 3000);
                }
            }
        })
    }else {
        var friendTime = nowDate();
        console.log()
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            async: false,
            url: "/addFriend", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"userId": userId, "friendId": postUserId, "friendTime": friendTime}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    $("#friendButton").text("已关注");
                    showMsg("关注成功", "success", 3000);
                } else {
                    showMsg("关注失败", "error", 3000);
                }
            }
        })
        existFriend();
        loadFriendNum();
    }
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

function searchButton(){
    pageNum = 1;
    loadPostUserArticle();
}