import React from 'react'
import { useAccounts } from '../../hooks/useAccounts'
import { useService } from '../../hooks/useFeathers'
import { usePrices } from '../../hooks/usePrices'
import TradeRow from '../trades/trade-row'

const getCurrencyCoeff = (currency) => {
  return Number(
    {
      EUR: 0.215,
      USD: 0.135,
    }[currency] || 0.14,
  )
}



const sortTrades = (a, b) => a.symbol.localeCompare(b.symbol)
const isOpen = (trade) => trade.isOpen

// Component
export default function Account({ account, title = "Test" }) {
  const { refreshAccounts } = useAccounts()
  const { prices = {}, pipsMoved } = usePrices()
  const hasPrices = Boolean(Object.keys(prices).length)

  const { trades = {} } = account

  const calcProfitPips = ({ size, isAsian, type, symbol, entryPrice }) => {
    const current = hasPrices ? prices[symbol].current : 0
    const pips = Number(pipsMoved(entryPrice, current, type))
    const isProfit = pips >= 0
    const lotSize = isAsian ? 10000 : 100000
    const pipsValue = Number(pips / lotSize)
    const profit = Number(Number(size * lotSize * pipsValue * 10).toFixed(2))
    // console.log(`profit`, profit, pips, size, lotSize, pipsValue)
    return {
      profit: Number(Number(profit - getCurrencyCoeff(account.currency) * profit).toFixed(2)),
      pips: Math.round(pips),
      isProfit,
    }
  }

  const mapTrades = (t): [] => ({
    ...t,
    ...calcProfitPips(t),
  })

  const getTrades = (trades): [] => {
    return trades?.filter(isOpen).sort(sortTrades).map(mapTrades)
  }
  return (
    <div className="py-8">
      <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
        <h2 className="text-2xl leading-tight md:pr-0 text-white">{account.name}</h2>
        <div className="text-end">
          <form className="flex w-full space-x-3">
            <div className=" relative ">
              <input
                type="text"
                id='"form-subscribe-Filter'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="name"
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Filter
            </button>
          </form>
        </div>
      </div>
      <div className="py-4">
        <div className="max-w-full overflow-x-auto shadow rounded-lg">
          <table className="w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  SYMBOL
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  ENTRY PRICE
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  LOT SIZE
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  PROFIT
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  PIPS
                </th>
              </tr>
            </thead>
            <tbody>
              {trades?.data && getTrades(trades?.data).map(trade => <TradeRow key={trade.id} trade={trade} />)}
            </tbody>
          </table>
          <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
              >
                <svg
                  width="9"
                  fill="currentColor"
                  height="8"
                  className=""
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
                </svg>
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
              >
                1
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                2
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                3
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                4
              </button>
              <button
                type="button"
                className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
              >
                <svg
                  width="9"
                  fill="currentColor"
                  height="8"
                  className=""
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
