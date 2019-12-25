$(() => {

    // set
    setWidth();


    $('#toggleButton').on('click', function () {
        // setWidth();
        // let mrg = $('#sidebar').innerWidth()
        // $('#content').css('margin-left', mrg + 'px');

        
    });
 


    function setWidth() {
        console.log("called")
        let mrg = $('#sidebar').innerWidth()
        $('#content').css('margin-left', mrg + 'px');
    }

})