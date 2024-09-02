function setupEventListeners() {
    console.log("Network FOH JS Loaded");

    const testButton = document.getElementById('testButton');

    if (testButton) {
        testButton.addEventListener('click', () => {
            console.log('Button Clicked');
        });
    } else {
        console.error('Button not found');
    }
}

// Call this function after dynamically loading content
setupEventListeners();
