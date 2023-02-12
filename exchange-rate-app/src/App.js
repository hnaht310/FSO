import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState('');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log('effect run, currency is now');
    if (currency) {
      console.log('fetching exchange rates...');
      axios
        .get(
          `https://v6.exchangerate-api.com/v6/0b04a216bad5210625d3cf63/latest/${currency}`
        )
        .then((response) => {
          setRates(response.data.conversion_rates);
          console.log(response);
        });
    }
  }, [currency]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrency(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        currency: <input value={value} onChange={handleChange} />
        <button type='submit'>exchange rate</button>
      </form>
      <pre>{JSON.stringify(rates, null, 2)}</pre>
    </div>
  );
};

export default App;
