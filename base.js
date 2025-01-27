document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});


const disciplinaSelect = document.getElementById('disciplina');
const bimestreSelect = document.getElementById('bimestre');
const turmaSelect = document.getElementById('turma');
const filtroTitulo = document.getElementById('filtro-titulo');
const table = document.getElementById('notas');
const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

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
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const disciplinaCell = row.getAttribute('data-disciplina');
        const bimestreCell = row.getAttribute('data-bimestre');
        const turmaCell = row.getAttribute('data-turma');
        
        if ((disciplina === "" || disciplinaCell === disciplina) &&
            (bimestre === "" || bimestreCell === bimestre) &&
            (turma === "" || turmaCell === turma)) {
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

disciplinaSelect.addEventListener('change', updateTableAndTitle);
bimestreSelect.addEventListener('change', updateTableAndTitle);
turmaSelect.addEventListener('change', updateTableAndTitle);