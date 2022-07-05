$('.menu.toggle').click(function () {
    $('.m-item').toggleClass('m-mobile-hide')
});

var url=window.location.search;
//将返回的字符串以=分割
var articleId = url.split("=")[1];

$(function (){
    $("#globeSearch").hide();
    addReadNum(articleId);
    loadArticleDetail(articleId);
    loadComment();
})

var postId ;
var collectId;
var labelId;

var collectExistId;
var friendExistId;

function loadArticleDetail(id){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getOneArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#articleTitle").text(result.title);
            $("#articleLikeNum").text(result.likeNum);
            $("#articleComment").text(result.commentCount);
            $("#articleReadNum").text(result.readNum);
            $("#articleLabel").text(result.labelName);
            $("#articleDate").text(result.date);
            $("#articlePostUser").text(result.adminName);
            $("#articleDigest").text(result.digest);
            $("#frame").attr("src",result.url);
            $("#articleAvatar").attr("src",'/img/avatar/'+result.adminAvatar)
            postId = result.adminId;
            labelId = result.labelId;
        }
    })

    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getUserSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            collectId=result.id;
        }
    })

    existCollect();
    existFriend();
}

function existCollect(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/existCollect", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"collectId":collectId,"articleId":articleId}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result) {
            if(result>0){
                collectExistId = result;
                $("#collectButton").text("已收藏");
            }
        }
    })
}

function existFriend(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/existFriend", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"userId":collectId,"friendId":postId}),
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

function addReadNum(id){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/addReadNum", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            if(result>0){
                console.log("访问量+1")
            }else{
                console.log("访问出错！");
            }
        }
    })
}

function addLikeNum(id){
    if($("#likeButton").text()==='已点赞'){
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/deleteLikeNum", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"id": id}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    $("#likeButton").text("点赞");
                    showMsg("取消点赞成功", "success", 3000);
                } else {
                    showMsg("取消点赞点赞失败", "error", 3000);
                }
            }
        })
    }else {
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/addLikeNum", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"id": id}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    $("#likeButton").text("已点赞");
                    showMsg("点赞成功", "success", 3000);
                } else {
                    showMsg("点赞失败", "error", 3000);
                }
            }
        })
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

function addCollect(){
    if($("#collectButton").text()==="已收藏"){
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/deleteCollect", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({"id":collectExistId}),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    $("#collectButton").text("收藏");
                    showMsg("取消收藏成功", "success", 3000);
                } else {
                    showMsg("取消收藏失败", "error", 3000);
                }
            }
        })
    }else {
        var collectTime = nowDate();
        console.log()
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            async: false,
            url: "/addCollect", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify({
                "id": 1,
                "collectId": collectId,
                "articleId": articleId,
                "postId": postId,
                "labelId": labelId,
                "collectTime": collectTime
            }),
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    $("#collectButton").text("已收藏");
                    showMsg("收藏成功", "success", 3000);
                } else {
                    showMsg("收藏失败", "error", 3000);
                }
            }
        })
        existCollect();
    }
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
            data: JSON.stringify({"userId": collectId, "friendId": postId, "friendTime": friendTime}),
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
    }
}

function loadComment(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getArticleComment", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"articleId":articleId}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            let con="";
            con += "<h3 class=\"ui dividing header\">评论区</h3>";
            $.each(result, function(index, item){
                con += '<div class="comment"><a class="avatar">';
                con += '<img src="/img/avatar/'+item.commentAvatar+'"></a>';
                con += '<div class="content"><a class="author">'+item.commentName+'</a>';
                con += '<div class="metadata"><span class="date">'+item.commentTime+'</span></div>';
                con += '<div class="text">'+item.comment+'</div>';
                con += '<div class="actions"><a onclick="replyPanel('+item.id+')" class="reply"><i class="reply icon" style="margin: 0 10px;"></i>回复</a>';
                if(item.commentId === collectId) {
                    con += '<a onclick="deleteReply(' + item.id + ')" class="reply"><i class="window close outline icon" style="margin: 0 10px;"></i>删除</a>';
                }
                con += '</div></div>';
                let child = item.child;
                if(child !== null){
                    $.each(child, function(childIndex, childItem){
                        con += '<div class="comments"><div class="comment"><a class="avatar">';
                        con += '<img src="/img/avatar/'+childItem.commentAvatar+'"></a>';
                        con += '<div class="content"><a class="author">'+childItem.commentName+'</a>';
                        con += '<div class="metadata"><span class="date">'+childItem.commentTime+'</span></div>';
                        con += '<div class="text">'+childItem.comment+'</div>';
                        con += '<div class="actions"><a onclick="replyPanel('+item.id+')" class="reply"><i class="reply icon" style="margin: 0 10px;"></i>回复</a>';
                        if(childItem.commentId === collectId) {
                            con += '<a onclick="deleteReply(' + childItem.id + ')" class="reply"><i class="window close outline icon" style="margin: 0 10px;"></i>删除</a>';
                        }
                        con += "</div></div></div></div>";
                    })
                }
                con += '</div>';
            })
            $("#comments").html(con);
        }
    })
}

var replyId;

function replyPanel(id){
    $('.ui.modal')
        .modal('show')
    ;
    replyId = id;
}

$("#replyButton").click(function (){
    var content = $("#replyContent").val()
    if(content === null){
        showMsg("请输入内容！","warning",3000)
    }else{
        reply(replyId,content);
        $('.ui.modal')
            .modal('hide')
        ;
        $("#replyContent").val('');
    }
})

function reply(id,comment){
    var commentTime = nowDate();
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/addComment", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"commentId":collectId, "articleId":articleId, "postId":postId,"parentId":id, "comment":comment, "commentTime":commentTime}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            if(result>0){
                showMsg("发布成功","success",3000);
            }else{
                showMsg("发布失败","error",3000);
            }
        }
    })
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/addCommentNum", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":articleId}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
    })
    loadComment();
}

$("#CommentButton").click(function (){
    var content = $("#CommentContent").val()
    if(content === null){
        showMsg("请输入内容！","warning",3000)
    }else{
        reply(0,content);
        $("#CommentContent").val('');
    }
})

function deleteReply(id){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/deleteComment", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            if(result>0){
                showMsg("删除成功","success",3000);
            }else{
                showMsg("删除失败","error",3000);
            }
        }
    })
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/deleteCommentNum", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":articleId}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
    })
    loadComment();
}