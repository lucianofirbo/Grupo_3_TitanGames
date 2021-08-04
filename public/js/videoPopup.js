
function toggle(){
    var trailer = document.querySelector(".trailer")
    var iframe = document.querySelector("iframe")
    trailer.classList.toggle("active");
    iframe.pause();
    iframe.currentTime = 0;
}