// This is where your possible functionality code for the index page would go.

// Wait for the DOM to fully load, makes sure website is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    // Get the checkbox and the message elements.
    const checkbox = document.getElementById("TestCheckBox");
    const message = document.getElementById("checkboxMessage");

    // Add an event listener to the checkbox.
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            // If the checkbox is checked, show the message.
            message.style.display = "block";
        } else {
            // If the checkbox is not checked, hide the message.
            message.style.display = "none";
        }
    });
});
