$(function(){
    $("#example").fireworks({
        width: "100%",
        height: "100%"
    });
    var $main = $("#main");
    var $footer = $("#footer");
    setTimeout(function(){
        $main.fadeIn('show');
        $footer.fadeIn('show');
        setInterval(function(){
            var $div1 = $("#main .div:first-child");
            $div1.remove();
            $main.append($div1);
        },1000);
    },4000);
});