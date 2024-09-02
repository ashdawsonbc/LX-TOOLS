function setupEventListeners() {
    console.log('DOM fully loaded and parsed');
    console.log("Event Info JS Loaded");

    const eventForm = document.getElementById('eventForm');
    const addScheduleItemButton = document.getElementById('addScheduleItem');
    const scheduleContainer = document.getElementById('scheduleContainer'); // Assuming you have a container for schedule items
    const saveEvent = document.getElementById("submit")

    const testButton = document.getElementById('submit');
    console.log('Test button element:', submit);

    if (submit) {
        submit.addEventListener('click', () => {
            console.log('Button Clicked');
        });
    } else {
        console.error('Button not found');
    }
}