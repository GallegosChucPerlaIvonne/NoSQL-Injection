document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;
    const resultDiv = document.getElementById('result');
    
    try {
        let password;
        try {
            passwordInput = passwordInput.replace(/'/g, '"');
            password = JSON.parse(passwordInput);
        } catch {
            password = passwordInput;
        }
        
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            resultDiv.innerHTML = `
                <p class="success">¡Login exitoso!¡Bien hecho!</p>
            `;
        } else {
            resultDiv.innerHTML = `
                <p class="error">Incorrecto.</p>
            `;
        }
        
    } catch (error) {
        resultDiv.innerHTML = `
            <p class="error">Error</p>
        `;
    }
});
