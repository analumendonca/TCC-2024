document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
    if(document.body.classList.contains('active')){
        themeIcon.src = dashhome.svg;
        themeIcon.alt = branco;
    }
});

//CALENDÁRIO
document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.getElementById("month-year");
    const calendarBody = document.getElementById("calendar-body");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const noteModal = document.getElementById("note-modal");
    const closeButton = document.querySelector(".close-button");
    const saveNoteButton = document.getElementById("save-note");
    const noteText = document.getElementById("note-text");

    let currentDate = new Date();
    let selectedDate = null;
    const storagePrefix = "cal1_";  // Prefixo para diferenciar as chaves de armazenamento

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        monthYearElement.textContent = date.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long"
        });

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const lastDateOfMonth = lastDayOfMonth.getDate();

        calendarBody.innerHTML = "";

        let row = document.createElement("tr");

        for (let i = 0; i < firstDayOfWeek; i++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
        }

        for (let date = 1; date <= lastDateOfMonth; date++) {
            if ((firstDayOfWeek + date - 1) % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement("tr");
            }

            const cell = document.createElement("td");
            cell.textContent = date;
            cell.addEventListener("click", () => openNoteModal(year, month, date));

            const notes = getNotes(year, month, date);
            if (notes) {
                const noteDiv = document.createElement("div");
                noteDiv.textContent = notes;
                cell.appendChild(noteDiv);
            }

            const today = new Date();
            if (
                date === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                cell.classList.add("today");
            }

            row.appendChild(cell);
        }

        while (row.children.length < 7) {
            const cell = document.createElement("td");
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }

    function changeMonth(delta) {
        currentDate.setMonth(currentDate.getMonth() + delta);
        renderCalendar(currentDate);
    }

    function openNoteModal(year, month, date) {
        selectedDate = { year, month, date };
        noteText.value = getNotes(year, month, date) || "";
        noteModal.style.display = "flex";
    }

    function closeNoteModal() {
        noteModal.style.display = "none";
    }

    function saveNote() {
        const notes = noteText.value;
        if (selectedDate) {
            saveNotes(selectedDate.year, selectedDate.month, selectedDate.date, notes);
            renderCalendar(currentDate);
            closeNoteModal();
        }
    }

    function getNotes(year, month, date) {
        const key = `${storagePrefix}${year}-${month}-${date}`;
        return localStorage.getItem(key);
    }

    function saveNotes(year, month, date, notes) {
        const key = `${storagePrefix}${year}-${month}-${date}`;
        localStorage.setItem(key, notes);
    }

    prevMonthButton.addEventListener("click", function() {
        changeMonth(-1);
    });

    nextMonthButton.addEventListener("click", function() {
        changeMonth(1);
    });

    closeButton.addEventListener("click", closeNoteModal);
    saveNoteButton.addEventListener("click", saveNote);

    window.addEventListener("click", function(event) {
        if (event.target === noteModal) {
            closeNoteModal();
        }
    });

    renderCalendar(currentDate);
});

//PASTAS

const carousel = document.querySelector(".carousel-pastas-turmas"),
firstImg = carousel.querySelectorAll("a")[0],
arrowIcons = document.querySelectorAll(".wrapper-pastas-turmas i");

let firstImgWidth = firstImg.clientWidth + 165;

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left1" ? -firstImgWidth : firstImgWidth;
    });
});

const carousel2 = document.querySelector(".carousel-pastas-disc"),
firstImg2 = carousel.querySelectorAll("a")[0],
arrowIcons2 = document.querySelectorAll(".wrapper-pastas-disc i");

let firstImgWidth2 = firstImg.clientWidth + 165;

arrowIcons2.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel2.scrollLeft += icon.id == "left2" ? -firstImgWidth2 : firstImgWidth2;
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


//BARRA DE PESQUISA
const htmlFiles = [
    { name: "Alunos", url: "alunos.html" },
    { name: "Disciplinas", url: "disciplinas.html" },
    { name: "Diário do Professor", url: "diarioprof.html" },
    { name: "Lançamento de Notas", url: "lancamento_notas.html" },
    { name: "Personalizar Avaliações", url: "lancamento_notas.html" },
    { name: "Pontuações", url: "lancamento_notas.html" },
    { name: "Programação de Conteúdos", url:"prog_cont.html" },
    { name: "Registro de Presenças", url: "registro_de_presencas.html" },
    { name: "Relatórios", url: "relatorios.html" },
    // Adicione mais arquivos conforme necessário
];

const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('resultList');

// Função para filtrar HTMLs
function filterHTMLs() {
    const searchTerm = searchBar.value.toLowerCase();
    resultList.innerHTML = '';

    if (searchTerm) {
        resultList.style.display = 'block'; // Mostrar a lista
        htmlFiles.forEach(file => {
            if (file.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement('li');
                li.textContent = file.name;
                li.onclick = () => {
                    window.location.href = file.url;
                };
                resultList.appendChild(li);
            }
        });
    } else {
        resultList.style.display = 'none'; // Esconder a lista se o campo estiver vazio
    }
}
searchBar.addEventListener('input', filterHTMLs);