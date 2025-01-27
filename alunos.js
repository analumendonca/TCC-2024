//MENUREDUZIDO
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

//POPUP AJUDA
const popup = document.getElementById('popup');

            function handlePopup(open) {
                popup.classList[open ? 'add' : 'remove']('opened');
            }

//FILTROS
function filterTable() {
    var dropdown = document.getElementById('salas');
    var selectedValue = dropdown.value.toUpperCase(); // Convert to uppercase to match table values
    var table = document.getElementById('alunosTable');
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    console.log('Selected Value:', selectedValue); // Depuração
    
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var turmaCell = cells[2].textContent.trim().toUpperCase(); // Convert to uppercase for comparison
        
        console.log('Row Turma:', turmaCell); // Depuração
        
        if (selectedValue === '' || turmaCell === selectedValue) {
            rows[i].style.display = ''; // Show the row
        } else {
            rows[i].style.display = 'none'; // Hide the row
        }
    }
}
function searchTable() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toUpperCase();
    var table = document.getElementById('alunosTable');
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var nameCell = rows[i].getElementsByTagName('td')[2]; // A coluna de nome está na posição 2
        if (nameCell) {
            var txtValue = nameCell.textContent || nameCell.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = ''; // Mostra a linha
            } else {
                rows[i].style.display = 'none'; // Esconde a linha
            }
        }
    }
}


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
    