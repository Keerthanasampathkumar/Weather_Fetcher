const fetchBtn = document.getElementById("fetchBtn");
const output = document.getElementById("weatherOutput");

async function getWeather(city) {
  const apiKey = "1d8af4ac684b4fa480a100020251107"; 
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found or API error");

    const data = await response.json();
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const location = data.location.name + ", " + data.location.country;

    output.innerHTML = `
      <strong>Location:</strong> ${location}<br>
      <strong>Temperature:</strong> ${temp} °C<br>
      <strong>Condition:</strong> ${condition}
    `;
  } catch (error) {
    output.innerHTML = `Error: ${error.message}`;
  }
}

fetchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    output.innerHTML = "Fetching weather...";
    getWeather(city);
  } else {
    output.innerHTML = "Please enter a city name.";
  }
});
