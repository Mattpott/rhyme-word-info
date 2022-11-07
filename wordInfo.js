const query = "hello";

const variableSizeResults = document.querySelectorAll(".result.imperfect");
variableSizeResults.forEach((result) => {
  const resultScore = parseInt(result.dataset.score, 10);
  result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
});

// assuming you already have rhyme results somewhere, for each of the first 10 results, query the word info api for the rhyming words' info and display them in a dl with that rhyming word

async function begin() {
  const rhymeResults = await fetch("example-rhyme-results.json");
  const rhymeResultsJson = await rhymeResults.json();
  console.log(rhymeResultsJson);
  let i = 0;
  const firstTen = rhymeResultsJson.map((elem) => {
    if (i < 10) {
      i++;
      return elem.word;
    }
  });
  console.log(firstTen);

  // for (let i = 0; i < 10; i++) {
  //   const cur = rhymeResultsJson.
  //   wordDesc.push(await fetch(
  //     // may need to replace with a JSON
  //     `https://rhymebrain.com/talk?function=getWordInfo&word=${cur}`));
  // }
}
begin();