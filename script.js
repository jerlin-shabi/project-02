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

    function generateTicket(name, email, github, avatar) {
        ticketContainer.innerHTML = `
            <div class="heading">
                <h1>Congrats, ${name}!</h1>
                <h1>Your ticket is ready.</h1>
            </div>
            <div class="sub-heading">
                <p>We've emailed your ticket to</p>
                <p>${email} and will send updates in</p>
                <p>the run-up to the event.</p>
            </div>
            <div class="ticket">
                 <img src="assests/images/logo-full.svg" alt="Conference Logo" class="ticket-logo">
                 <p class="shabi">Jan 31, 2025 / Shabi, TX</p>
                <div class="ticket-content">
                    <img src="${avatar}" alt="Avatar" class="avatar">
                <div class="github-info">
                <p class="name-ticket">${name}</p>
                    <div class="info">
                        <img src="assests/images/icon-github.svg" class="git-img" alt="GitHub Icon">
                        <p class="github-username">${github}</p>
                    </div>
                </div>
                <div class="bottom">
                
                
                </div>
        </div>
            </div>
        `;
    


        // Hide the form and show the ticket
        document.querySelector(".container").classList.add("hidden");
        ticketContainer.classList.remove("hidden");
    }

    
});
