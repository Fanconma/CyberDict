window.addEventListener('DOMContentLoaded', (event) => {
    // We include the fetch API which returns a Promise
    fetch('./words.json')
    .then(response => response.json())
    .then(data => {
        // Attach event listener to input
        let input = document.getElementById('search');
        let result = document.getElementById('result');
        let searchBtn = document.getElementById('search-btn');
        let randomBtn = document.getElementById('random-btn');

        searchBtn.addEventListener('click', function(){
            let value = input.value;
            // The value you search for is in the object keys
            if(value && data[value]){
                result.innerHTML = `<p>${data[value]}</p>`;
                suggestWords(data, value);
            } else {
                result.innerHTML = '';
                clearSuggestions();
            }
        });

        randomBtn.addEventListener('click', function(){
            let keys = Object.keys(data);
            let randomWord = keys[Math.floor(Math.random() * keys.length)];
            result.innerHTML = `<p>${data[randomWord]}</p>`;
            suggestWords(data, randomWord);
        });

        function suggestWords(data, value) {
            let suggestedWordsContainer = document.getElementById('suggested-words');
            clearSuggestions();
            let suggestedWordsArray = Object.keys(data).filter(word => word !== value && word.includes(value));
            suggestedWordsArray.slice(0, 5).forEach((word) => {
                let li = document.createElement('li');
                li.textContent = word;
                suggestedWordsContainer.appendChild(li);
            });
        }

        function clearSuggestions() {
            let suggestedWordsContainer = document.getElementById('suggested-words');
            while (suggestedWordsContainer.firstChild) {
                suggestedWordsContainer.removeChild(suggestedWordsContainer.firstChild);
            }
        }
    });
});
