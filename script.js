document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todas as suas seções com IDs de navegação
    const sections = document.querySelectorAll('section[id]');
    
    // 2. Seleciona todos os links da navegação
    const navLinks = document.querySelectorAll('.nav-list a');

    // 3. Opções para o Intersection Observer
    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px 0px -50% 0px', // A seção precisa cruzar o meio da tela para ser considerada ativa
        threshold: 0 // Dispara o evento imediatamente ao entrar/sair
    };

    // 4. Função de Callback do Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Pega o ID da seção que está cruzando a linha
                const sectionId = entry.target.id;
                
                // Encontra e adiciona a classe 'active' ao link correspondente
                const activeLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // 5. Cria e inicia o Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});