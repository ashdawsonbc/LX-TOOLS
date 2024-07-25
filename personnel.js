document.addEventListener('DOMContentLoaded', () => {
    console.log('Personnel management script loaded');

    const personnelForm = document.getElementById('personnelForm');
    const personnelTable = document.getElementById('personnelTable').querySelector('tbody');

    if (personnelForm && personnelTable) {
        console.log('Form and Table Elements Found');

        personnelForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Form submission prevented');

            const formData = new FormData(personnelForm);
            const name = formData.get('name');
            const number = formData.get('number');
            const email = formData.get('email');
            const jobRole = formData.get('jobRole');

            console.log(`Captured data: Name: ${name}, Number: ${number}, Email: ${email}, Job Role: ${jobRole}`);

            // Create a new table row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${number}</td>
                <td>${email}</td>
                <td>${jobRole}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;

            personnelTable.appendChild(newRow);
            console.log('New row added to the table');

            personnelForm.reset();
            console.log('Form reset');
        });

        // Handle edit and delete actions
        personnelTable.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-btn')) {
                console.log('Edit button clicked');
                handleEdit(event.target.parentElement.parentElement);
            } else if (event.target.classList.contains('delete-btn')) {
                console.log('Delete button clicked');
                handleDelete(event.target.parentElement.parentElement);
            }
        });
    } else {
        console.error('Personnel form or table not found');
    }

    function handleEdit(row) {
        const cells = row.querySelectorAll('td');
        const name = cells[0].textContent;
        const number = cells[1].textContent;
        const email = cells[2].textContent;
        const jobRole = cells[3].textContent;

        // Prefill form with existing data
        document.getElementById('name').value = name;
        document.getElementById('number').value = number;
        document.getElementById('email').value = email;
        document.getElementById('jobRole').value = jobRole;

        console.log(`Editing row: ${name}, ${number}, ${email}, ${jobRole}`);
    }

    function handleDelete(row) {
        row.remove();
        console.log('Row deleted');
    }
});
