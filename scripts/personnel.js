document.addEventListener('DOMContentLoaded', () => {
    console.log('Personnel.js: DOM fully loaded and parsed');

    const personnelTable = document.getElementById('personnelTable')?.querySelector('tbody');
    const addRowBtn = document.getElementById('addRowBtn');

    if (!personnelTable) {
        console.error('Personnel table not found');
    }
    
    if (!addRowBtn) {
        console.error('Add button not found');
    }

    if (personnelTable && addRowBtn) {
        addRowBtn.addEventListener('click', () => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td contenteditable="true">Name</td>
                <td contenteditable="true">Number</td>
                <td contenteditable="true">Email</td>
                <td contenteditable="true">Job Role</td>
                <td>
                    <button class="save-btn">Save</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            personnelTable.appendChild(newRow);
            console.log('New row added to the table');
        });

        personnelTable.addEventListener('click', (event) => {
            if (event.target.classList.contains('save-btn')) {
                handleSave(event.target.closest('tr'));
            } else if (event.target.classList.contains('delete-btn')) {
                handleDelete(event.target.closest('tr'));
            }
        });
    }

    function handleSave(row) {
        console.log('Saved data:', {
            name: row.cells[0].textContent,
            number: row.cells[1].textContent,
            email: row.cells[2].textContent,
            jobRole: row.cells[3].textContent,
        });
        alert('Row data saved!');
    }

    function handleDelete(row) {
        row.remove();
        console.log('Row deleted');
    }
});
