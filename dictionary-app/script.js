let form = document.querySelector("form");
let resultDiv = document.querySelector(".result-div");

// if form is submitted, NOT button is clicked
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    resultDiv.innerHTML = "Fetching Data...";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    let definitionsLine = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
  <h2><strong>Word: </strong>${data[0].word}</h2>
  <p class = "partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
  <p><strong id = "meaning">Meaning: </strong>${
    definitionsLine.definition === undefined
      ? "Not Found"
      : definitionsLine.definition
  }</p>
  <p><strong>Example: </strong>${
    definitionsLine.example === undefined
      ? "Not Found"
      : definitionsLine.example
  }</p>
    <p><strong>Antonyms: </strong></p>
  
    `;

    // fetching antonyms
    if (definitionsLine.antonyms.length === 0) {
      resultDiv.innerHTML += `<span id="notFound">Not Found</span>`;
    } else {
      for (let i = 0; i < definitionsLine.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitionsLine.antonyms[i]}</li>`;
      }
    }
    // fetching synonyms
    resultDiv.innerHTML += `<p><strong>Synonyms: </strong></p>`;
    if (definitionsLine.synonyms.length === 0) {
      resultDiv.innerHTML += `<span id="notFound">Not Found</span>`;
    } else {
      for (let i = 0; i < definitionsLine.synonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitionsLine.synonyms[i]}</li>`;
      }
    }

    //adding read more button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target = _blank>Read More</a></div>`;
  } catch (error) {
    resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
  }
};