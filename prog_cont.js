// Alterna a visibilidade da sidebar ao clicar no botão
document.getElementById('open_btn').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
});


/*LIMITE DA TELA*/
document.addEventListener("DOMContentLoaded", function () {
const disciplinaViews = document.querySelectorAll('.disciplina-view');
const modalajuda = document.getElementById('popup');
const limit = document.getElementById('limit');

// Atualiza a margem superior do elemento #limit com base na altura máxima das views abertas
function updateMarginTop() {
    let maxHeight = 0;
    disciplinaViews.forEach(view => {
        if (view.classList.contains('opened')) {
            const viewHeight = view.offsetHeight;
            if (viewHeight > maxHeight) {
                maxHeight = viewHeight;
            }
        }
    });
    limit.style.marginTop = `${maxHeight}px`;
}

// Observa mudanças na classe das views para atualizar a margem superior
function checkDisciplinaViewsOpened() {
    disciplinaViews.forEach(view => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateMarginTop();
                }
            });
        });

        observer.observe(view, {
            attributes: true
        });
    });
}

// Inicia a observação das views
checkDisciplinaViewsOpened();
});

/*AJUDA-POPUP*/
// Seleciona o popup de ajuda
const popup = document.getElementById('popup');

// Função para abrir ou fechar o popup
function handlePopup(open) {
  popup.classList[open ? 'add' : 'remove']('opened');
}

/*DISCIPLINA VIEW*/

// Modal funções
const disc1 = document.getElementById('disc-1');

// Funções para abrir cada modal e fechar os outros
function handleFuncoes1() {
  disc1.classList.add('opened');

}

// WRAPPER PASTAS
document.addEventListener("DOMContentLoaded", () => {
// Seleciona o carrossel de pastas e a primeira imagem
const carousel = document.querySelector(".carousel-select");
const firstImg = carousel.querySelectorAll(".btn")[0];
const arrowIcons = document.querySelectorAll(".wrapper-select i");

// Calcula a largura da primeira imagem incluindo margens
let firstImgWidth = firstImg.clientWidth + 100;

// Adiciona evento de clique para as setas de navegação
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // Desloca o carrossel para a esquerda ou direita
        carousel.scrollLeft += icon.id === "left1" ? -firstImgWidth : firstImgWidth;
    });
});
});

// Funções para abrir cada modal e fechar os outros
function handleFuncoes1(disciplina) {
disc1.classList.add('opened');
disciplinasDropdown.value = disciplina;
applyFilters();
}

// Seleciona os elementos do modal e os campos do formulário
const modal = document.querySelector('.modalnew-container');
const tbody = document.querySelector('tbody');
const sConteudo = document.querySelector('#n-conteudo');
const sBim = document.querySelector('#n-bim');
const sDisc = document.querySelector('#n-disciplina');
const sDescrip = document.querySelector('#n-descrip');
const btnSalvar = document.querySelector('#btnSalvar');
const disciplinasDropdown = document.querySelector('#disciplinas');
const bimestreDropdown = document.querySelector('#bimestre');

let itens; // Array para armazenar os itens
let id; // Variável para armazenar o índice do item a ser editado

// Abre o modal para criar ou editar um item
function openNew(edit = false, index = 0) {
modal.classList.add('active');

// Fecha o modal se clicar fora dele
modal.onclick = e => {
  if (e.target.className.indexOf('modalnew-container') !== -1) {
    modal.classList.remove('active');
  }
}

// Se for edição, preenche os campos com os valores do item existente
if (edit) {
  sConteudo.value = itens[index].conteudo;
  sBim.value = itens[index].bim;
  sDisc.value = itens[index].disciplina;
  sDescrip.value = itens[index].descrip;
  id = index; // Armazena o índice do item a ser editado
} else {
  // Se for novo item, limpa os campos do formulário
  sConteudo.value = '';
  sBim.value = '';
  sDisc.value = '';
  sDescrip.value = '';
}
}

// Abre o modal para editar um item específico
function editItem(index) {
const confirmation = confirm('Tem certeza que deseja editar este conteúdo?');
if (confirmation) {
openNew(true, index);
}
}

// Função para excluir um item com confirmação
function deleteItem(index) {
const confirmation = confirm('Tem certeza que deseja excluir este conteúdo?');
if (confirmation) {
  itens.splice(index, 1); // Remove o item do array
  setItensBD(); // Atualiza o armazenamento local
  loadItens(); // Recarrega os itens na tabela
}
}

// Função para inserir um item na tabela
function insertItem(item, index) {
let tr = document.createElement('tr');

tr.innerHTML = `
  <td>${item.conteudo}</td>
  <td>${item.bim}ºBIM</td>
  <td>${item.disciplina}</td>
  <td>${item.descrip}</td>
  <td class="acao">
    <button onclick="editItem(${index})">Editar</button>
  </td>
  <td class="acao">
    <button onclick="deleteItem(${index})">Excluir</button>
  </td>
`;
tbody.appendChild(tr); // Adiciona a linha na tabela
}

// Função para salvar o item ao clicar no botão "Salvar"
btnSalvar.onclick = e => {
if (sConteudo.value == '' || sBim.value == '' || sDisc.value == '' || sDescrip.value == '') {
  return; // Verifica se todos os campos estão preenchidos
}

e.preventDefault();

if (id !== undefined) {
  // Atualiza o item existente
  itens[id].conteudo = sConteudo.value;
  itens[id].bim = sBim.value;
  itens[id].disciplina = sDisc.value;
  itens[id].descrip = sDescrip.value;
} else {
  // Adiciona um novo item ao array
  itens.push({ 'conteudo': sConteudo.value, 'bim': sBim.value, 'disciplina': sDisc.value, 'descrip': sDescrip.value });
}

setItensBD(); // Atualiza o armazenamento local
modal.classList.remove('active'); // Fecha o modal
loadItens(); // Recarrega os itens na tabela
id = undefined; // Reseta o índice do item a ser editado
}

// Função para carregar os itens do armazenamento local
function loadItens() {
itens = getItensBD(); // Obtém os itens do armazenamento local
applyFilters(); // Aplica os filtros
}

// Funções para obter e definir os itens no armazenamento local
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

// Carrega os itens ao carregar a página
loadItens();

// Adiciona eventos aos dropdowns para filtrar os itens
disciplinasDropdown.onchange = bimestreDropdown.onchange = applyFilters;

function applyFilters() {
const selectedDisciplina = disciplinasDropdown.value;
const selectedBimestre = bimestreDropdown.value;

const filteredItens = itens.filter(item => {
  return (selectedDisciplina === '' || item.disciplina === selectedDisciplina) &&
         (selectedBimestre === '' || item.bim === selectedBimestre);
});

tbody.innerHTML = ''; // Limpa a tabela
filteredItens.forEach((item, index) => {
  insertItem(item, index); // Insere cada item filtrado na tabela
});
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
