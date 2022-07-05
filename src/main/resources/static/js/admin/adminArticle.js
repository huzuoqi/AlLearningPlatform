var pageNum=1,pageSize=20;
var adminId,labelId=0;

$(function (){
    getAdminSession();
    loadArticleType();
    loadAdminArticle();
})

function prePage(){
    pageNum-=1;
    loadAdminArticle();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadAdminArticle();
    $(document).scrollTop(0);
}

function getAdminSession(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getAdminSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            adminId=result.id;
        }
    })
}

function loadArticleType(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":1,"pageSize":100,"name":""}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            var con = '<div class="item" labelId=0>无类型</div>';
            $.each(result.list, function(index, item){
                con += '<div class="item" labelId='+item.id+'>' + item.labelName + '</div>';
            });
            $("#showArticleType").html(con);
        }
    })
}

function loadAdminArticle(){
    labelId = $('#articleType .selected').attr('labelId');
    labelId = typeof(labelId)=="undefined"?0:labelId;
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryAdminLabelArticles", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"adminId":adminId,"labelId":labelId,"title":$("#articleTitle").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            pageNum = result.pageNum;
            var con = '';
            $.each(result.list, function(index, item){
                con += `<tr>
                    <td>${index+1}</td>
                    <td>${item.title}</td>
                    <td>${item.labelName}</td>
                    <td>${item.readNum}</td>
                    <td>${item.likeNum}</td>
                    <td>${item.commentCount}</td>
                    <td>${item.date}</td>
                    <td>
                        <a href="javascript:void(0);" onclick="changeArticleButton(${item.id})" class="ui mini teal basic button">编辑</a>
                        <a href="javascript:void(0);" onclick="deleteArticleButton(${item.id})" class="ui mini red basic button">删除</a>
                    </td>
                </tr>`;
            });
            $("#articleBody").html(con);
        }
    })
}

function searchArticles(){
    pageNum = 1;
    loadAdminArticle();
}

function articleTypeSelect(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":1,"pageSize":100,"name":""}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            var con = '';
            $.each(result.list, function(index, item){
                con += '<div class="item" labelId='+item.id+'>' + item.labelName + '</div>';
            });
            $("#addSelectArticleType").html(con);
            $("#updateSelectArticleType").html(con);
        }
    })
}

function addArticleButton(){
    $('#popAddArticle')
        .modal('show');
    articleTypeSelect();
}

var article;
function changeArticleButton(id){
    $('#popUpdateArticle')
        .modal('show');
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async:false,
        url: "/getOneArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id": id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType: "application/json",
        success: function (result) {
            article = result;
        }
    })
    loadUpdateArticle();
    articleTypeSelect();
}

var articleId;
function deleteArticleButton(id){
    $('#popDeleteArticle')
        .modal('show');
    articleId = id;
}

function deleteArticle(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/deleteArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":articleId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType: "application/json",
        success: function (result) {
            if (result > 0) {
                showMsg("删除成功！", "success", 3000);
                loadAdminArticle();
            } else {
                showMsg("删除失败！", "error", 3000);
            }
        }
    })
    $('#popDeleteArticle')
        .modal('hide');
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

function addArticle(){
    var addLabelId = $('#addSelectArticleType .selected').attr("labelId")
    addLabelId = typeof(addLabelId)=="undefined"?0:addLabelId;
    if($("#addTitle").val()===""){
        showMsg("请输入标题！", "warning", 3000);
    }else if(addLabelId === 0){
        showMsg("请选择类型！", "warning", 3000);
    }else if($("#addDigest").val() === ''){
        showMsg("请输入摘要！", "warning", 3000);
    }else if($("#addUrl").val() === ''){
        showMsg("请输入文章链接！", "warning", 3000);
    }else {
        var json = {
            "title": $("#addTitle").val(),
            "labelId": addLabelId,
            "digest": $("#addDigest").val(),
            "readNum": 0,
            "likeNum": 0,
            "commentCount": 0,
            "date": nowDate(),
            "url": $("#addUrl").val(),
            "adminId": adminId
        }
        console.log(json);
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/addArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify(json),//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json",
            success: function (result) {
                if (result > 0) {
                    showMsg("添加成功！", "success", 3000);
                    loadAdminArticle();
                } else {
                    showMsg("添加失败！", "error", 3000);
                }
            }
        })
    }
    $('#popAddArticle')
        .modal('hide');
}

function loadUpdateArticle(){
    $("#updateTitle").val(article.title);
    $("#updateDigest").val(article.digest);
    $("#defaultText").html(article.labelName);
    $("#updateUrl").val(article.url);
}

function updateArticle(){
    var updateLabelId = $('#updateSelectArticleType .selected').attr('labelId');
    console.log(updateLabelId);
    updateLabelId = typeof(updateLabelId)=="undefined"?0:updateLabelId;
    if($("#updateTitle").val()===""){
        showMsg("请输入标题！", "warning", 3000);
    }else if($("#updateDigest").val() === ''){
        showMsg("请输入摘要！", "warning", 3000);
    }else if($("#updateUrl").val() === ''){
        showMsg("请输入文章链接！", "warning", 3000);
    }else {
        if(updateLabelId === 0){
            updateLabelId = article.labelId;
        }
        var json = {
            "id":article.id,
            "title": $("#updateTitle").val(),
            "labelId": updateLabelId,
            "digest": $("#updateDigest").val(),
            "url": $("#updateUrl").val(),
        }
        console.log(json);
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/updateArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify(json),//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result > 0) {
                    showMsg("修改成功！", "success", 3000);
                    loadAdminArticle();
                } else {
                    showMsg("修改失败！", "error", 3000);
                }
            }
        })
    }
    $('#popUpdateArticle')
        .modal('hide');
}