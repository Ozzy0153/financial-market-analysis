document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('stockForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const symbol = document.getElementById('stockSymbol').value;
        fetchStockData(symbol);
    });

    document.querySelectorAll('.quick-link').forEach(button => {
        button.addEventListener('click', function() {
            const symbol = this.getAttribute('data-symbol');
            fetchStockData(symbol);
        });
    });

    function fetchStockData(symbol) {
        document.getElementById('stockSymbol').value = symbol;
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
    stockInfoDiv.innerHTML = '';

    if (Array.isArray(data)) {
        data.forEach(stock => {
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
                console.error('Invalid or missing data for a stock:', stock);
                stockInfoDiv.innerHTML += `<div class="stock-day">Error: Data for a requested stock is missing or incorrect format.</div>`;
            }
        });
    } else {
        console.error('Invalid or missing stock data:', data);
        stockInfoDiv.innerHTML += '<div class="stock-day">Error: Stock data is unavailable or in incorrect format.</div>';
    }
}

