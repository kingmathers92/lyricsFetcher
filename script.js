console.log('working!');
//Get elements from the DOM
const artistInput = document.querySelector('#artistName');
const songInput = document.querySelector('#songName');
const form = document.querySelector('#lyricsForm');
const output = document.querySelector('.lyrics-output pre');
const btn = document.querySelector('.fetchBtn');
const loading = document.querySelector('.loading');

//Add click event to the btn
btn.addEventListener('click', () => {
    //Check if the input fields value aren't empty
    if(artistInput.value !== "" && songInput.value !== "") {
        //Loading div appear
        loading.style.opacity = "1";
        /*Fetch teh API data using
        the artist's and song name
        from teh input*/
        fetch(
            `https://api.lyrics.ovh/v1/
            ${artistInput.value}/${songInput.value}`
        )
        /*Take the fetched data wich is in JSON format
        and convert it into JS obejct*/
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.lyrics !== undefined) {
                output.textContent = data.lyrics;
                artistInput.value = "";
                songInput.value = "";
            } else {
                output.textContent = `No lyrics found for the requested data`
            }
            loading.style.opacity = "0";

            document.querySelector('.lyrics-output').style.opacity = "1";
        });
    }
});



