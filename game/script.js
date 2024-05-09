//settingsbar
//adds and removes active class
document.addEventListener("DOMContentLoaded", function () {
  var settingsbar = document.getElementById("settingsbar");
  var toggleSettingsbar = document.getElementById("settingsbarToggle");
  toggleSettingsbar.addEventListener("click", function () {
      if (settingsbar.classList.contains("active")) {
          settingsbar.classList.remove("active");
      } else {
          settingsbar.classList.add("active");
      }
  });
});

//check input
//check for enter key
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        checkForInclusion();
    }
}
//check if input contains "task" (the 2 random letters)
function checkForInclusion() {
    var word = document.getElementById("wordInput").value;
    if (i_healthbar >= 1) { //because searching the word takes time and this delay can cause scoring to bug out
        if (word.includes(document.getElementById("randomLetters").innerHTML)) {
            searching(word);
        } else {
            new Audio('wronganswer.mp3').play();
        }
    }
    wordInput.value = '';
}
//access the dictionary api
//-small note the dictionary doesn't recognize slang or modern words
function searching(word) {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url)
    .then((response) => response.json())
    .then((result) => checkingword(result,word))
}
//checks if the result is actually a word
function checkingword(result,word) {
    if (result[0] && result[0].hasOwnProperty('word') && result[0].phonetics.length !== 0) {
        resetTimer()
        generateRandomLetters()
        new Audio('coin_1.mp3').play();
        document.getElementById("scorecount").textContent = parseInt(document.getElementById("scorecount").textContent) + 1
    } 
    else {
        new Audio('wronganswer.mp3').play();
    }
}

//gameplay logic
document.addEventListener('DOMContentLoaded', function() {
    const wordInput = document.getElementById('wordInput');
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => { //waits for start button to be pressed
        startButton.style.display = 'none'; //hides start button
        document.getElementById("scorecount").textContent = 0;
        generateRandomLetters()
        document.getElementById('randomLetters').style.display = 'block'; //show task
        i_healthbar = document.getElementById("life_select").value //set internal value for health
        sethealthbar();
        wordInput.value = '';
        wordInput.focus();
        //disable settings menu
        if (settingsbar.classList.contains("active")) {
            settingsbar.classList.remove("active");
        }
        document.getElementById("settingsbarToggle").disabled = true;
        //change png
        document.getElementById('bomb').src = 'bomb_ticking.png';
        resetTimer() //start timer
    });
});

function sethealthbar() {
    var v_healthbar = document.getElementById("v_healthbar");
    v_healthbar.innerHTML = v_healthbar.innerHTML.substring(0,4) + i_healthbar
}

let countdown;
const fuseTimeInput = document.getElementById('fuseTime');

function resetTimer() {
    clearInterval(countdown); // Stop the current countdown
    let seconds = parseFloat(fuseTimeInput.value);
    countdown = setInterval(function() {
        seconds--;  //-1 each iteration
        if (seconds >= 1) {
            console.log(seconds);
        } else {
            if (i_healthbar > 1) {
                i_healthbar = i_healthbar -1
                new Audio('minecraft_hit_soundmp3converter.mp3').play();
                sethealthbar()
                generateRandomLetters()
                resetTimer()
            } else {
                document.getElementById('wordInput').disabled = true;
                i_healthbar = i_healthbar -1
                sethealthbar()
                clearInterval(countdown);
                //console.log("timer done");
                // Disable the input field
                // Clear the input field's value
                document.getElementById('wordInput').value = '';
                saveOrUpdateHighscores(document.getElementById("scorecount").textContent)
                console.log("Score: ",document.getElementById("scorecount").textContent)
                new Audio('explosion.mp3').play();
                document.getElementById('bomb').src = 'bomb_explode.png';
                document.getElementById('randomLetters').style.display = 'none';
                document.getElementById("settingsbarToggle").disabled = false;
                updateHighscoresList();
                setTimeout(function() {
                    document.getElementById('bomb').src = 'bomb_ticking.png';
                    startButton.style.display = 'block';
                    document.getElementById('wordInput').disabled = false;
                }, 2000);
            }   
        }
    }, 1000);
}

function generateRandomLetters() {
    if (document.getElementById("level_select").value == 2) {
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var index1 = Math.floor(Math.random() * letters.length);
    var index2 = Math.floor(Math.random() * letters.length);
    var letter1 = letters.charAt(index1);
    var letter2 = letters.charAt(index2);
    document.getElementById("randomLetters").innerHTML =letter1 + letter2;
    } else {
        var letters = 'abcdefghijklmnoprstuvwxyz'
        var vowels = "aeiou"
        var index1 = Math.floor(Math.random() * letters.length);
        var index2 = Math.floor(Math.random() * vowels.length);
        var letter1 = letters.charAt(index1);
        var vowel2 = vowels.charAt(index2);
        const e_taskorder = Math.random()
        if (e_taskorder == 0) {
            document.getElementById("randomLetters").innerHTML =letter1 + vowel2;
        } else {
            document.getElementById("randomLetters").innerHTML =vowel2 + letter1;
        }
    }
}

//save cache and update highscore-board
function saveOrUpdateHighscores(newHighscores) {
    var existingHighscores = getHighscores() || []; //avoid error on null value
    var updatedHighscores = existingHighscores.concat(newHighscores);
    updatedHighscores.sort((a, b) => b - a); //sort descending order
    updatedHighscores = updatedHighscores.slice(0, 5); //take only top 5
    saveHighscores(updatedHighscores);
}
function getHighscores() {
    var savedHighscores = localStorage.getItem('highscores');
    var highscores = JSON.parse(savedHighscores);
    return highscores;
}
function saveHighscores(highscores) {
    var serializedHighscores = JSON.stringify(highscores);
    localStorage.setItem('highscores', serializedHighscores);
}
function updateHighscoresList() {
    var highscores = getHighscores() || [];
    var highscoreList = document.getElementById('highscoreList');
    highscoreList.innerHTML = '';
    //--with help from chat-gpt--
    highscores.forEach(function(score, index) {
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `Streak: ${score}`;
        highscoreList.appendChild(listItem);
    //--with help from chat-gpt--
    });
}
// update on page load
updateHighscoresList();