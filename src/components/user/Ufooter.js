import React from 'react'

const Ufooter = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a href="https://ultimatecoins.info" target="_blank">
            UltimateCoins
          </a>{' '}
          All Rights Reserve
        </p>
      </div>
      <div className="copyright">
        <p>Easy ways to purchase cryptocurrency</p>
        <p>
          <a href="https://paxful.com" target="_blank">
            Paxful
          </a>
          <a className="ml-3" href="https://coinbase.com" target="_blank">
            Coinbase
          </a>
          <a className="ml-3" href="https://coinmama.com" target="_blank">
            Coinmama
          </a>
          <a className="ml-3" href="https://moonpay.com" target="_blank">
            Moonpay
          </a>
          <a className="ml-3" href="https://localbitcoin.com" target="_blank">
            Localbitcoin
          </a>
        </p>
      </div>
    </div>
  )
}

export default Ufooter
