const express = require("express");
const zxcvbn = require("zxcvbn");

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Endpoint to check password strength
app.get("/check-password", (req, res) => {
    const { password } = req.query;

    if (!password) {
        return res.json({ error: "Password is required!" });
    }

    const result = zxcvbn(password);

    res.json({
        score: result.score,
        feedback: result.feedback.suggestions,
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
