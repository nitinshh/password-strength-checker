const passwordInput = document.getElementById("passwordInput");
const strengthMessage = document.getElementById("strengthMessage");

passwordInput.addEventListener("input", async (event) => {
    const password = event.target.value;

    // Reset state if input is empty
    if (!password) {
        passwordInput.className = "";
        strengthMessage.textContent = "Start typing to see the strength";
        return;
    }

    // Fetch password strength data
    const response = await fetch(`/check-password?password=${encodeURIComponent(password)}`);
    const data = await response.json();

    if (data.error) {
        strengthMessage.textContent = data.error;
        return;
    }

    // Map score to strength levels
    const strengthLevels = [
        { class: "weak", label: "Very Weak" },
        { class: "weak", label: "Weak" },
        { class: "fair", label: "Fair" },
        { class: "strong", label: "Strong" },
        { class: "very-strong", label: "Very Strong" },
    ];

    const strength = strengthLevels[data.score];

    // Update input border and message dynamically
    passwordInput.className = strength.class;
    strengthMessage.textContent = `Strength: ${strength.label} - ${
        data.feedback.join(" ") || "Looks good!"
    }`;
});
