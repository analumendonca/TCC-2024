document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

const popup = document.getElementById('popup');

            function handlePopup(open) {
                popup.classList[open ? 'add' : 'remove']('opened');
            }

//
document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.getElementById("month-year");
    const calendarBody = document.getElementById("calendar-body");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const contentModal = document.getElementById("content-modal");
    const closeContentButton = document.querySelector(".close-content-modal");
    const saveContentButton = document.getElementById("save-content");
    const todayDateElement = document.getElementById("today-date");

    let currentDate = new Date();
    let selectedDate = null;
    const storagePrefix = "cal2_";

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
            cell.addEventListener("click", () => openContentModal(year, month, date));

            const notes = getContent(year, month, date);
            if (notes.length > 0) {
                const dotDiv = document.createElement("div");
                dotDiv.classList.add("calendar-dot");
                cell.appendChild(dotDiv);
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

    function openContentModal(year, month, date) {
        selectedDate = { year, month, date };
        const savedContent = getContent(year, month, date);

        for (let i = 1; i <= 5; i++) {
            document.getElementById(`content-text${i}`).value = savedContent[i - 1]?.content || "";
            document.getElementById(`obsocorr${i}`).value = savedContent[i - 1]?.obsocorr || "";
            document.getElementById(`turmas${i}`).value = savedContent[i - 1]?.turmas || "";
            document.getElementById(`disciplinas${i}`).value = savedContent[i - 1]?.disciplinas || "";
            document.getElementById(`prova${i}`).checked = savedContent[i - 1]?.dynamics?.prova || false;
            document.getElementById(`exercicios${i}`).checked = savedContent[i - 1]?.dynamics?.exercicios || false;
            document.getElementById(`aprese${i}`).checked = savedContent[i - 1]?.dynamics?.aprese || false;
            document.getElementById(`video${i}`).checked = savedContent[i - 1]?.dynamics?.video || false;
            document.getElementById(`jogo${i}`).checked = savedContent[i - 1]?.dynamics?.jogo || false;
            document.getElementById(`seminario${i}`).checked = savedContent[i - 1]?.dynamics?.seminario || false;
        }

        contentModal.classList.add("opened");
        todayDateElement.textContent = new Date(year, month, date).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function closeContentModal() {
        contentModal.classList.remove("opened");
    }

    function saveContent() {
        if (selectedDate) {
            const content = [];
            for (let i = 1; i <= 5; i++) {
                content.push({
                    content: document.getElementById(`content-text${i}`).value,
                    obsocorr: document.getElementById(`obsocorr${i}`).value,
                    dynamics: {
                        prova: document.getElementById(`prova${i}`).checked,
                        exercicios: document.getElementById(`exercicios${i}`).checked,
                        aprese: document.getElementById(`aprese${i}`).checked,
                        video: document.getElementById(`video${i}`).checked,
                        jogo: document.getElementById(`jogo${i}`).checked,
                        seminario: document.getElementById(`seminario${i}`).checked,
                    },
                    turmas: document.getElementById(`turmas${i}`).value,
                    disciplinas: document.getElementById(`disciplinas${i}`).value
                });
            }
            saveContentData(selectedDate.year, selectedDate.month, selectedDate.date, content);
            renderCalendar(currentDate);
            closeContentModal();
        }
    }

    function getContent(year, month, date) {
        const key = `${storagePrefix}${year}-${month}-${date}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    function saveContentData(year, month, date, content) {
        const key = `${storagePrefix}${year}-${month}-${date}`;
        localStorage.setItem(key, JSON.stringify(content));
    }

    prevMonthButton.addEventListener("click", () => changeMonth(-1));
    nextMonthButton.addEventListener("click", () => changeMonth(1));
    closeContentButton.addEventListener("click", closeContentModal);
    saveContentButton.addEventListener("click", saveContent);

    renderCalendar(currentDate);
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
