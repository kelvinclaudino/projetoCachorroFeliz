// Efeito de rolagem suave personalizado
function smoothScroll(target, duration = 800) {
    const elemento = document.querySelector(target);
    const inicio = window.pageYOffset;

    // Altura do menu fixo
    const menuAltura = document.querySelector("header").offsetHeight;

    // Posição final ajustada para não ficar colado no menu
    const destino = elemento.offsetTop - menuAltura - 0;

    const distancia = destino - inicio;
    let inicioTempo = null;

    function animarScroll(tempoAtual) {
        if (!inicioTempo) inicioTempo = tempoAtual;

        const tempo = tempoAtual - inicioTempo;
        const progresso = Math.min(tempo / duration, 1);

        // Ease-in-out
        const ease = progresso < 0.5
            ? 2 * progresso * progresso
            : -1 + (4 - 2 * progresso) * progresso;

        window.scrollTo(0, inicio + distancia * ease);

        if (tempo < duration) requestAnimationFrame(animarScroll);
    }

    requestAnimationFrame(animarScroll);
}

// Ativa nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        smoothScroll(link.getAttribute("href"));
    });
});
