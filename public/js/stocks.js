document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the stock form submission
    document.getElementById('stockForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const symbol = document.getElementById('stockSymbol').value;
        fetchStockData(symbol); // Assuming fetchStockData is a modified function to fetch data
    });

    // Attach event listeners to quick link buttons
    document.querySelectorAll('.quick-link').forEach(button => {
        button.addEventListener('click', function() {
            const symbol = this.getAttribute('data-symbol');
            fetchStockData(symbol); // Fetch stock data when a quick link is clicked
        });
    });

    function fetchStockData(symbol) {
        document.getElementById('stockSymbol').value = symbol; // Update the input field
        fetch(`/api/stocks?symbol=${symbol}`)
            .then(response => response.json())
            .then(data => {
                displayStockData(data);
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
            });
    }
});

function displayStockData(data) {
    const stockInfoDiv = document.getElementById('stockInfo');
    stockInfoDiv.innerHTML = ''; // Clear previous content

    if (Array.isArray(data)) {
        data.forEach(stock => {
            // Check if 'Meta Data' and 'Time Series (Daily)' exist before accessing
            if (stock['Meta Data'] && stock['Time Series (Daily)']) {
                const dates = Object.keys(stock['Time Series (Daily)']);
                if (dates.length > 0) {
                    const latestDate = dates[0];
                    const latestData = stock['Time Series (Daily)'][latestDate];
                    stockInfoDiv.innerHTML += `<div class="stock-day">
                        <h2>${stock['Meta Data']['2. Symbol']}</h2>
                        <p>Date: ${latestDate}</p>
                        <p>Open: ${latestData['1. open']}</p>
                        <p>High: ${latestData['2. high']}</p>
                        <p>Low: ${latestData['3. low']}</p>
                        <p>Close: ${latestData['4. close']}</p>
                        <p>Volume: ${latestData['5. volume']}</p>
                    </div>`;
                }
            } else {
                // If 'Meta Data' or 'Time Series (Daily)' don't exist, display an error message for this stock
                console.error('Invalid or missing data for a stock:', stock);
                stockInfoDiv.innerHTML += `<div class="stock-day">Error: Data for a requested stock is missing or incorrect format.</div>`;
            }
        });
    } else {
        console.error('Invalid or missing stock data:', data);
        stockInfoDiv.innerHTML += '<div class="stock-day">Error: Stock data is unavailable or in incorrect format.</div>';
    }
}

