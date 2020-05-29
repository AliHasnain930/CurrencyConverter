import React, { Component } from "react";
import "./styles.css";
import CurrencyRow from "./currencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      fromCurrency: "",
      toCurrency: "",
      fromAmount: "",
      toAmount: "",
      exchangeRate: undefined,
      isFromCurrencyChanged: true,
    };
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        let exchangeRate = data.rates[Object.keys(data.rates)[0]];
        this.setState({
          currencies: [data.base, ...Object.keys(data.rates)],
          fromCurrency: data.base,
          toCurrency: Object.keys(data.rates)[0],
          fromAmount: 1,
          toAmount: this.state.fromAmount * exchangeRate,
          exchangeRate: exchangeRate,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.fromCurrency !== this.state.fromCurrency ||
      prevState.toCurrency !== this.state.toCurrency
    ) {
      fetch(
        `${BASE_URL}?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => {
          let fromAmount,
            toAmount,
            exchangeRate = data.rates[Object.keys(data.rates)[0]];
          if (this.state.isFromCurrencyChanged) {
            fromAmount = this.state.fromAmount;
            toAmount = fromAmount * exchangeRate;
          } else {
            toAmount = this.state.toAmount;
            fromAmount = toAmount / exchangeRate;
          }
          this.setState({
            exchangeRate: exchangeRate,
            fromAmount: fromAmount,
            toAmount: toAmount,
          });
        });
    }
  }

  handleToChangeCurrency = (e) => {
    this.setState({
      toCurrency: e.target.value,
      isFromCurrencyChanged: false,
    });
  };

  handleFromChangeCurrency = (e) => {
    this.setState({
      fromCurrency: e.target.value,
      isFromCurrencyChanged: true,
    });
  };

  handleToChangeAmount = (e) => {
    const fromAmount = e.target.value / this.state.exchangeRate;
    this.setState({
      toAmount: e.target.value,
      fromAmount: fromAmount,
    });
  };

  handleFromChangeAmount = (e) => {
    const toAmount = e.target.value * this.state.exchangeRate;
    this.setState({
      toAmount: toAmount,
      fromAmount: e.target.value,
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='currency-converter'>
          <h1>Currency Converter</h1>
          <CurrencyRow
            currencies={this.state.currencies}
            defaultCurrency={this.state.fromCurrency}
            amount={this.state.fromAmount}
            onChangeCurrency={(e) => this.handleFromChangeCurrency(e)}
            onChangeAmount={(e) => this.handleFromChangeAmount(e)}
          />
          <div className='equals'>
            <p>=</p>
          </div>
          <CurrencyRow
            currencies={this.state.currencies}
            defaultCurrency={this.state.toCurrency}
            amount={this.state.toAmount}
            onChangeCurrency={(e) => this.handleToChangeCurrency(e)}
            onChangeAmount={(e) => this.handleToChangeAmount(e)}
          />
        </div>
      </div>
    );
  }
}

export default App;
