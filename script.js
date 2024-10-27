async function saveCredentials() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch('/api/save-credentials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            alert('Credentials saved successfully!');
        } else {
            alert('Error saving credentials.');
        }
    }