document.addEventListener("DOMContentLoaded", e => {
  const qwerty = document.getElementById("qwerty");
  const phrase = document.getElementById("phrase");
  let missed = 0;

  const btnReset = document.querySelector(".btn__reset");

  btnReset.addEventListener("click", e => {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
  });

  const phrases = [
    "Cat got your tongue",
    "What goes around comes around",
    "What did Yoshi say to the programmer Enum",
    "Link open your eyes",
    "My toes are pristine"
  ];

  console.log(phrases[1].split("", phrases[1].length));

  function getRandomPhraseAsArray(arr) {
    let random = Math.random() * (arr.length - 0) + 0;
    let returnedArray = arr[random];
    returnedArray = returnedArray.split("", 20);
    console.log(returnedArray);
    return returnedArray;
  }
  const phraseArray = getRandomPhraseAsArray(phrases);

  function addPhraseToDisplay(arr) {
    // do stuff any arr that is passed in, and add to `#phrase ul`
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement("li");
      arr.firstElementChild = arr[i];
      let array = "<li>" + arr[i] + "</li>";
      return array;
    }
  }

  addPhraseToDisplay(phraseArray);
  console.log(phraseArray);
});
