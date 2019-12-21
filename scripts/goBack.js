$(() => {

    // Add thsi code to Signup and Login files
    // <button onclick="goBack()">Go Back</button>

    // alert("goBAck vali script loaded")

    // function printHi() {
    //     console.log("Hi")
    // }

    let goBackButton = $('#goBackButton')

    goBackButton.click(() => {
        window.history.back();
    })
    // function goBack() {
    //     console.log("clicked")
    //     window.history.back();
    // }

})