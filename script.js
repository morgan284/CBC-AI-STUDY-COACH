const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: question
  })
});

const data = await response.json();

document.getElementById("chat-box").innerHTML += `
<div class="ai-message">
<strong>🤖 CBC AI:</strong><br>
${data.reply}
</div>
`;