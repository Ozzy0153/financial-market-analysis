// script.js

// Function to fetch currency rates and update the DOM
function fetchCurrencyRates() {
    fetch('/api/currency-rates')
        .then(response => response.json())
        .then(data => {
            displayCurrencyRates(data);
        })
        .catch(error => console.error('Error fetching currency rates:', error));
}

function displayCurrencyRates(data) {
    const ratesElement = document.getElementById('currencyRates');
    if (ratesElement && data && data.rates) {
        ratesElement.innerHTML = '';
        Object.keys(data.rates).forEach(currency => {
            ratesElement.innerHTML += `<p>${currency}: ${data.rates[currency]}</p>`;
        });
    } else {
        console.error('Invalid or missing data:', data);
        ratesElement.innerHTML = 'Currency rates data is unavailable.';
    }
}



// Call the fetch function on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrencyRates();
    // Add other functions you need to call on page load here
});
