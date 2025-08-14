const select = document.querySelector('select');
const timeDisplay = document.querySelectorAll('.Time');

const timeZones = {
    "New York": "America/New_York",
    "Los Angeles": "America/Los_Angeles",
    "New Orleans": "America/Chicago",
    "Phoenix": "America/Phoenix",
    "Auckland": "Pacific/Auckland",
    "Tokyo": "Asia/Tokyo"
};

select.addEventListener('change', function() {
    const city = select.options[select.selectedIndex].text; // Get the name of the selected city
    const timeZone = timeZones[city]; // Get the time zone from the object

    if (timeZone) {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: timeZone });
        timeDisplay[select.selectedIndex].innerText = currentTime; // Display the time for that city
    }
});