var pageNum=1,pageSize=15;
$(function (){
    $("#globeSearchText").val("");
    loadArticles();
    loadPostMan();
    loadLabel();
    loadRecommendArticles();
})

function prePage(){
    pageNum-=1;
    loadArticles();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadArticles();
    $(document).scrollTop(0);
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
            loadArticles();
            $(document).scrollTop(0);
        }
    }
}

function loadPostMan(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getalladmin", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":1,"pageSize":24}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            let con = "";
            $.each(result.list, function(index, item){
                con += '<a onclick="getAdminDetail('+item.id+')" target="_blank" class="ui blue basic left label m-margin-tb-tiny">' + '<i class="user icon blue"></i>';
                con += '<div class="detail">'+item.adminName+'</div></a>';
            });
            $("#postuser").html(con); //把内容入到这个div中即完成
        }
    })
}

function loadLabel(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getalllabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":1,"pageSize":24}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            let con = "";
            $.each(result.list, function(index, item){
                con += '<a onclick="getLabelDetail('+item.id+')" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">' +
                    '<div class="detail">' + item.labelName + '</div></a>';
            });
            $("#label").html(con); //把内容入到这个div中即完成
        }
    })
}

function loadRecommendArticles(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getrecommendarticles", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        dataType: "json", //json格式，后台返回的数据为json格式的。
        success: function(result){
            let con = "";
            $.each(result, function(index, item){
                con += '<div class="ui fluid vertical menu"><a onclick="getArticleDetail('+item.id+')" class="item">'
                    +item.title+'</a></div>';
            });
            $("#recommend").html(con); //把内容入到这个div中即完成
        }
    })
}

function loadArticles(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryArticles", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"title":$("#globeSearchText").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            $("#inputPage").attr('placeholder',(result.pageNum+"/"+result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function(index, item){
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
            $(document).scrollTop(0);
        }
    })
}

function getArticleDetail(id){
    window.location.href = "/getArticleDetail?id="+id;
}

function searchButton(){
    pageNum = 1;
    loadArticles();
}

function getLabelDetail(id){
    window.location.href = "getLabelDetail?id="+id;
}

function getAdminDetail(id){
    window.location.href = "getPostUserDetail?id="+id;
}