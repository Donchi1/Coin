import React from 'react'

function MarketPrice() {
  const currencies = [
    'EUR',
    'USD',
    'JPY',
    'BTC',
    'ETH',
    'LTC',
    'GBP',
    'CHF',
    'AUD',
    'CAD',
    'NZD',
    'CNY',
  ]
  const datainfo = {
    width: '100%',
    height: '100%',
    utm_source: 'cryptostock24.com',
    utm_medium: 'widget',
    utm_campaign: 'forex-cross-rates',
  }

  return (
    <div className="container pb-4">
      <h4 className="text-center text-light py-3">
        {' '}
        Forex Market Fundamental Data
      </h4>
      <iframe
        scrolling="no"
        allowtransparency="true"
        frameBorder="0"
        title="Forex Trading Data"
        src={`https://s.tradingview.com/embed-widget/forex-cross-rates/?locale=en#{currencies:${currencies},${datainfo}}`}
        style={{
          boxSizing: 'borderBox',
          height: '70vh',
          width: '100%',
        }}
      ></iframe>
    </div>
  )
}

export default MarketPrice
