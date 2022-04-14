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
            } else {
                output.textContent = `No lyrics found for the requested data`
            }
            loading.style.opacity = "0";

            document.querySelector('.lyrics-output').style.opacity = "1";
        });

        function animateText(output) {
            let text = output.value;
            let to = text.length,
              from = 0;

            animate({
              duration: 5000,
              timing: bounce,
              draw: function(progress) {
                let result = (to - from) * progress + from;
                output.value = text.substr(0, Math.ceil(result))
              }
            });
          }


          function bounce(timeFraction) {
            for (let a = 0, b = 1; 1; a += b, b /= 2) {
              if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
              }
            }
          }
    }
});



