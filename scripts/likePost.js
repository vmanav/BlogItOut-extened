$(() => {
    // alert("likePost loaded")

    // When a user Opens a blog check if the post is liked by the user or not and
    // according to that assing a class "grayColored" OR "redColored"

    // make a get request on `/checkLikedOrNot`
    let blogId = window.location.href.split('=')[1];
    if (blogId) {
        console.log("blogId exixts - ", blogId);
        let requestUrl = '/checkLikedOrNot' + '/?blogId=' + blogId;
        console.log("requestUrl", requestUrl);

        $.get(requestUrl, function (data) {
            console.log("Data Recieved - ");
            console.log(data);
            if (data.found == true) {
                alert("TRUE");
                $('#likePost').addClass("redColored");
            }
            else {
                alert("FALSE");
                $('#likePost').addClass("grayColored");
            }
        })
            .fail(() => {

                alert("Unable to retrive data.");
            })
    }
    else {
        console.log("blogId doesn't exixts.");
    }


    let likePost = $('#likePost');
    likePost.click(() => {

        console.log("clicked on likePost");
        likePost.toggleClass("grayColored");
        likePost.toggleClass("redColored");

        // Now make a frontend request to server to update the like

        let url = window.location.href;
        // console.log("url -")
        // console.log(url)
        // console.log(url.split('=')[1])
        let blogId = url.split('=')[1];

        // let authorId = $('#authorId').text().trim();
        // let authorName = $('#authorName').text().trim()

        // console.log("authorId -")
        // console.log(authorId)
        // if (redColored class exists then => LIKE)

        // LIKE
        if (likePost.hasClass("redColored")) {
            $.post(
                '/like',
                {
                    blogId: blogId,
                    like: "like",
                },
                (data) => {
                    console.log("data :>", data)

                }
                // this 'data' is the whole tasks array recieved
            )
        }
        else if (likePost.hasClass("grayColored")) {
            // DISLIKE
            $.post(
                '/like',
                {
                    blogId: blogId,
                    like: "dislike",
                },
                (data) => {
                    console.log("data :>", data)
                }
                // this 'data' is the whole tasks array recieved
            )

        }


        // if (grayColored class exists then => UNLIKE)
    })




})