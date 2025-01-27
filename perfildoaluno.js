/*ADCIONA MENSAGEM*/
document.addEventListener('DOMContentLoaded', function() {
    const messageBoard = document.querySelector('.message-board');
    const addMessageButton = document.querySelector('.add-message-button');

    addMessageButton.addEventListener('click', function() {
        const newMessageDiv = document.createElement('div');
        newMessageDiv.className = 'message';
        newMessageDiv.innerHTML = `
            <strong>Nova Mensagem:</strong>
            <div><input type="text" placeholder="Digite sua mensagem aqui"></div>
        `;
        messageBoard.appendChild(newMessageDiv);
        messageBoard.scrollTop = messageBoard.scrollHeight; // Scroll to the bottom
    });
});
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

//MODO ESCURO
document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Verifica o tema armazenado e aplica-o
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.src = 'lua.svg';  // Caminho para o ícone de lua
        themeIcon.alt = 'Moon Icon';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.src = 'sol.svg';  // Caminho para o ícone de sol
        themeIcon.alt = 'Sun Icon';
    }
    
    // Alterna o tema e armazena a preferência
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.src = 'lua.svg';  // Caminho para o ícone de lua
            themeIcon.alt = 'Moon Icon';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.src = 'sol.svg';  // Caminho para o ícone de sol
            themeIcon.alt = 'Sun Icon';
            localStorage.setItem('theme', 'light');
        }
    });
});
