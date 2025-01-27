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
    const sala = document.getElementById('salas').value.toUpperCase();
    const bimestre = document.getElementById('bimestres').value.toUpperCase();
    const data = document.getElementById('data').value;
    const searchTerm = document.getElementById('procure').value.toUpperCase();

    const table = document.querySelector('table tbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td');
        const title = cols[0].textContent.toUpperCase();
        const bim = cols[1].textContent.toUpperCase();
        const date = cols[2].textContent;
        const turma = cols[3].textContent.toUpperCase();

        let show = true;

        if (sala && turma.indexOf(sala) === -1) {
            show = false;
        }

        if (bimestre && bim.indexOf(bimestre) === -1) {
            show = false;
        }

        if (data && date !== data) {
            show = false;
        }

        if (searchTerm && title.indexOf(searchTerm) === -1) {
            show = false;
        }

        rows[i].style.display = show ? '' : 'none';
    }
}

function openModal() {
    document.getElementById('reportModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('reportModal')) {
        closeModal();
    }
}

function saveReport() {
    const title = document.getElementById('reportTitle').value;
    const bimester = document.getElementById('reportBimester').value;
    const date = document.getElementById('reportDate').value;
    const reportClass = document.getElementById('reportClass').value;
    const fileInput = document.getElementById('reportFile');
    const file = fileInput.files[0];

    console.log("Botão Salvar clicado");
    console.log("Título:", title);
    console.log("Bimestre:", bimester);
    console.log("Data:", date);
    console.log("Turma:", reportClass);
    console.log("Arquivo selecionado:", file);

    if (!file) {
        alert('Por favor, selecione um arquivo PDF.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileURL = e.target.result;

        console.log("URL do arquivo:", fileURL);

        // Adiciona a nova linha na tabela
        const table = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
        console.log("Tabela encontrada:", table);

        const newRow = table.insertRow();
        console.log("Linha inserida:", newRow);

        const titleCell = newRow.insertCell(0);
        const bimesterCell = newRow.insertCell(1);
        const dateCell = newRow.insertCell(2);
        const classCell = newRow.insertCell(3);
        const actionCell = newRow.insertCell(4);

        titleCell.innerHTML = title;
        bimesterCell.innerHTML = bimester;
        dateCell.innerHTML = date;
        classCell.innerHTML = reportClass;

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'visu';
        downloadBtn.innerText = 'Visualizar';
        downloadBtn.onclick = function() {
            console.log("Botão de visualização clicado");
            downloadFile(fileURL);
        };
        actionCell.appendChild(downloadBtn);

        closeModal();
    };
    reader.readAsDataURL(file);
}

function downloadFile(url) {
    console.log("Iniciando download do arquivo:", url);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.pdf'; // Nome padrão do arquivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

