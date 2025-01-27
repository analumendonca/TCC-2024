//MENUREDUZIDO
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

//POPUP AJUDA
const popup = document.getElementById('popup');

            function handlePopup(open) {
                popup.classList[open ? 'add' : 'remove']('opened');
            }


//


const disciplinaSelect = document.getElementById('disciplina');
const bimestreSelect = document.getElementById('bimestre');
const turmaSelect = document.getElementById('turma');
const filtroTitulo = document.getElementById('filtro-titulo');
const table = document.getElementById('notas');
const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
const mediaButton = document.getElementById('calcular_media');
const searchInput = document.querySelector('.barra-procurar');

function updateTitle() {
    const disciplina = disciplinaSelect.value || "Selecione a disciplina";
    const bimestre = bimestreSelect.value || "o bimestre";
    const turma = turmaSelect.value || "a turma";
    
    filtroTitulo.textContent = `Disciplina: ${disciplina}, Bimestre: ${bimestre}, Turma: ${turma}`;
}

function filterTable() {
    const disciplina = disciplinaSelect.value;
    const bimestre = bimestreSelect.value;
    const turma = turmaSelect.value;
    const searchValue = searchInput.value.toLowerCase();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const disciplinaCell = row.getAttribute('data-disciplina');
        const bimestreCell = row.getAttribute('data-bimestre');
        const turmaCell = row.getAttribute('data-turma');
        const numeroAluno = row.cells[0].textContent.toLowerCase();

        const matchesFilters = (disciplina === "" || disciplinaCell === disciplina) &&
                               (bimestre === "" || bimestreCell === bimestre) &&
                               (turma === "" || turmaCell === turma);
        const matchesSearch = numeroAluno === searchValue;

        if (matchesFilters && (searchValue === "" || matchesSearch)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function updateTableAndTitle() {
    updateTitle();
    filterTable();
}
function calculateAverage(row) {
    const monthlyGrade = parseFloat(row.querySelectorAll('input')[0].value);//nota mensal
    const simulatedGrade = parseFloat(row.querySelectorAll('input')[1].value);//nota simulado
    const bimestralGrade = parseFloat(row.querySelectorAll('input')[2].value);//nota bimestral
    const roteiroGrade = parseFloat(row.querySelectorAll('input')[3].value);//nota roteiro
    const initialAverage = (monthlyGrade + simulatedGrade + (2 * bimestralGrade)) / 4; //media sem roteiro - inicial
    let finalAverage = initialAverage; //media com roteiro - final

    row.querySelectorAll('input')[4].classList.remove('low-average');
    row.querySelectorAll('input')[4].classList.remove('needy');
    row.querySelectorAll('input')[4].classList.remove('good');


    if (initialAverage < 6) { //se a nota inicial for menor que 6
        if (initialAverage + roteiroGrade < 6) { //se o a nota inicial e o roteiro ainda serem menor que 6
            finalAverage = initialAverage + roteiroGrade; //nota final é a media + roteiro
            row.querySelectorAll('input')[4].classList.add('low-average'); //classifica como nota vermelha
        } else {
            finalAverage = 6; // se a nota inicial e o roteiro alcancarem 6 pontos
            row.querySelectorAll('input')[4].classList.add('needy');
        }
    } else if (roteiroGrade >= 4) { // se a media inicial for maior ou igual a 6
        finalAverage += 1;
        row.querySelectorAll('input')[4].classList.add('good');
    }

    row.querySelectorAll('input')[4].value = finalAverage.toFixed(1);
}

//EDITAR TABELA
document.querySelectorAll('input.editable').forEach(input => input.disabled = true);
document.getElementById('editar').addEventListener('click', function() {
    const confirmEdit = confirm("Tem certeza que deseja editar as notas?");
    if (confirmEdit) {
        const inputs = document.querySelectorAll('input.editable');
        inputs.forEach(input => {
            input.disabled = !input.disabled;
        });
    }
});
//CALCULAR MEDIA

function calcMedia() {
    for (let i = 0; i < rows.length; i++) {
        calculateAverage(rows[i]);
    }
    alert("Médias Calculadas!");
}

disciplinaSelect.addEventListener('change', updateTableAndTitle);
bimestreSelect.addEventListener('change', updateTableAndTitle);
turmaSelect.addEventListener('change', updateTableAndTitle);
mediaButton.addEventListener('click', calcMedia);
searchInput.addEventListener('input', filterTable);

//SHOW TABELA

document.addEventListener('DOMContentLoaded', function () {
    const turmaSelect = document.getElementById('turma');
    const disciplinaSelect = document.getElementById('disciplina');
    const bimestreSelect = document.getElementById('bimestre');
    const tabelaNotas = document.getElementById('notas');

    function mostrarTabelaSeFiltrosSelecionados() {
        const turma = turmaSelect.value;
        const disciplina = disciplinaSelect.value;
        const bimestre = bimestreSelect.value;

        if (turma && disciplina && bimestre) {
            tabelaNotas.style.display = 'table';
        } else {
            tabelaNotas.style.display = 'none';
        }
    }

    turmaSelect.addEventListener('change', mostrarTabelaSeFiltrosSelecionados);
    disciplinaSelect.addEventListener('change', mostrarTabelaSeFiltrosSelecionados);
    bimestreSelect.addEventListener('change', mostrarTabelaSeFiltrosSelecionados);
});
//ADMINISTRANDO AVALIACOES E PONTOS
// ADMINISTRANDO AVALIACOES E PONTOS

// Abrir e fechar avaliações
document.getElementById('openPopupAvalia').addEventListener('click', function() {
    document.getElementById('popup-avaliacoes').style.display = 'flex';
    loadTables();
});

document.getElementById('closePopup-ava').addEventListener('click', function() {
    document.getElementById('popup-avaliacoes').style.display = 'none';
});

// Condição para iniciarem fora do campo de visão
window.onclick = function(event) {
    if (event.target == document.getElementById('popup-avaliacoes')) {
        document.getElementById('popup-avaliacoes').style.display = 'none';
    }
    if (event.target == document.getElementById('popup-pontuacoes')) {
        document.getElementById('popup-pontuacoes').style.display = 'none';
    }
};
// Abrir e fechar pontuações
document.getElementById('openPopupPontuacao').addEventListener('click', function() {
    document.getElementById('popup-pontuacoes').style.display = 'flex';
    updateScoreTable();
});

document.getElementById('closePopup-pont').addEventListener('click', function() {
    document.getElementById('popup-pontuacoes').style.display = 'none';
});

// ADICIONAR ATIVIDADE AVALIATIVA
let rowId = 0; // Global identifier for rows

function addRow(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.id = 'row-' + rowId++; // Unique id for the row
    const cellTypes = ['text', 'date', 'text', 'number'];

    for (let i = 0; i < cellTypes.length; i++) {
        const newCell = newRow.insertCell();
        const input = document.createElement('input');
        input.type = cellTypes[i];
        input.disabled = true;
        newCell.appendChild(input);
    }

    // Disciplina select
    const disciplinaCell = newRow.insertCell();
    const disciplinaSelect = document.createElement('select');
    ['Geografia', 'Matemática', 'Física', 'História'].forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        disciplinaSelect.appendChild(option);
    });
    disciplinaSelect.disabled = true;
    disciplinaCell.appendChild(disciplinaSelect);

    // Bimestre select
    const bimestreCell = newRow.insertCell();
    const bimestreSelect = document.createElement('select');
    [1, 2, 3, 4].forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        bimestreSelect.appendChild(option);
    });
    bimestreSelect.disabled = true;
    bimestreCell.appendChild(bimestreSelect);

    // Turma select
    const turmaCell = newRow.insertCell();
    const turmaSelect = document.createElement('select');
    ['3I', '3J', '3K', '2I', '2J', '2K'].forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        turmaSelect.appendChild(option);
    });
    turmaSelect.disabled = true;
    turmaCell.appendChild(turmaSelect);

    let editCell = newRow.insertCell();
    let editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.onclick = function() {
        editRow(this);
    };
    editCell.appendChild(editButton);

    let deleteCell = newRow.insertCell();
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.onclick = function() {
        deleteRow(this);
    };
    deleteCell.appendChild(deleteButton);

    // Atualizar tabelas de pontuações com a nova avaliação
    updateScoreTable();
}

