$(() => {

    alert("dahnav.js loaded")
    console.log("dahnav.js loaded")
    // set
    setWidth();

    // $(".collapse").on('show.bs.collapse', function () {
    //     alert('The collapsible content is about to be shown.');
    // });
    (function () {
        // $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="tooltip"]').tooltip('enable')

    }
    );

    $('.nav-item').hover(
        function () { $(this).addClass('active') },
        function () { $(this).removeClass('active') }
    )

    set = false;
    $('.toggleButtons').on('click', function () {
        if (set == false) {
            $('[data-toggle="tooltip"]').tooltip('disable')
            set = true
        }
        else {
            $('[data-toggle="tooltip"]').tooltip('enable')
            set = false;
        }
        // Disable tooltips
        // $('[data-toggle="tooltip"]').tooltip('enable')

        $("#pageContent").toggleClass("grayed");
        $(".nav-link").toggleClass("text-center");
        $(".toggleButtons").toggleClass("hiddenButtons");

    });



    function setWidth() {
        console.log("called")
        let mrg = $('#sidebar').innerWidth()
        $('#pageContent').css('margin-left', mrg + 'px');
        $('#pageContent').css('width', $(window).width() - mrg + 'px');



    }

})