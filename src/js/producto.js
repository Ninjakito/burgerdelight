let botonesMas = document.querySelectorAll('.botones button:nth-child(3)');
let botonesMenos = document.querySelectorAll('.botones button:nth-child(1)');

botonesMas.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        let contador = document.querySelectorAll('.botones p')[index];
        contador.textContent = parseInt(contador.textContent) + 1;
    });
});

botonesMenos.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        let contador = document.querySelectorAll('.botones p')[index];
        if (parseInt(contador.textContent) > 0) {
            contador.textContent = parseInt(contador.textContent) - 1;
        }
    });
});