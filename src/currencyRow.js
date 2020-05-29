import React from "react";
import "./styles.css";

function currencyRow({
  currencies,
  defaultCurrency,
  amount,
  onChangeCurrency,
  onChangeAmount,
}) {
  return (
    <div className='currency-row'>
      <input
        type='number'
        name='currencyInput'
        id='currencyInput'
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        name='currencySelect'
        id='currencySelect'
        value={defaultCurrency}
        onChange={onChangeCurrency}>
        {currencies.map((currency) => {
          return (
            <option key={Math.random()} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default currencyRow;
