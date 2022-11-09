// get relevant dom elements
const queryInputElem = document.getElementById('query');

const form = document.getElementById('rhyme-form');

form.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

// write function that searches the rhyme API given a (string) query (likely you should use the fetch API)
// add event listener to know when to search
queryInputElem.addEventListener('keyup', async function (ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter')
    const rhymeResultsResp = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`);
    console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();
    console.log(rhymeResults);
    displayRhymes(rhymeResults);
  }
});

// write function that:
//  1. expects array of word object results
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page
function displayRhymes(rhymeResults) {
  const resultsContainer = document.getElementById('results');
  while (resultsContainer.hasChildNodes()) {
    resultsContainer.removeChild(resultsContainer.lastChild);
  }
  const rhymeResultsTerms = rhymeResults.map((rhymeWord) => {
    const resultElem = document.createElement("dt");
    resultElem.classList.add("result");
    resultElem.style.fontSize = `${scaleFontSize(rhymeWord.score)}px`;
    resultElem.dataset.score = rhymeWord.score;
    resultElem.innerText = rhymeWord.word;
    resultElem.style.padding = "0.5rem";
    resultElem.style.display = "inline-block";
    return resultElem;
  });

  for (let i = 0; i < 10; i++) {
    const wordInfoPromise = createWordInfo(rhymeResultsTerms[i].innerText);
    wordInfoPromise.then((wordInfo) => {
      console.log("WordInfo", i, wordInfo);
      rhymeResultsTerms[i].append(...wordInfo);
    });
  }

  const rhymeResultsList = document.createElement("dl");
  rhymeResultsTerms.forEach(term => {
    rhymeResultsList.appendChild(term);
  });
  resultsContainer.append(rhymeResultsList);
}

async function createWordInfo(wordQuery) {
  const wordInfoResp = await fetch(
    `https://rhymebrain.com/talk?function=getWordInfo&word=${wordQuery}`);
  const wordInfo = await wordInfoResp.json();
  const wordDetails = [];
  const pron = document.createElement("dd");
  pron.innerText = `Arphabet Pronunciation: ${wordInfo.pron}`;
  wordDetails.push(pron);
  const ipa = document.createElement("dd");
  ipa.innerText = `IPA Transcription: ${wordInfo.ipa}`;
  wordDetails.push(ipa);
  const freq = document.createElement("dd");
  freq.innerText = `Frequency: ${wordInfo.freq}`;
  wordDetails.push(freq);
  const flags = document.createElement("dd");
  flags.innerText = `Flags: ${wordInfo.flags}`;
  wordDetails.push(flags);
  return wordDetails;
}

function scaleFontSize(score) {
  return 50 * (score / 300);
}