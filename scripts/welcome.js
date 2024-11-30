const fs = require('fs');
const path = require('path');
const projectDir = path.join(__dirname, '../projects');

document.getElementById('createProject').addEventListener('click', () => {
  const projectName = prompt("Enter the project name:");
  if (projectName) {
    const projectPath = path.join(projectDir, projectName);
    fs.mkdirSync(projectPath, { recursive: true });
    alert(`Project ${projectName} created successfully!`);
    loadProjects();
  }
});

function loadProjects() {
  const tbody = document.querySelector('#projectTable tbody');
  tbody.innerHTML = ''; // Clear the table
  fs.readdirSync(projectDir).forEach(project => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${project}</td>
      <td>
        <button onclick="openProject('${project}')">Open</button>
        <button onclick="deleteProject('${project}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openProject(projectName) {
  alert(`Opening project: ${projectName}`);
  // Logic to load the project into the main app
}

function deleteProject(projectName) {
  const confirmDelete = confirm(`Are you sure you want to delete ${projectName}?`);
  if (confirmDelete) {
    const projectPath = path.join(projectDir, projectName);
    fs.rmdirSync(projectPath, { recursive: true });
    alert(`Project ${projectName} deleted.`);
    loadProjects();
  }
}

window.onload = loadProjects;
