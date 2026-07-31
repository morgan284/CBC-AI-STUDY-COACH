const askBtn = document.getElementById("askBtn");
const question = document.getElementById("question");
const chatBox = document.getElementById("chatBox");

askBtn.addEventListener("click", async () => {
    const text = question.value.trim();

    if (!text) {
        alert("Please enter a question.");
        return;
    }

    chatBox.innerHTML += `
        <div class="user-message">
            <strong>👨 You:</strong><br>
            ${text}
        </div>
    `;

    question.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="ai-message">
                <strong>🤖 CBC AI:</strong><br>
                ${data.reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `
            <div class="ai-message">
                <strong>🤖 CBC AI:</strong><br>
                Error connecting to AI.
            </div>
        `;
    }
});