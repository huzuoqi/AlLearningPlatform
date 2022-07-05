function showMsg(text, icon, hideAfter) {
    $.toast({
        text: text,
        heading: '提示',
        icon: icon,
        showHideTransition: 'slide',
        allowToastClose: true,
        hideAfter: hideAfter,
        stack: 5,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#2dadd2',
    })
}

function loadingText(btnId, text) {
    $("#" + btnId + "").attr("disabled", "");
    $("#" + btnId + "").text(text);
}

//回滚原本状态
function loadingBack(btnId, text) {
    $("#" + btnId + "").removeAttr("disabled");
    $("#" + btnId + "").text(text);
}