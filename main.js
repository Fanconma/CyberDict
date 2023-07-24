let words = [];

fetch('words.json')
    .then(response => response.json())
    .then(data => words = data)
    .catch(error => console.error('Error:', error));

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchWord = document.getElementById('search-input').value.toLowerCase();
    const resultElement = document.getElementById('results');
    const foundWord = words.find(word => word.word === searchWord);

    if (foundWord) {
        resultElement.innerText = "Word: " + foundWord.word + "\nDefinition: " + foundWord.definition;
    } else {
        resultElement.innerText = "Word not found.";
    }
});

document.getElementById('random-btn').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    document.getElementById('results').innerText = "Random Word: " + word.word + "\nDefinition: " + word.definition;
});
