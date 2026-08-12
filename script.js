async function getWeather() {
    // 1. Get the city the student typed
    const city = document.getElementById("city").value;
    const resultDiv = document.getElementById("result");

    // Instructor Checkpoint: Verify the student spelled 'city' correctly.
    if (!city) {
        showMessagePara("Please type a city name.");
        return;
    }

    // Instructor setup: Free API Key
    const apiKey = "e18b64f1788ca5afd4c5c535058cac97";

    // 2. Build the API 'order' (the URL)
    const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;

    try {
        // 3. 'Fetch' the data from the kitchen (OpenWeatherMap server)
        const response = await fetch(url);

        // Check if the waiter (response) brought back success
        if (!response.ok) {
            throw new Error(`We couldn't find '${city}'. Please check your spelling.`);
        }

        // 4. Open the JSON takeaway box
        const data = await response.json();

        // 5. Dynamic DOM Update: Put the food (data) onto the 'plate'
        resultDiv.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp)} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        `;
        resultDiv.classList.remove('hidden');

    } catch (error) {
        console.log("Calculations aren't working/screen is empty:", error);
        showMessagePara(`Error: ${error.message}`);
    }
}

// Simple helper function to clear the DOM and show a message
function showMessagePara(text) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = <p class="error-message">${text}</p>;
    resultDiv.classList.remove('hidden');
}

// Optional UX bonus: Allow pressing 'Enter' to search
document.getElementById('city').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});
