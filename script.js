document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.access_token);
        window.location.href = 'chat.html';
    } else {
        alert(data.message);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const name = document.getElementById('name').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    });
    const data = await response.json();
    if (response.ok) {
        alert(data.message);
    } else {
        alert(data.message);
    }
});

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput').value;
    const token = localStorage.getItem('token');
    const response = await fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ receiver_id: 1, content: messageInput }) // Замените 1 на ID получателя
    });
    const data = await response.json();
    if (response.ok) {
        document.getElementById('messageInput').value = '';
        fetchMessages();
    } else {
        alert(data.message);
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

async function fetchMessages() {
    const token = localStorage.getItem('token');
    const response = await fetch('/messages', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (response.ok) {
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML = '';
        data.messages.forEach(message => {
            const p = document.createElement('p');
            p.textContent = `${message.sender_name}: ${message.content}`;
            chatBox.appendChild(p);
        });
    } else {
        alert(data.message);
    }
}

window.onload = fetchMessages;
