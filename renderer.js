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

    // Toggle submenus on click
    const submenuLinks = document.querySelectorAll('[data-toggle="submenu"]');

    submenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const parent = link.parentElement; // Get parent li element
            const submenu = parent.querySelector('.submenu-list');

            if (submenu) {
                submenu.classList.toggle('open'); // Toggle open class
                parent.classList.toggle('open'); // Toggle parent open class
            }
        });
    });

    // Load page content dynamically
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

                    // Reload the personnel.js script if the personnel page is loaded
                    if (page === 'personnel.html') {
                        loadPersonnelScript();
                    }
                })
                .catch(error => {
                    console.error(`Failed to load ${page}: `, error);
                });
        });
    });

    // Function to load the personnel.js script dynamically
    function loadPersonnelScript() {
        const script = document.createElement('script');
        script.src = 'personnel.js';
        document.body.appendChild(script);
    }
});