function editRow(button) {
    let row = button.parentNode.parentNode;
    let inputs = row.getElementsByTagName('input');
    let selects = row.getElementsByTagName('select');
    let isEditing = button.innerText === 'Editar';
    for (let input of inputs) {
        input.disabled = !isEditing;
    }
    for (let select of selects) {
        select.disabled = !isEditing;
    }
    button.innerText = isEditing ? 'Salvar' : 'Editar';

    if (!isEditing) {
        // Save and update the score tables when editing is finished
        updateScoreTable();
    }
}

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Update score tables after deletion
    updateScoreTable();
}

// Função de filtro
function filterTable() {
    const disciplinaFilter = document.getElementById('disc-pont').value;
    const turmaFilter = document.getElementById('turma-pont').value;
    const bimestreFilter = document.getElementById('bim-pont').value;

    ['scoreTableMensal', 'scoreTableRoteiro', 'scoreTableBimestral'].forEach(tableId => {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const disciplina = row.cells[3].innerText;
            const turma = row.cells[2].innerText;
            const bimestre = row.cells[4].innerText;

            const matchDisciplina = disciplinaFilter === '' || disciplina === disciplinaFilter;
            const matchTurma = turmaFilter === '' || turma === turmaFilter;
            const matchBimestre = bimestreFilter === '' || bimestre === bimestreFilter;

            if (matchDisciplina && matchTurma && matchBimestre) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Adicionar event listeners para os filtros
document.getElementById('disc-pont').addEventListener('change', filterTable);
document.getElementById('turma-pont').addEventListener('change', filterTable);
document.getElementById('bim-pont').addEventListener('change', filterTable);

// Função para atualizar a tabela de pontuações
function updateScoreTable() {
    const mensalTable = document.getElementById('scoreTableMensal');
    const recTable = document.getElementById('scoreTableRoteiro');
    const bimestralTable = document.getElementById('scoreTableBimestral');

    const tables = {
        'mensalTable': mensalTable,
        'recTable': recTable,
        'bimestralTable': bimestralTable
    };

    // Obtém todas as linhas das tabelas de avaliações
    const evaluationTables = ['mensalTable', 'recTable', 'bimestralTable'].map(id => document.getElementById(id));

    evaluationTables.forEach(evaluationTable => {
        const rows = evaluationTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const selects = row.querySelectorAll('select');
            const disciplina = selects[0].value;
            const bimestre = selects[1].value;
            const turma = selects[2].value;
            const atividade = inputs[0].value;
            const maxCap = inputs[3].value;

            const tableType = evaluationTable.id;
            const targetTable = tables[tableType];

            const headerRow = targetTable.querySelector('thead tr');
            const bodyRows = targetTable.querySelectorAll('tbody tr');

            // Adiciona novo cabeçalho de coluna se não existir
            let headerExists = Array.from(headerRow.children).some(th => th.innerText === atividade);
            if (!headerExists) {
                const newHeader = document.createElement('th');
                newHeader.innerText = atividade;
                headerRow.appendChild(newHeader);

                // Adiciona novas células de input às linhas do corpo
                bodyRows.forEach(bodyRow => {
                    const newCell = bodyRow.insertCell();
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.max = maxCap;
                    input.className = 'score-input'; // Para facilitar a estilização
                    newCell.appendChild(input);
                });
            }
        });
    });
}

// Função para salvar as pontuações
function savePontuacoes() {
    const tables = ['scoreTableMensal', 'scoreTableRoteiro', 'scoreTableBimestral'].map(id => document.getElementById(id));
    let data = [];

    tables.forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText);
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            let rowData = {};
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (index < headers.length) {
                    const input = cell.querySelector('input');
                    rowData[headers[index]] = input ? input.value : cell.innerText;
                }
            });
            data.push(rowData);
        });
    });

    console.log('Dados das Pontuações:', data);
    alert('Pontuações salvas com sucesso!');
}

// Conecta a função ao botão "Salvar Pontuações"
document.getElementById('savePontuacoes').addEventListener('click', savePontuacoes);

// Função para salvar a tabela de avaliações
function saveTable(tableId) {
    const table = document.getElementById(tableId);
    // Logic to save the table data
}

function loadTables() {
    loadTable('mensalTable');
    loadTable('recTable');
    loadTable('bimestralTable');}

// Inicializa os filtros na tabela
filterTable();


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
