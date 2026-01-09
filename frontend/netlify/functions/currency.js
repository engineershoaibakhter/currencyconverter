const API_KEY = process.env.FREECURRENCY_API_KEY;
const API_BASE = process.env.FREECURRENCY_API_BASE || 'https://api.freecurrencyapi.com/v1';

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (!API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Server misconfigured: missing FREECURRENCY_API_KEY env var'
      })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/currency', '');
  
  try {
    // Health check
    if (path === '/health' || path === '') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() })
      };
    }

    // Get supported currencies
    if (path === '/currencies') {
      const response = await fetch(`${API_BASE}/currencies?apikey=${API_KEY}`);
      const data = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data.data || data)
      };
    }

    // Convert currency (GET with query params)
    if (path === '/convert') {
      const params = event.queryStringParameters || {};
      const { from, to, amount, date } = params;

      // Check if historical date (past date) - not supported on free tier
      if (date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          return {
            statusCode: 402,
            headers,
            body: JSON.stringify({ 
              error: 'Historical rates require a paid API plan. Please use today\'s date or leave empty for current rates.' 
            })
          };
        }
      }

      // Get current rate
      const response = await fetch(
        `${API_BASE}/latest?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`
      );
      const data = await response.json();

      if (data.data && data.data[to]) {
        const rate = data.data[to];
        const result = parseFloat(amount) * rate;
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            from,
            to,
            amount: parseFloat(amount),
            rate,
            result,
            date: date || new Date().toISOString().split('T')[0]
          })
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Unable to fetch exchange rate' })
        };
      }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
