var pageNum=1,pageSize=10;

function prePage(){
    pageNum-=1;
    loadPostUser();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadPostUser();
    $(document).scrollTop(0);
}

$(function (){
    $("#globeSearchText").val("");
    loadPostUser();
})

function getSpecifyPage() {
    if ($("#inputPage").val() !== '') {
        var reg = /^[0-9]+.?[0-9]*$/;
        var pattern = new RegExp(reg);
        if (!pattern.test($("#inputPage").val()))
            $("#inputPage").placeholder("请输入数值类型");
        else {
            pageNum=$("#inputPage").val()
            pageNum = parseInt(pageNum);
            loadPostUser();
            $(document).scrollTop(0);
        }
    }
}

function loadPostUser(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryPostUser", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"name":$("#globeSearchText").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            $("#inputPage").attr('placeholder',(result.pageNum+"/"+result.pages));
            $("#inputPage").val("");
            pageNum = result.pageNum;
            let con = "";
            $.each(result.list, function(index, item){
                con += '<div onclick="getAdminDetail('+item.id+')" style="cursor: pointer;"  class="column"><div class="ui violet fluid card"><div class="image">'
                con += '<img style="width: 100%;height: 100%;" class="bordered padded" src="/img/avatar/' + item.avatar + '"/></div>';
                con += '<div class="ui center aligned content"><a class="ui huge header">'+item.adminName+'</a></div></div></div>';
            });
            $("#postUser").html(con);
            $(document).scrollTop(0);
        }
    })
}

function searchButton(){
    pageNum = 1;
    loadPostUser();
}

function getAdminDetail(id){
    window.location.href = "getPostUserDetail?id="+id;
}