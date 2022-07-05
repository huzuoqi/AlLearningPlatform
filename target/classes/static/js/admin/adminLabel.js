var pageNum=1,pageSize=20;

$(function (){
    loadLabel();
})

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

function loadLabel(){
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        url: "/getQueryLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"pageNum":pageNum,"pageSize":pageSize,"name":$("#labelName").val()}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType:"application/json",
        success: function(result){
            $("#totalNum").html(result.total);
            pageNum = result.pageNum;
            var con = '';
            $.each(result.list, function(index, item){
                con += `<tr>
                    <td>${index+1}</td>
                    <td>${item.labelName}</td>
                    <td>${item.labelNick}</td>
                    <td>${item.labelDescribe}</td>
                    <td>
                        <a href="javascript:void(0);" onclick="updateLabelButton(${item.id})" class="ui mini teal basic button">编辑</a>
                    </td>
                </tr>`;
            });
            $("#labelBody").html(con);
        }
    })
}

function searchLabel(){
    pageNum = 1;
    loadLabel();
}

function addLabelButton(){
    $('#popAddLabel')
        .modal('show');
}

var label;
function updateLabelButton(id) {
    $('#popUpdateLabel')
        .modal('show');
    $.ajax({
        type: "post", //请求的方式，也有POST请求
        async:false,
        url: "/getOneLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
        data: JSON.stringify({"id": id}),//data是传给后台的字段，后台需要哪些就传入哪些
        dataType: "json", //json格式，后台返回的数据为json格式的。
        contentType: "application/json",
        success: function (result) {
            label = result;
        }
    })
    loadUpdateLabel();
}

function loadUpdateLabel(){
    $("#updateTitle").val(label.labelName);
    $("#updateNick").val(label.labelNick);
    $("#updateDescribe").html(label.labelDescribe);
}

function updateLabel(){
    if($("#updateTitle").val()===""){
        showMsg("请输入标签名！", "warning", 3000);
    }else if($("#updateNick").val() === ''){
        showMsg("请输入标签别名！", "warning", 3000);
    }else if($("#updateDescribe").val() === ''){
        showMsg("请输入标签描述！", "warning", 3000);
    }else {
        var json = {
            "id":label.id,
            "labelName": $("#updateTitle").val(),
            "labelNick": $("#updateNick").val(),
            "labelDescribe": $("#updateDescribe").val(),
        }
        console.log(json);
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/updateLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify(json),//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result > 0) {
                    showMsg("修改成功！", "success", 3000);
                    loadLabel();
                } else {
                    showMsg("修改失败！", "error", 3000);
                }
            }
        })
    }
    $('#popUpdateLabel')
        .modal('hide');
}

function addLabel(){
    if($("#addTitle").val()===""){
        showMsg("请输入标签名！", "warning", 3000);
    }else if($("#addNick").val() === ''){
        showMsg("请输入标签别名！", "warning", 3000);
    }else if($("#addDescribe").val() === ''){
        showMsg("请输入标签描述！", "warning", 3000);
    }else {
        var json = {
            "labelName": $("#addTitle").val(),
            "labelNick": $("#addNick").val(),
            "labelDescribe": $("#addDescribe").val(),
        }
        console.log(json);
        $.ajax({
            type: "post", //请求的方式，也有POST请求
            url: "/addLabel", //请求地址，后台提供的,这里我在本地自己建立了个json的文件做例子
            data: JSON.stringify(json),//data是传给后台的字段，后台需要哪些就传入哪些
            dataType: "json", //json格式，后台返回的数据为json格式的。
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result > 0) {
                    showMsg("添加成功！", "success", 3000);
                    loadLabel();
                } else {
                    showMsg("添加失败！", "error", 3000);
                }
            }
        })
    }
    $('#popAddLabel')
        .modal('hide');
}