var pageNum=1,pageSize=10;

function prePage(){
    pageNum-=1;
    loadLabel();
    $(document).scrollTop(0);
}

function nextPage(){
    pageNum+=1;
    loadLabel();
    $(document).scrollTop(0);
}

$(function (){
    $("#globeSearchText").val("");
    loadLabel()
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
            loadLabel();
            $(document).scrollTop(0);
        }
    }
}

function loadLabel(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
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
                con += '<div onclick="getLabelDetail('+item.id+')" style="cursor: pointer;"  class="blue card"><div class="content">'
                con += '<div class="image"><img style="width: 100%;height: auto" class="bordered padded" src="/img/label/' + item.id + '.jpg"/></div><br>'
                con += '<div class="header">'+item.labelName+'</div>';
                con += '<div class="meta">'+item.labelNick+'</div>';
                con += '<div class="description" style="height: 100px;overflow: hidden">' + item.labelDescribe + '</div></div></div>';
            });
            $("#label").html(con);
        }
    })
}

function searchButton(){
    pageNum = 1;
    loadLabel();
    $(document).scrollTop(0);
}

function getLabelDetail(id){
    window.location.href = "getLabelDetail?id="+id;
}