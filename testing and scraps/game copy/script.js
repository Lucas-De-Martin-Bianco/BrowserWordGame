        //settingsbar
        document.addEventListener("DOMContentLoaded", function () {
          // Get elements
          var settingsbar = document.getElementById("settingsbar");
          var toggleSettingsbar = document.getElementById("settingsbarCollapse");
          // Toggle settingsbar on button click
          toggleSettingsbar.addEventListener("click", function () {
              if (settingsbar.classList.contains("active")) {
                  settingsbar.classList.remove("active");
              } else {
                  settingsbar.classList.add("active");
              }
          });
      });

      // check for enter key and after check word
      function handleKeyPress(event) {
          if (event.keyCode === 13) {
              let wordInput = document.getElementById('wordInput');
              checkForInclusion();
          }
      }
      
      //check for if word includes task
      function checkWord() {
          var word = document.getElementById('wordInput').value;
          if (word.length > 0) {
                  document.getElementById('wordInput').value = '';
                  searching(word);
          }
      }
      function searching(word) {
          let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          fetch(url)
          .then((response) => response.json())
          .then((result) => checkingword(result,word))
      }
      function checkingword(result,word) {
          if (result[0] && result[0].hasOwnProperty('word') && result[0].phonetics.length !== 0) {
              resetTimer()
              generateRandomLetters()
              var wrongbuzzer = new Audio('coin_1.mp3');
              wrongbuzzer.play();
              document.getElementById("scorecount").textContent = parseInt(document.getElementById("scorecount").textContent) + 1
          } 
          else {
              var wrongbuzzer = new Audio('wronganswer.mp3');
              wrongbuzzer.play();
              wordInput.value = '';
          }
      }
      function sethealthbar() {
          var v_healthbar = document.getElementById("v_healthbar");
          var v_healthbar_text = v_healthbar.innerHTML;
          v_healthbar.innerHTML = v_healthbar_text.substring(0, 4) + i_healthbar + v_healthbar_text.substring(5);
      }

      //gameplay logic
      document.addEventListener('DOMContentLoaded', function() {
          // Get the button elements
          const wordInput = document.getElementById('wordInput');
          const startButton = document.getElementById('startButton');
          // Add click event listener to the start button
          startButton.addEventListener('click', () => {
              startButton.style.display = 'none';
              document.getElementById("scorecount").textContent = 0;
              generateRandomLetters()
              document.getElementById('randomLetters').style.display = 'block';
              i_healthbar = document.getElementById("life_select").value
              sethealthbar();
              document.getElementById('wordInput').disabled = false;
              wordInput.value = '';
              wordInput.focus();
              //disable settings menu
              if (settingsbar.classList.contains("active")) {
                  settingsbar.classList.remove("active");
              }
              document.getElementById("settingsbarCollapse").disabled = true;
              wordInput.focus(); //focus the textinput
              //change png
              document.getElementById('bomb').src = 'bomb_ticking.png';
              resetTimer()
          });
      });

      let countdown;
      const fuseTimeInput = document.getElementById('fuseTime');

      function resetTimer() {
          clearInterval(countdown); // Stop the current countdown
          let seconds = parseFloat(fuseTimeInput.value) + 0.25; // Get the new value and add 0.5
          countdown = setInterval(function() {
              seconds--;
              if (seconds >= 1) {
                  console.log(seconds);
              } else {
                  if (i_healthbar > 1) {
                      i_healthbar = i_healthbar -1
                      var wrongbuzzer = new Audio('minecraft_hit_soundmp3converter.mp3');
                      wrongbuzzer.play();
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
                      var explosion = new Audio('explosion.mp3');
                      explosion.play();
                      document.getElementById('bomb').src = 'bomb_explode.png';
                      document.getElementById('randomLetters').style.display = 'none'
                      document.getElementById("settingsbarCollapse").disabled = false;
                      setTimeout(function() {
                          document.getElementById('bomb').src = 'bomb_ticking.png';
                          startButton.style.display = 'block';
                      }, 2000);
                  }   
              }
          }, 1000);
      }

      function generateRandomLetters() {
          if (document.getElementById("level_select").value == 2) {
          // Array of all letters
          var letters = 'abcdefghijklmnopqrstuvwxyz';
          // Generate random indexes
          var index1 = Math.floor(Math.random() * letters.length);
          var index2 = Math.floor(Math.random() * letters.length);
          // Get random letters
          var letter1 = letters.charAt(index1);
          var letter2 = letters.charAt(index2);
          // Display random letters
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
      function checkForInclusion() {
          // Get the input word
          var word = document.getElementById("wordInput").value;
          if (word.includes(document.getElementById("randomLetters").innerHTML)) {
              checkWord();
          } else {
              var wrongbuzzer = new Audio('wronganswer.mp3');
              wrongbuzzer.play();
              wordInput.value = '';
          }
      }

// Function to save highscores to local storage
  // Function to save highscores to local storage
  function saveHighscores(highscores) {
      // Serialize the highscores data
      var serializedHighscores = JSON.stringify(highscores);
      
      // Save to local storage
      localStorage.setItem('highscores', serializedHighscores);
  }

  // Function to retrieve highscores from local storage
  function getHighscores() {
      // Retrieve highscores data from local storage
      var serializedHighscores = localStorage.getItem('highscores');
      
      // Deserialize the highscores data
      var highscores = JSON.parse(serializedHighscores);
      
      // Return the highscores
      return highscores;
  }

  // Function to update the highscores list in the HTML
  function updateHighscoresHTML() {
      // Retrieve highscores from local storage
      var highscores = getHighscores() || [];

      // Select the <ul> element to populate with highscores
      var highscoreList = document.getElementById('highscoreList');

      // Clear existing content
      highscoreList.innerHTML = '';

      // Loop through highscores and add them to the list
      highscores.forEach(function(score, index) {
          // Create a new list item element
          var listItem = document.createElement('li');
          listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
          
          // Set the content of the list item
          listItem.textContent = `Streak: ${score}`;

          // Append the list item to the highscore list
          highscoreList.appendChild(listItem);
      });
  }
  function saveOrUpdateHighscores(newHighscores) {
  // Retrieve existing highscores from local storage
  var existingHighscores = getHighscores() || [];

  // Combine existing highscores with the new ones
  var updatedHighscores = existingHighscores.concat(newHighscores);

  // Sort the highscores in descending order
  updatedHighscores.sort((a, b) => b - a);

  // Take only the top 5 highscores
  updatedHighscores = updatedHighscores.slice(0, 5);

  // Save updated highscores to local storage
  saveHighscores(updatedHighscores);
}

  // Initial update of highscores list when the page loads
  updateHighscoresHTML();