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
    "Cat got your tongue?",
    "what goes around comes around.",
    "What did Yoshi say to the programmer? Enum!",
    "Link, open your eyes.",
    "My toes are pristine!"
  ];

  function getRandomPhraseAsArray(arr) {
    let random = Math.floor(Math.random() * (arr.length - 0)) + 0;
    let returnedArray = arr[random].split("", arr[random].length);
    return returnedArray;
  }
  const phraseArray = getRandomPhraseAsArray(phrases);

  function isLetter (char){
    let character = char.textContent;
    if (character === ' ') {
      char.className = 'space';
    } else if (character === '.' || 
               character === ',' || 
               character === '!' || 
               character === '?') 
               {
      char.className = 'punctuation';
    } else {
      char.className = 'letter';
    }
  }

  function addPhraseToDisplay(arr) {
    let ul = document.getElementById('phrase').firstElementChild;
    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement("li");
      li.textContent = arr[i];
      isLetter(li);
      ul.appendChild(li);
    }
  }

  addPhraseToDisplay(phraseArray);

  function checkLetter(buttonPressed, letterArray) {
    // if (buttonPressed.tagName === 'BUTTON') {
      for (let i = 0; i < letterArray.length; i++) {
        if (buttonPressed ===  letterArray[i].textContent.toLowerCase()) {
        letterArray[i].className = 'show letter';
        }
      } 
    // }  
  }

  document.addEventListener('click', e => {
    const classLetter = document.getElementsByClassName('letter');
    let button = e.target;
    if (button.tagName === 'BUTTON') {
      button = button.textContent.toLowerCase();
      checkLetter(button, classLetter);
    }
  });

  document.addEventListener('keyup', e => {
    const classLetter = document.getElementsByClassName('letter');
    const button = e.key;
    checkLetter(button, classLetter);
  });
  
});

