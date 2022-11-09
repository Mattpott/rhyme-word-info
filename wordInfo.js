const query = "hello";

function sizeTheWords() {
  const variableSizeResults = document.querySelectorAll(".result.imperfect");
  variableSizeResults.forEach((result) => {
    const resultScore = parseInt(result.dataset.score, 10);
    result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
  });
}

// assuming you already have rhyme results somewhere, for each of the first 10 results, query the word info api for the rhyming words' info and display them in a dl with that rhyming word

async function begin() {
  const rhymeResults = await fetch("example-rhyme-results.json");
  const rhymeResultsJson = await rhymeResults.json();
  console.log(rhymeResultsJson);
  const rhymeResultsElems = rhymeResultsJson.map((rhymeWord) => {
    const resultElem = document.createElement("div");
    resultElem.classList.add("result");
    if (rhymeWord.score >= 300) {
      resultElem.classList.add("perfect");
    } else {
      resultElem.classList.add("imperfect");
    }
    resultElem.dataset.score = rhymeWord.score;
    // resultElem.innerText = rhymeWord.word;
    resultElem.append(rhymeWord.word);
    return resultElem;
  });
  const resultsContainer = document.getElementById("results");
  // console.log(Array.from(resultsContainer.childNodes));
  Array.from(resultsContainer.childNodes).forEach((child) => {
    child.remove();
  });
  resultsContainer.append(...rhymeResultsElems);
  sizeTheWords();
}
begin();