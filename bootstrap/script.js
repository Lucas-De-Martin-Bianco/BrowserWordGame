document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    var sidebar = document.getElementById("sidebar");
    var toggleButton = document.getElementById("sidebarCollapse");

    // Toggle sidebar on button click
    toggleButton.addEventListener("click", function () {
      if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
      } else {
        sidebar.classList.add("active");
      }
    });
  });