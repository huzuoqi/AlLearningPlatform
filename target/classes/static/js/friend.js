var pageNum=1,pageSize=10;

function prePage(){
    pageNum-=1;
    loadFriend();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadFriend();
    $(document).scrollTop(0);
}

$(function (){
    $("#globeSearchText").val("");
    getUserSession();
    loadFriend();
})

var userId;

function getUserSession(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getUserSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            userId=result.id;
        }
    })
}

function getSpecifyPage() {
    if ($("#inputPage").val() !== '') {
        var reg = /^[0-9]+.?[0-9]*$/;
        var pattern = new RegExp(reg);
        if (!pattern.test($("#inputPage").val()))
            $("#inputPage").placeholder("请输入数值类型");
        else {
            pageNum=$("#inputPage").val();
            pageNum = parseInt(pageNum);
            loadFriend();
            $(document).scrollTop(0);
        }
    }
}

function loadFriend(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getOneQueryFriend", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"userId":userId,"name":$("#globeSearchText").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            $("#inputPage").attr('placeholder',(result.pageNum+"/"+result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function(index, item){
                con += '<div onclick="getFriendDetail('+item.friendId+')" style="cursor: pointer;"  class="column"><div class="ui violet fluid card"><div class="image">'
                con += '<img class="bordered padded" src="/img/avatar/' + item.friendAvatar + '"/></div>';
                con += '<div class="ui center aligned content padded"><a class="ui huge header">'+item.friendName+'</a></div></div></div>';
            });
            $("#friend").html(con);
            $(document).scrollTop(0);
        }
    })
}

function searchButton(){
    pageNum = 1;
    loadFriend();
}

function getFriendDetail(id){
    window.location.href = "getPostUserDetail?id="+id;
}