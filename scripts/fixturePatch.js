function setupEventListeners() {
    console.log("Fixture Patch JS Loaded");

    const addfixbtn = document.getElementById('addfixbtn');
    console.log('Test button element:', addfixbtn);

    if (addfixbtn) {
        addfixbtn.addEventListener('click', () => {
            console.log('Button Clicked');
        });
    } else {
        console.error('Button not found');
    }
}

// Call this function after dynamically loading content
setupEventListeners();
