document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const menuButton = document.getElementById('menuButton');
    const container = document.querySelector('.container'); // Container holds the entire layout
    const content = document.getElementById('content');

    if (menuButton && container) {
        menuButton.addEventListener('click', () => {
            console.log('Menu button clicked');
            container.classList.toggle('show-drawer'); // Toggle class on the container
        });
    } else {
        console.error('Elements not found');
    }

    const submenuLinks = document.querySelectorAll('[data-toggle="submenu"]');
    submenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const parent = link.parentElement;
            const submenu = parent.querySelector('.submenu-list');
            if (submenu) {
                submenu.classList.toggle('open');
                parent.classList.toggle('open');
            }
        });
    });

    const pageLinks = document.querySelectorAll('[data-page]');
    pageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            fetch(page)
                .then(response => response.text())
                .then(html => {
                    content.innerHTML = html;
                    console.log(`${page} loaded successfully`);
                })
                .catch(error => {
                    console.error(`Failed to load ${page}: `, error);
                });
        });
    });
});
