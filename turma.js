document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

//MENU REDUZIDO

//AJUDA- POPUP
const popup = document.getElementById('popup');

            function handlePopup(open) {
                popup.classList[open ? 'add' : 'remove']('opened');
            }

//GRÁFICO 1
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y,
        "L", start.x, start.y
    ].join(" ");

    return d;
}

function updateChart() {
    const totalStudents = parseInt(document.getElementById('totalStudents').value);
    const studentsAbove6 = parseInt(document.getElementById('studentsAbove6').value);
    const percentage = (studentsAbove6 / totalStudents) * 100;

    // Update the text
    document.getElementById('percentageText').textContent = `${percentage.toFixed(2)}%`;

    // Calculate the end angle
    const endAngle = (percentage / 100) * 180;

    // Update the arc
    if (percentage > 0) {
        const pathData = describeArc(50, 50, 50, 180, 180 + endAngle);
        document.getElementById('arc').setAttribute('d', pathData);
    } else {
        document.getElementById('arc').setAttribute('d', '');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateChart();
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
