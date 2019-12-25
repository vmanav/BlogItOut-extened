$(() => {

    // set
    setWidth();

    // $(".collapse").on('show.bs.collapse', function () {
    //     alert('The collapsible content is about to be shown.');
    // });


    $('.toggleButtons').on('click', function () {

        $("#content").toggleClass("grayed");
        
        $(".toggleButtons").toggleClass("hiddenButtons");

    });



    function setWidth() {
        console.log("called")
        let mrg = $('#sidebar').innerWidth()
        $('#content').css('margin-left', mrg + 'px');
    }

})