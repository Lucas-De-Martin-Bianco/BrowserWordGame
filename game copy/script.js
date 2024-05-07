document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  var settingsbar = document.getElementById("settingsbar");
  var toggleButton = document.getElementById("settingsbarCollapse");

  // Toggle settingsbar on button click
  toggleButton.addEventListener("click", function () {
      if (settingsbar.classList.contains("active")) {
          settingsbar.classList.remove("active");
      } else {
          settingsbar.classList.add("active");
      }
  });
});
// check for enter key
function handleKeyPress(event) {
  if (event.keyCode === 13) {
      checkWord();
  }
}

function checkWord() {
  var word = document.getElementById('wordinput').value;
  if (word.length > 0) {
          document.getElementById('wordinput').value = '';
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
      document.getElementById("scorecount").textContent = parseInt(document.getElementById("scorecount").textContent) + 1
  } 
  else {
          document.getElementById('bomb').src = 'bomb_explode.png';
          setTimeout(function() {
          document.getElementById('bomb').src = 'bomb_ticking.png';
          }, 2000);
          document.getElementById("scorecount").textContent = 0
  }
}

  // Get the button elements
  const startbuttonhide = document.getElementById('startbutton');

  // Add click event listener to the control button
  startbuttonhide.addEventListener('click', () => {
      startbuttonhide.style.display = 'none'; // Hide the button
  });
