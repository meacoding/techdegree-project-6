document.addEventListener("DOMContentLoaded", e => {
  const qwerty = document.getElementById("qwerty");
  const phrase = document.getElementById("phrase");
  const btnReset = document.querySelector(".btn__reset");
  let missed = 0;
  let letterFound;
  let usedLetters = [];
  const overlay = document.getElementById("overlay");
  const p = document.createElement("p");
  overlay.insertBefore(p, btnReset);

  const phrases = [
    "Time is money friend",
    "May the stars guide you",
    "Daylights burning",
    "Keep your feet on the ground",
    "My toes are pristine"
  ];

  function getRandomPhraseAsArray(arr) {
    let random = Math.floor(Math.random() * (arr.length - 0)) + 0;
    let returnedArray = arr[random].split("", arr[random].length);
    return returnedArray;
  }

  function isLetter(char) {
    let character = char.textContent;
    if (character === " ") {
      char.className = "space";
    } else {
      char.className = "letter";
    }
  }

  function addPhraseToDisplay(arr) {
    let ul = document.getElementById("phrase").firstElementChild;
    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement("li");
      li.textContent = arr[i];
      isLetter(li);
      ul.appendChild(li);
    }
  }
  function reset() {
    const overlay = document.getElementById("overlay");
    btnReset.textContent = "Reset";
    overlay.style.display = "none";

    let list = document.getElementById("phrase").firstElementChild;
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }

    const tries = document.getElementsByClassName("tries");

    for (let i = missed - 1; i >= 0; i--) {
      let img = tries[i].children[0];
      img.style.display = "inline-block";
      missed = 0;
    }

    const buttonQuery = document.querySelectorAll("button");

    for (let i = 0; i < buttonQuery.length; i++) {
      buttonQuery[i].className = "";
      buttonQuery[i].disabled = false;
    }

    usedLetters = [];
  }

  function checkLetter(buttonPressed) {
    const classLetter = document.getElementsByClassName("letter");
    let count = 0;
    for (let i = 0; i < classLetter.length; i++) {
      if (buttonPressed === classLetter[i].textContent.toLowerCase()) {
        classLetter[i].className = "show letter";
        letterFound = buttonPressed;
        count++;
      }
    }
    if (count === 0) {
      letterFound = null;
    }
  }

  function missedGuess() {
    let tries = document.getElementsByClassName("tries");
    let img = tries[missed].children[0];
    if (letterFound === null) {
      img.style.display = "none";
      missed++;
    }
  }

  function checkWin() {
    const show = document.getElementsByClassName("show");
    const letter = document.getElementsByClassName("letter");

    if (missed < 5 && show.length === letter.length) {
      overlay.style.display = "flex";
      overlay.className = "win";
      p.textContent = "You win!";
    } else if (missed >= 5) {
      overlay.style.display = "flex";
      overlay.className = "lose";
      p.textContent = "You lose!";
    }
  }

  btnReset.addEventListener("click", e => {
    reset();
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  });

  document.addEventListener("click", e => {
    let button = e.target;
    button.disabled = true;
    if (button.tagName === "BUTTON") {
      button.className = "chosen";
      button = button.textContent.toLowerCase();
      console.log(button);
      usedLetters.push(button.toUpperCase().charCodeAt(0));

      console.log(usedLetters);
      checkLetter(button);
      missedGuess();
      checkWin();
    }
  });

  document.addEventListener("keyup", e => {
    let key = e.which;
    if (key >= 65 && key <= 90 && !usedLetters.includes(key)) {
      usedLetters.push(key);

      console.log(usedLetters);

      const button = e.key.toLowerCase();
      const buttonQuery = document.querySelectorAll("button");

      for (let i = 0; i < buttonQuery.length; i++) {
        if (button === buttonQuery[i].textContent) {
          buttonQuery[i].className = "chosen";
          buttonQuery[i].disabled = true;
        }
      }

      checkLetter(button);
      missedGuess();
      checkWin();
    } else {
      e.preventDefault();
    }
  });
});
