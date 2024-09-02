document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Initial setup of event listeners
    setupMenuButton();
    setupSubmenuToggles();
    setupPageLinks();

    // Load initial page content
    loadPageContent('dashboard.html');
});

function setupMenuButton() {
    const menuButton = document.getElementById('menuButton');
    const container = document.querySelector('.container');

    if (menuButton && container) {
        menuButton.addEventListener('click', () => {
            console.log('Menu button clicked');
            container.classList.toggle('show-drawer');
        });
    } else {
        console.error('Menu button or container not found');
    }
}

function setupSubmenuToggles() {
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
}

function setupPageLinks() {
    const pageLinks = document.querySelectorAll('[data-page]');

    pageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadPageContent(page);
        });
    });
}

function loadPageContent(page) {
    const content = document.getElementById('content');
    if (!content) {
        console.error('Content element not found');
        return;
    }

    // Adjust the path based on your directory structure
    const pageUrl = `pages/${page}`;
    console.log(`Fetching page: ${pageUrl}`);

    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;
            console.log(`${page} loaded successfully`);

            // Re-setup event listeners for new content
            setupDynamicEventListeners();
        })
        .catch(error => {
            console.error(`Failed to load ${page}:`, error);
            content.innerHTML = `<p>Failed to load page: ${error.message}</p>`;
        });
}

function setupDynamicEventListeners() {
    console.log('Setting up dynamic event listeners for newly loaded content');

    // Example: Setting up event listeners for newly loaded content
    const addRowBtn = document.getElementById('addRowBtn');
    const personnelTable = document.querySelector('#personnelTable');

    if (addRowBtn) {
        addRowBtn.addEventListener('click', () => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td contenteditable="true">Name</td>
                <td contenteditable="true">Number</td>
                <td contenteditable="true">Email</td>
                <td contenteditable="true">Job Role</td>
                <td>
                    <button class="save-btn"><i class="fas fa-check"></i></button>
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </td>
            `;
            personnelTable.querySelector('tbody').appendChild(newRow);
            console.log('New row added to the table');
        });
    }

    if (personnelTable) {
        personnelTable.addEventListener('click', (event) => {
            const target = event.target;

            if (target.closest('.save-btn')) {
                handleSave(target.closest('tr'));
            } else if (target.closest('.edit-btn')) {
                handleEdit(target.closest('tr'));
            } else if (target.closest('.delete-btn')) {
                handleDelete(target.closest('tr'));
            }
        });
    }
}

function handleSave(row) {
    row.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
        cell.setAttribute('data-original-content', cell.textContent);
        cell.setAttribute('contenteditable', 'false');
    });
    console.log('Row saved:', {
        name: row.cells[0].textContent,
        number: row.cells[1].textContent,
        email: row.cells[2].textContent,
        jobRole: row.cells[3].textContent,
    });
}

function handleEdit(row) {
    row.querySelectorAll('td[data-original-content]').forEach(cell => {
        cell.setAttribute('contenteditable', 'true');
    });
    console.log('Row is now editable');
}

function handleDelete(row) {
    row.remove();
    console.log('Row deleted');
}
