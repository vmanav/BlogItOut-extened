// Script for gttButton (Go-to-Top Button)

$(() => {

    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {

        var x = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (document.body.scrollTop > (x / 2) || document.documentElement.scrollTop > (x / 2)) {
            $("#goToTopButton").addClass("goToTopButton-visible");
        }
        else {
            $("#goToTopButton").removeClass("goToTopButton-visible");
        }
    }

})