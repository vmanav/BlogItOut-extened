$(() => {

    function splitDate(data) {
        if (data) {

            console.log("This is the Date - ", data)
            const newDate = new Date(data);
            // var part = data.split("T");
            // splittedDate = part[0];
            // return splittedDate;
            return newDate.toDateString().substr(3);
        }
    };


    let search = $('#search');
    let original = $('#original');

    search.focus(() => {
        // alert("focused")
        original.hide();
    })

    // search.focusout(() => {
    //     // alert("focused")
    //     original.toggleClass("d-none")
    // })

    console.log("JQUERY here -");
    console.log("clientArray - ", clientArray);



    /* Defining, atch function  */
    function findMatches(wordToMatch, Array) {
        return Array.filter((arrayItem) => {
            // check if matches the State / City

            // we use regEx
            const regex = new RegExp(wordToMatch, 'gi')
            return arrayItem.author.match(regex) || arrayItem.blogTitle.match(regex) || arrayItem.blogTags.match(regex);

        })
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.getElementById('suggestions');

    // console.log("Suggesetion s-", suggestions);


    function displayMatches() {

        original.hide();

        // console.log(this);   //- Element
        console.log("Field Value - ", this.value);// - Field Value
        if (this.value == "") {
            console.log("EMPTY");
            suggestions.innerHTML = " ";
            // console.log("ABHI KYA VALUE HAI - ", suggestions.innerHTML)
            // original.toggleClass("d-none")
            original.show();
            return;
        }

        const matchArray = findMatches(this.value, clientArray);
        const html = matchArray.map((place) => {

            const regex = new RegExp(this.value, 'gi');

            const author = place.author.replace(regex, `<span class=hl>${this.value}</span>`);
            const blogTitle = place.blogTitle.replace(regex, `<span class=hl>${this.value}</span>`);
            const blogTags = place.blogTags.replace(regex, `<span class=hl>${this.value}</span>`);



            // place = >
            // {
            //     author: "deadshot Pandey"
            //     authorId: "5e172d2c09ab3f2c04504691"
            //     blogBody: "Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye Teesra Blog hai ye"
            //     blogTags: "3,3,3,3,3,3,3,3,3,3,3,3,3,3,3"
            //     blogTitle: "The Third Blog"
            //     datePosted: "2020-01-10T16:07:07.074Z"
            //     likesArray: []
            //     likesCount: 3
            //     __v: 0
            //     _id: "5e18a12bd9b0b72633b669db"

            // }

            // return `
            //     <div>
            //         <span class="name">${author}, ${blogTitle}</span>
            //         <span class="population">${blogTags}</span>
            //     </div>
            //     `;

            return `
            <a href="/dashboard/?blogId=${place._id}" class="blogLinks">
                <div class="p-3 m-3 card" style="width: 85%;">

                    <p class="h3 text-center">
                    ${blogTitle}
                    </p>

                    <p class="h6 text-center text-uppercase font-italic font-weight-light">
                        [ ${blogTags} ]
                    </p>
                    
                    <hr>

                    <p class="text-right font-italic font-weight-light" id="datePosted">
                        ${splitDate(place.datePosted)}
                    </p>

                    <p class="text-left">
                        ${author}
                    </p>

                </div>
            </a>`;



            // NOTE : Now map returns an array and we need one single string, so we do `.join('')`
        }).join('');

        suggestions.innerHTML = html;

    }

    searchInput.addEventListener('change', displayMatches); // only fires when we are outside the container
    searchInput.addEventListener('keyup', displayMatches);
    // searchInput.addEventListener('keydown', displayMatches);

})
