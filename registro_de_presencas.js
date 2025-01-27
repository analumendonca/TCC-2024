document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

const popup = document.getElementById('popup');

            function handlePopup(open) {
                popup.classList[open ? 'add' : 'remove']('opened');
            }


// Objeto para armazenar o estado das faltas por data
var attendanceRecords = {};

// Flag para controle do modo de edição
var isEditing = false;

// Função para gerar o alerta do relatório
document.querySelector('.btn-relatorio').addEventListener('click', function() {
    alert('Relatório gerado!');
});

// Função para salvar os dados
document.querySelector('.save-button').addEventListener('click', function() {
    saveAttendance();
    alert('Dados salvos!');
    disableCheckboxes();
});

// Função para enviar os dados para a coordenação
document.querySelector('.send-button').addEventListener('click', function() {
    saveAttendance();
    alert('Dados enviados para a coordenação!');
    disableCheckboxes();
});

// Função para habilitar/desabilitar o modo de edição
document.querySelector('.btnedit').addEventListener('click', function() {
    if (!isEditing) {
        var confirmEdit = confirm('Deseja entrar no modo de edição?');
        if (confirmEdit) {
            isEditing = true;
            enableCheckboxes();
        }
    } else {
        alert('Você já está no modo de edição.');
    }
});

// Função para atualizar a data na tabela
function updateTableDate() {
    checkSelections();
}

// Função para atualizar a turma na tabela
document.getElementById('salas').addEventListener('change', function() {
    checkSelections();
});

// Função para verificar se a data e a turma foram selecionadas
function checkSelections() {
    var date = document.getElementById('dias').value;
    var sala = document.getElementById('salas').value;

    if (date && sala) {
        document.querySelector('.containerbox').style.display = 'block';
        var dateCells = document.querySelectorAll('.date-cell');
        dateCells.forEach(function(cell) {
            cell.textContent = date;
        });
        loadAttendance(date);
        filterTable(sala);
    } else {
        document.querySelector('.containerbox').style.display = 'none';
    }
}

// Função para filtrar a tabela com base na turma selecionada
function filterTable(sala) {
    var rows = document.querySelectorAll('tbody tr');
    rows.forEach(function(row) {
        var turmaCell = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (turmaCell === sala.toLowerCase()) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Função para salvar o estado das faltas no objeto
function saveAttendance() {
    var date = document.getElementById('dias').value;
    var checkboxes = document.querySelectorAll('.checkpres');
    attendanceRecords[date] = [];
    checkboxes.forEach(function(checkbox, index) {
        attendanceRecords[date][index] = checkbox.checked;
    });
}

// Função para carregar o estado das faltas do objeto
function loadAttendance(date) {
    var checkboxes = document.querySelectorAll('.checkpres');
    if (attendanceRecords[date]) {
        checkboxes.forEach(function(checkbox, index) {
            checkbox.checked = attendanceRecords[date][index] || false;
            toggleColor(checkbox); // Atualiza a cor da linha baseada no estado do checkbox
        });
    } else {
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
            toggleColor(checkbox); // Remove a cor da linha se não houver dados para a data
        });
    }
}

// Função para alternar a cor da linha ao clicar no checkbox
function toggleColor(element) {
    var row = element.closest('tr');
    if (element.checked) {
        row.style.backgroundColor = '#f8d7da'; // Exemplo de cor para falta
    } else {
        row.style.backgroundColor = ''; // Volta para a cor original
    }
}


// Função para habilitar os checkboxes
function enableCheckboxes() {
    var checkboxes = document.querySelectorAll('.checkpres');
    checkboxes.forEach(function(checkbox) {
        checkbox.disabled = false;
    });
}

// Função para desabilitar os checkboxes
function disableCheckboxes() {
    var checkboxes = document.querySelectorAll('.checkpres');
    checkboxes.forEach(function(checkbox) {
        checkbox.disabled = true;
    });
    isEditing = false;
}

// Inicialmente desabilitar os checkboxes
disableCheckboxes();

//PROCURAR
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchInput').addEventListener('keyup', function() {
        let input = document.getElementById('searchInput');
        let filter = input.value.toLowerCase();
        let table = document.getElementById('studentTable');
        let tr = table.getElementsByTagName('tr');

        for (let i = 1; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[1]; // Coluna Nome
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }       
        }
    });
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
