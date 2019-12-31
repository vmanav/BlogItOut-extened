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


        let url = window.location.href;
        console.log("url -")
        console.log(url)
        console.log(url.split('=')[1])
        let blogId = url.split('=')[1];
        let authorId = $('#authorId').text().trim();
        let authorName = $('#authorName').text().trim()
        console.log("authorId -")
        console.log(authorId)
        // if (redColored class exists then => LIKE)
        // if (likePost.hasClass("redColored")) {
        //     // LIKE

        $.post(
            '/like',
            {
                authorId: authorId,
                authorName: authorName,
                blogId: blogId,
                like: true,
            },
            (data) => {
                console.log("data :>", data)

            }
            // this 'data' is the whole tasks array recieved
        )


        // }
        // else if (likePost.hasClass("grayColored")) {
        //     // DISLIKE


        // }


        // if (grayColored class exists then => UNLIKE)
    })

})