 const citySelect = document.getElementById("citySelect");
        const citiesContainer = document.getElementById("citiesContainer");

        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        function updateTime(cityElement) {
            let timezone = cityElement.dataset.timezone;
            if (timezone === "current") timezone = localTimezone;

            const now = new Date();

            const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timezone };
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

            const timeElem = cityElement.querySelector(".time");
            const dateElem = cityElement.querySelector(".date");

            if (timeElem && dateElem) {
                timeElem.textContent = new Intl.DateTimeFormat("en-US", optionsTime).format(now);
                dateElem.textContent = new Intl.DateTimeFormat("en-US", optionsDate).format(now);
            }
        }

        function updateAllTimes() {
            document.querySelectorAll(".city").forEach(updateTime);
        }

        citySelect.addEventListener("change", function () {
            const timezone = this.value;
            const cityName = this.options[this.selectedIndex].text;

            if (!timezone) return;

            
            if (document.querySelector(`.city[data-timezone="${timezone}"]`)) {
                alert(`${cityName} is already in the list!`);
                this.value = "";
                return;
            }

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

            citiesContainer.appendChild(cityDiv);
            updateTime(cityDiv); 
            this.value = "";
        });

        
        updateAllTimes();
        setInterval(updateAllTimes, 1000);