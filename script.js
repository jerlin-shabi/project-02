document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();
        const avatarInput = document.getElementById("avatar");

        // Validate file
        const file = avatarInput.files[0];
        if (file) {
            const validTypes = ["image/png", "image/jpeg"];
            if (!validTypes.includes(file.type)) {
                alert("Only PNG and JPG files are allowed.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be under 2MB.");
                return;
            }

            // Convert file to Base64
            const reader = new FileReader();
            reader.onload = function (e) {
                localStorage.setItem("avatar", e.target.result);
                redirectToTicket();
            };
            reader.readAsDataURL(file);
        } else {
            localStorage.setItem("avatar", ""); // Empty if no image
            redirectToTicket();
        }

        function redirectToTicket() {
            // Store user data in localStorage
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("github", github);

            // Redirect to the ticket page
            window.location.href = "ticket.html";
        }
    });
});
