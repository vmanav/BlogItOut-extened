$(() => {

    window.onscroll = function () {
        scrollFunction()
    };

    navbarHeight = $("#myNavbar").height();
    // console.log("Height of navbar :", navbarHeight)

    function scrollFunction() {

        var x = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (document.body.scrollTop > (x - navbarHeight) || document.documentElement.scrollTop > (x - navbarHeight)) {
            document.getElementById("myNavbar").classList.add("bg-dark", "navbar-dark");
            $("#goToTopButton").addClass("goToTopButton-visible");
        }
        else {
            document.getElementById("myNavbar").classList.remove("bg-dark", "navbar-dark");
            $("#goToTopButton").removeClass("goToTopButton-visible");
        }
    }

})