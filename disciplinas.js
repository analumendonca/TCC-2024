document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
}); 

//modal funcoes

const funcoes1 = document.getElementById('funcoesgeo');
const funcoes2 = document.getElementById('funcoesmat');
const funcoes3 = document.getElementById('funcoeshist');
const funcoes4 = document.getElementById('funcoesfis');

function handleFuncoes1() {
    funcoes1.classList.add('opened');
    funcoes2.classList.remove('opened');
    funcoes3.classList.remove('opened');
    funcoes4.classList.remove('opened');
}

function handleFuncoes2() {
    funcoes1.classList.remove('opened');
    funcoes2.classList.add('opened');
    funcoes3.classList.remove('opened');
    funcoes4.classList.remove('opened');
}

function handleFuncoes3() {
    funcoes1.classList.remove('opened');
    funcoes2.classList.remove('opened');
    funcoes3.classList.add('opened');
    funcoes4.classList.remove('opened');
}

function handleFuncoes4() {
    funcoes1.classList.remove('opened');
    funcoes2.classList.remove('opened');
    funcoes3.classList.remove('opened');
    funcoes4.classList.add('opened');
}

//modal de ajuda

const popup = document.getElementById('popup');

            function handlePopup(open) {
                popup.classList[open ? 'add' : 'remove']('opened');
            }

//WRAPPER DISC


const carousel = document.querySelector(".carousel-disc"),
firstImg = carousel.querySelectorAll(".btn")[0],
arrowIcons = document.querySelectorAll(".wrapper-disc i");

let firstImgWidth = firstImg.clientWidth + 165;

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left2" ? -firstImgWidth : firstImgWidth;
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
