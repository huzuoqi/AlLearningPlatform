$('.menu.toggle').click(function () {
    $('.m-item').toggleClass('m-mobile-hide')
})

$('.ui.dropdown').dropdown({
    on : 'hover'
});

function topToHome(){
    window.location.href = "/index";
}

function topToPostUser(){
    window.location.href = "/postUser";
}

function  topToLabel(){
    window.location.href = "/label";
}

function  topToCollect(){
    window.location.href = "/collect";
}

function  topToMe(){
    window.location.href = "/aboutMe";
}

function logout(){
    window.location.href = "/logout";
}

function userDetail(){
    window.location.href = "/userDetail";
}

function updateUser(){
    window.location.href = "/updateUser"
}

function topToFriend(){
    window.location.href = "/friend"
}