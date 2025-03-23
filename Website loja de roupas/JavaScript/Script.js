document.querySelectorAll('.tamanho-btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.tamanho-btn').forEach(btn => btn.classList.remove('selecionado'));
        this.classList.add('selecionado');
    });
});