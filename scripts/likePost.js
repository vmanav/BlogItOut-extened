$(() => {
    // alert("likePost loaded")

    // When a user Opens a blog check if the post is liked by the user or not and
    // according to that assing a class "grayColored" OR "redColored"



    let likePost = $('#likePost');
    likePost.click(() => {

        console.log("clicked on likePost");
        likePost.toggleClass("grayColored");
        likePost.toggleClass("redColored");

        // Now make a frontend request to server to update the like

        // if (redColored class exists then => LIKE)

        // if (grayColored class exists then => UNLIKE)

    })

})