fetch('/api/currency-rates')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Currency data received:', data);
        displayCurrencyRates(data);
        populateCurrencyOptions(data);
    })
    .catch(error => {
        console.error('Error fetching currency rates:', error);
    });

function displayCurrencyRates(data) {
    const ratesElement = document.getElementById('currencyRates');
    if (ratesElement && data && data.rates) {
        ratesElement.innerHTML = '';
        Object.keys(data.rates).forEach(currency => {
            ratesElement.innerHTML += `<div>${currency}: ${data.rates[currency]}</div>`;
        });
    } else {
        console.error('Invalid or missing data:', data);
        ratesElement.innerHTML = 'Currency rates data is unavailable.';
    }
}

function populateCurrencyOptions(data) {
    const currencySelect = document.getElementById('currency');
    if (currencySelect && data && data.rates) {
        Object.keys(data.rates).forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.text = currency;
            currencySelect.appendChild(option);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currencyConversionForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const amount = document.getElementById('amount').value;
            const currency = document.getElementById('currency').value;
            fetch('/api/currency-rates')
                .then(response => response.json())
                .then(data => {
                    if (data && data.rates && data.rates[currency]) {
                        const result = amount * data.rates[currency];
                        document.getElementById('conversionResult').innerText = `${amount} EUR is approximately ${result.toFixed(2)} ${currency}`;
                    } else {
                        document.getElementById('conversionResult').innerText = 'Conversion error';
                    }
                })
                .catch(error => {
                    console.error('Error during conversion:', error);
                    document.getElementById('conversionResult').innerText = 'Conversion error';
                });
        });
    }
});
