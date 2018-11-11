/*jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", e => {
  const overlay = document.getElementById("overlay");
  const phrase = document.getElementById("phrase");
  const ul = phrase.firstElementChild;
  const btnReset = document.querySelector(".btn__reset");
  // const qwerty = document.getElementById("qwerty");
  const buttons = document.querySelectorAll("button");
  const tries = document.getElementsByClassName("tries");
  const p = document.createElement("p");
  let missed = 0;
  let letterFound;
  let usedLetters = [];
  let number;

  const phrases = [
    "Time is money friend",
    "May the stars guide you",
    "Daylights burning",
    "Keep your feet on the ground",
    "My toes are pristine"
  ];

  const actions = {
    getRandomPhraseAsArray: arr => {
      let random = Math.floor(Math.random() * (arr.length - 0)) + 0;
      let returnedArray = arr[random].split("", arr[random].length);
      return returnedArray;
    },

    isLetter: char => {
      let character = char.textContent;
      if (character === " ") {
        char.className = "space";
      } else {
        char.className = "letter";
      }
    },

    addPhraseToDisplay: arr => {
      for (let i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        li.textContent = arr[i];
        actions.isLetter(li);
        ul.appendChild(li);
      }
    },

    reset: () => {
      usedLetters = [];
      btnReset.textContent = "Reset";
      overlay.style.display = "none";

      for (let i = missed - 1; i >= 0; i--) {
        let img = tries[i].children[0];
        img.style.display = "inline-block";
        missed = 0;
      }

      while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
      }

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = "";
        buttons[i].disabled = false;
      }
    },

    checkLetter: buttonPressed => {
      const classLetter = document.getElementsByClassName("letter");
      let count = 0;
      let i;
      for (i = 0; i < classLetter.length; i++) {
        if (buttonPressed === classLetter[i].textContent.toLowerCase()) {
          classLetter[i].className += " show";
          letterFound = buttonPressed;
          count++;
        }
      }
      if (count === 0) {
        letterFound = null;
      }
    },

    missedGuess: btnPressed => {
      let img = tries[missed].children[0];
      if (letterFound === null) {
        img.style.display = "none";
        btnPressed.className += " wrong";
        missed++;
      }
    },

    checkWin: () => {
      const show = document.getElementsByClassName("show");
      const letter = document.getElementsByClassName("letter");
      const youWinLose = status => {
        overlay.className = `${status}`;
        p.textContent = `You ${status}!`;
        overlay.style.display = "flex";
      };

      if (missed < 5 && show.length === letter.length) {
        usedLetters = [
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90
        ];
        const disableButtons = () => {
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            buttons[i].className = "chosen";
          }
        };

        disableButtons();
        setTimeout(() => {
          youWinLose("win");
        }, 5000);
      } else if (missed >= 5) {
        youWinLose("lose");
      }
    }
  };

  overlay.insertBefore(p, btnReset);

  btnReset.addEventListener("click", e => {
    actions.reset();
    actions.addPhraseToDisplay(actions.getRandomPhraseAsArray(phrases));
  });

  document.addEventListener("click", e => {
    const btn = e.target;
    let button = e.target;
    if (button.tagName === "BUTTON") {
      button.disabled = true;
      button.className = "chosen";
      button = button.textContent.toLowerCase();
      usedLetters.push(button.toUpperCase().charCodeAt(0));
      actions.checkLetter(button);
      actions.missedGuess(btn);
      actions.checkWin();
    }
  });

  document.addEventListener("keyup", e => {
    let key = e.which;
    const button = e.key.toLowerCase();
    if (key >= 65 && key <= 90 && !usedLetters.includes(key)) {
      usedLetters.push(key);

      for (let i = 0; i < buttons.length; i++) {
        if (button === buttons[i].textContent) {
          buttons[i].className = "chosen";
          buttons[i].disabled = true;
          number = i;
        }
      }
      actions.checkLetter(button);
      actions.missedGuess(buttons[number]);
      actions.checkWin();
    }
  });
});
