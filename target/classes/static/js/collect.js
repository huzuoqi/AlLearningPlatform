var pageNum=1,pageSize=15;

function prePage(){
    pageNum-=1;
    loadCollect();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadCollect();
    $(document).scrollTop(0);
}
var collectId;

$(function (){
    $("#globeSearchText").val("");
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getUserSession", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result) {
            collectId=result.id;
        }
    })
    loadCollect();
    loadPostMan();
    loadLabel();
})

function getSpecifyPage() {
    if ($("#inputPage").val() !== '') {
        var reg = /^[0-9]+.?[0-9]*$/;
        var pattern = new RegExp(reg);
        if (!pattern.test($("#inputPage").val()))
            $("#inputPage").placeholder("请输入数值类型");
        else {
            pageNum=$("#inputPage").val();
            pageNum = parseInt(pageNum);
            loadCollect();
            $(document).scrollTop(0);
        }
    }
}

function loadCollect(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getOneCollect", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"collectId":collectId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            $("#inputPage").attr('placeholder',(result.pageNum+"/"+result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function(index, item){
                var articleDetail = loadArticle(item.articleId);
                if(articleDetail.title.match('[A-z]*'+$("#globeSearchText").val()+'[A-z]*')||$("#globeSearchText").val()==='') {
                    con += `<div class="ui mobile reversed stackable grid" onclick="getArticleDetail(${item.articleId})">
                            <div class="twelve wide column">
                                <a class="ui header button">${articleDetail.title}</a>
                                <p class="m-text">${articleDetail.digest}</p>
                            </div>
                            <div class="four wide column">
                                <img style="width: 100%;height: 100%;" src="/img/label/${articleDetail.labelId}.jpg" alt="" class="ui rounded image">
                            </div>
                        </div>
                        <div class="ui mobile reversed stackable grid">
                            <div class="six wide column">
                                <div class="ui mini horizontal link list">
                                    <div class="content">
                                        <i class="user icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${articleDetail.adminName}</span>
                                        <i class="idea icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${articleDetail.labelName}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right aligned ten wide column">
                                <div class="ui mini horizontal link list">
                                    <i class="calendar alternate icon blue" style="margin:0 10px"></i>
                                    <span class="text">${articleDetail.date}</sapn>
                                    <i class="eye icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${articleDetail.readNum}</sapn>
                                    <i class="thumbs up icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${articleDetail.likeNum}</sapn>
                                    <i class="comment alternate icon blue" style="margin: 0 10px;"></i>
                                    <span class="text" >'${articleDetail.commentCount}</sapn>
                                </div>
                            </div>
                        </div>
                        <hr />`;
                }
            });
            $("#content").html(con);
        }
    })
}

function searchButton(){
    loadCollect();
    $(document).scrollTop(0);
}

function loadArticle(id){
    var article;
     $.ajax({
        type: "post", //请求的方式，也有POST请求
        async: false,
        url: "/getOneArticle", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id":id}),
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            article = result;
        }
    })
    return article;
}

function getArticleDetail(id){
    window.location.href = "/getArticleDetail?id="+id;
}

function loadPostMan(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getCollectPostUser", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"collectId":collectId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            var con2 = "";
            console.log()
            $.each(result, function(index, item){
                con2 += '<a onclick="getCollectByPostUser('+item.id+')" target="_blank" class="ui blue basic left label m-margin-tb-tiny">' + '<i class="user icon blue"></i>';
                con2 += '<div class="detail">'+item.adminName+'</div></a>';
            });
            $("#collectPostUser").html(con2); //把内容入到这个div中即完成
        }
    })
}

function loadLabel(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getCollectLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"collectId":collectId}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            var con1 = "";
            $.each(result,function (index,item){
                con1 += '<a onclick="getCollectByLabel('+item.id+')" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">' +
                    '<div class="detail">' + item.labelName + '</div></a>';
            });
            $("#collectLabel").html(con1); //把内容入到这个div中即完成
        }
    })
}

function getCollectByPostUser(id){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getCollectByPostUser", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"collectId":collectId,"postId":id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            $("#inputPage").attr('placeholder',(result.pageNum+"/"+result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function(index, item){
                var articleDetail = loadArticle(item.articleId);
                con += `<div class="ui mobile reversed stackable grid" onclick="getArticleDetail(${item.articleId})">
                            <div class="twelve wide column">
                                <a class="ui header button">${articleDetail.title}</a>
                                <p class="m-text">${articleDetail.digest}</p>
                            </div>
                            <div class="four wide column">
                                <img style="width: 100%;height: 100%;" src="/img/label/${articleDetail.labelId}.jpg" alt="" class="ui rounded image">
                            </div>
                        </div>
                        <div class="ui mobile reversed stackable grid">
                            <div class="six wide column">
                                <div class="ui mini horizontal link list">
                                    <div class="content">
                                        <i class="user icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${articleDetail.adminName}</span>
                                        <i class="idea icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${articleDetail.labelName}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right aligned ten wide column">
                                <div class="ui mini horizontal link list">
                                    <i class="calendar alternate icon blue" style="margin:0 10px"></i>
                                    <span class="text">${articleDetail.date}</sapn>
                                    <i class="eye icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${articleDetail.readNum}</sapn>
                                    <i class="thumbs up icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${articleDetail.likeNum}</sapn>
                                    <i class="comment alternate icon blue" style="margin: 0 10px;"></i>
                                    <span class="text" >'${articleDetail.commentCount}</sapn>
                                </div>
                            </div>
                        </div>
                        <hr />`;
            });
            $("#content").html(con);
        }
    })
}

function getCollectByLabel(id){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getCollectByLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"collectId":collectId,"labelId":id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            $("#inputPage").attr('placeholder',(result.pageNum+"/"+result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function(index, item){
                var articleDetail = loadArticle(item.articleId);
                con += `<div class="ui mobile reversed stackable grid" onclick="getArticleDetail(${item.articleId})">
                            <div class="twelve wide column">
                                <a class="ui header button">${articleDetail.title}</a>
                                <p class="m-text">${articleDetail.digest}</p>
                            </div>
                            <div class="four wide column">
                                <img style="width: 100%;height: 100%;" src="/img/label/${articleDetail.labelId}.jpg" alt="" class="ui rounded image">
                            </div>
                        </div>
                        <div class="ui mobile reversed stackable grid">
                            <div class="six wide column">
                                <div class="ui mini horizontal link list">
                                    <div class="content">
                                        <i class="user icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${articleDetail.adminName}</span>
                                        <i class="idea icon blue" style="margin: 0 10px"></i>
                                        <span class="text"> ${articleDetail.labelName}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="right aligned ten wide column">
                                <div class="ui mini horizontal link list">
                                    <i class="calendar alternate icon blue" style="margin:0 10px"></i>
                                    <span class="text">${articleDetail.date}</sapn>
                                    <i class="eye icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${articleDetail.readNum}</sapn>
                                    <i class="thumbs up icon blue" style="margin: 0 10px;"></i>
                                    <span class="text">${articleDetail.likeNum}</sapn>
                                    <i class="comment alternate icon blue" style="margin: 0 10px;"></i>
                                    <span class="text" >'${articleDetail.commentCount}</sapn>
                                </div>
                            </div>
                        </div>
                        <hr />`;
            });
            $("#content").html(con);
        }
    })
}