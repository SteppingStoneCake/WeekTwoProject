// Detect user's local timezone
const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localCityName = "Current Location";

// Add it to the top of the dropdown
const citySelect = document.getElementById("citySelect");
const localOption = document.createElement("option");
localOption.value = localTimezone;
localOption.textContent = localCityName;
citySelect.insertBefore(localOption, citySelect.firstChild);

function updateTime(cityElement) {
    const timezone = cityElement.dataset.timezone;
    const now = new Date();

    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timezone };
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

    cityElement.querySelector(".time").textContent = new Intl.DateTimeFormat("en-US", optionsTime).format(now);
    cityElement.querySelector(".date").textContent = new Intl.DateTimeFormat("en-US", optionsDate).format(now);
}

function startUpdatingTimes() {
    document.querySelectorAll(".city").forEach(city => updateTime(city));
}

citySelect.addEventListener("change", function () {
    const timezone = this.value;
    const cityName = this.options[this.selectedIndex].text;

    if (!timezone) {
        this.value = "";
        return;
    }

    // Prevent duplicates
    if (document.querySelector(`.city[data-timezone="${timezone}"]`)) {
        alert(`${cityName} is already in the list!`);
        this.value = "";
        return;
    }

    // Create a new city block
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("city");
    cityDiv.dataset.timezone = timezone;
    cityDiv.innerHTML = `
        <div class="city-header">
            <h2>${cityName}</h2>
            <div class="time"></div>
        </div>
        <div class="date"></div>
    `;

    document.getElementById("citiesContainer").appendChild(cityDiv);
    this.value = "";
});


startUpdatingTimes();
setInterval(startUpdatingTimes, 1000);
