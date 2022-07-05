var pageNum=1,pageSize=20;

$(function (){
    loadComment();
})

function prePage(){
    pageNum-=1;
    loadComment();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadComment();
    $(document).scrollTop(0);
}

function loadComment(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryAllComment", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"text":$("#commentText").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            pageNum = result.pageNum;
            var con = '';
            $.each(result.list, function(index, item){
                var postName = getPostName(item.postId);
                var articleTitle = getArticleTitle(item.articleId);
                var parentComment = getParentComment(item.parentId);
                con += `<tr>
                    <td>${index+1}</td>
                    <td>${item.commentName}</td>
                    <td>${articleTitle}</td>
                    <td>${postName}</td>
                    <td>${parentComment}</td>
                    <td>${item.comment}</td>
                    <td>${item.commentTime}</td>
                    <td>
                        <a href="javascript:void(0);" onclick="deleteCommentButton(${item.id})" class="ui mini red basic button">删除</a>
                    </td>
                </tr>`;
            });
            $("#commentBody").html(con);
        }
    })
}

function getParentComment(id){
    var commentText;
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getOneComment", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
           commentText = result.comment;
        }
    })
    commentText = typeof(commentText)=="undefined"?"无":commentText;
    return commentText;
}

function getPostName(id){
    var postName;
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getOneAdmin", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            postName = result.adminName;
        }
    })
    return postName;
}

function getArticleTitle(id){
    var articleTitle;
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getOneArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            articleTitle = result.title;
        }
    })
    return articleTitle;
}

function searchComment(){
    pageNum = 1;
    loadComment();
}

var commentId;
function deleteCommentButton(id){
    $('#popDeleteComment')
        .modal('show');
    commentId = id;
}

function deleteComment(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/deleteComment", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":commentId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType: "application/json",
        success: function (result) {
            if (result > 0) {
                showMsg("删除成功！", "success", 3000);
                loadComment();
            } else {
                showMsg("删除失败！", "error", 3000);
            }
        }
    })
    $('#popDeleteComment')
        .modal('hide');
}