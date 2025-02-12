document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const ticketContainer = document.createElement("div"); // Ticket wrapper
    ticketContainer.classList.add("ticket-container", "hidden");
    document.body.appendChild(ticketContainer); // Append to body

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();
        const avatarInput = document.getElementById("avatar").files[0];

        // Basic validation
        if (!name || !email || !github) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate Email Format
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Read avatar file (if uploaded)
        let avatarURL = "default-avatar.png"; // Fallback avatar
        if (avatarInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarURL = e.target.result;
                generateTicket(name, email, github, avatarURL);
            };
            reader.readAsDataURL(avatarInput);
        } else {
            generateTicket(name, email, github, avatarURL);
        }
    });

    // Function to validate email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to generate the ticket
    function generateTicket(name, email, github, avatar) {
        // Clear existing ticket content
        ticketContainer.innerHTML = `
            <div class="ticket">
                <h2>Your Conference Ticket 🎟️</h2>
                <img src="${avatar}" alt="Avatar" class="avatar">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>GitHub:</strong> <a href="https://github.com/${github}" target="_blank">${github}</a></p>
                <button id="backBtn">Edit Details</button>
            </div>
        `;

        // Hide the form and show the ticket
        document.querySelector(".container").classList.add("hidden");
        ticketContainer.classList.remove("hidden");

        // Add back button functionality
        document.getElementById("backBtn").addEventListener("click", function () {
            ticketContainer.classList.add("hidden");
            document.querySelector(".container").classList.remove("hidden");
        });
    }
});
