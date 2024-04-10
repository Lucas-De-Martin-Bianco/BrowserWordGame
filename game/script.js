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