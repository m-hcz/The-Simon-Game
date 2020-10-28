$(document).ready(function() {
  var x = 0;

  var arrayLetters = [];
  var level = 1;

  $(document).keypress(function() {
    x = 0;
    level = 1;
    arrayLetters = [];
    setLevel(level);
    arrayLetters.push(randomLetter());
    setTimeout(function() {
    btnSoundHighlight(arrayLetters[0]);
  }, 500);
  });

  $("button").click(function() {
    if (arrayLetters.length !== 0) {
      if (arrayLetters[x] === this.classList[0]) {
        btnSoundHighlight(this.classList[0]);
        x++;
        if (x == arrayLetters.length) {
          setTimeout(function() {
            arrayLetters.push(randomLetter());
            btnSoundHighlight(arrayLetters[arrayLetters.length - 1]);
            setLevel(++level);
          }, 1000);
          x = 0;
        }
      } else {
        btnSoundHighlight();
        $(document).fadeOut(100).fadeIn(100);
        arrayLetters = [];
      }
    }
  });


  // document
});

function setLevel(level) {
  $("h1").text("Level " + level);
}

function resetGame() {
  $("h1").text("Press A Key to Start");
}


function randomLetter() {
  var randomFirst = Math.floor(Math.random() * 4 + 1);
  var firstLetter = "";
  if (randomFirst === 1)
    firstLetter = "g";
  if (randomFirst === 2)
    firstLetter = "r";
  if (randomFirst === 3)
    firstLetter = "y";
  if (randomFirst === 4)
    firstLetter = "b";
  return firstLetter;
}



function btnSoundHighlight(key) {
  $("#" + key).fadeOut(100).fadeIn(100);
  switch (key) {
    case "g":
      var audio = new Audio("sounds/green.mp3");
      break;
    case "r":
      var audio = new Audio("sounds/red.mp3");
      break;
    case "y":
      var audio = new Audio("sounds/yellow.mp3");
      break;
    case "b":
      var audio = new Audio("sounds/blue.mp3");
      break;
    default:
      var audio = new Audio("sounds/wrong.mp3");
      $("body").addClass("colorWrong");
      setTimeout(function() {
        $("body").removeClass("colorWrong");
        resetGame();

      }, 500);
      break;
  }
  audio.volume = 0.1;
  audio.play();
}
