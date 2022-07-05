$('.menu.toggle').click(function () {
    $('.m-item').toggleClass('m-mobile-hide')
})

$('.ui.dropdown').dropdown({
    on : 'hover'
});

function topToArticle(){
    window.location.href = "/adminArticle";
}

function topToUser(){
    window.location.href = "/adminUser";
}

function  topToComment(){
    window.location.href = "/adminComment";
}

function  topToLabel(){
    window.location.href = "/adminLabel";
}

function  topToPostUser(){
    window.location.href = "/adminPostUser";
}

function adminLogout(){
    window.location.href = "/adminLogout";
}

function adminDetail(){
    window.location.href = "/adminDetail";
}

function updateAdmin(){
    window.location.href = "/updateAdmin"
}