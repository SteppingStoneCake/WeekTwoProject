function updateTime(cityElement, timezone) {
    const now = new Date();
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timezone };
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

    cityElement.querySelector(".time").textContent = new Intl.DateTimeFormat("en-US", optionsTime).format(now);
    cityElement.querySelector(".date").textContent = new Intl.DateTimeFormat("en-US", optionsDate).format(now);
}

document.getElementById("citySelect").addEventListener("change", function () {
    const timezone = this.value;
    const cityName = this.options[this.selectedIndex].text;

    if (!timezone) return;

    const citiesContainer = document.getElementById("citiesContainer");

    // Create city element
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("city");
    cityDiv.innerHTML = `
        <div class="city-header">
            <h2>${cityName}</h2>
            <div class="time"></div>
        </div>
        <div class="date"></div>
    `;

    citiesContainer.appendChild(cityDiv);

    // Update time immediately and every second
    updateTime(cityDiv, timezone);
    setInterval(() => updateTime(cityDiv, timezone), 1000);
});
