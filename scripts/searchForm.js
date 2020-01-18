$(() => {

    function splitDate(data) {
        if (data) {

            console.log("This is the Date - ", data)
            const newDate = new Date(data);
            return newDate.toDateString().substr(3);
        }
    };

    let search = $('#search');
    let original = $('#original');

    search.focus(() => {
        original.hide();
    })

    console.log("JQUERY here -");
    console.log("clientArray - ", clientArray);

    /* Defining, Match function  */
    function findMatches(wordToMatch, Array) {
        return Array.filter((arrayItem) => {

            const regex = new RegExp(wordToMatch, 'gi')
            return arrayItem.author.match(regex) || arrayItem.blogTitle.match(regex) || arrayItem.blogTags.match(regex);

        })
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.getElementById('suggestions');

    function displayMatches() {

        original.hide();

        // this        //- Element
        // this.value  //- Field Value

        // console.log("Field Value - ", this.value);
        if (this.value == "") {
            console.log("EMPTY");
            suggestions.innerHTML = " ";
            // console.log("ABHI KYA VALUE HAI - ", suggestions.innerHTML)
            // original.toggleClass("d-none")
            original.show();
            return;
        }

        const matchArray = findMatches(this.value, clientArray);

        // using Array map
        const html = matchArray.map((place) => {

            const regex = new RegExp(this.value, 'gi');

            const author = place.author.replace(regex, `<span class=hl>${this.value}</span>`);
            const blogTitle = place.blogTitle.replace(regex, `<span class=hl>${this.value}</span>`);
            const blogTags = place.blogTags.replace(regex, `<span class=hl>${this.value}</span>`);

            return `
            <a href="/dashboard/?blogId=${place._id}" class="blogLinks">
                <div class="p-3 m-1 cardEff">

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

    searchInput.addEventListener('change', displayMatches);
    // Now this only fires when we are outside the container
    // So we will also use Keyup
    searchInput.addEventListener('keyup', displayMatches);

})
