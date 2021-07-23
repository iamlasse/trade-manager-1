import React from 'react'
import { useTrades } from '../../hooks/useTrades'

export default function TradeRow({ trade }) {
  const tradeService = useTrades()
  const approximate = "\u2248"
  const { profit, pips, isProfit, type } = trade
  const isBuy = type === "BUY"

  const symbolClasses = {
    BUY: 'bg-green-200',
    SELL: 'bg-red-200'
  }
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">

          <div className="ml-3">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden="true"
                className={`absolute inset-0 opacity-50 rounded-full ${symbolClasses[type]}`}
              />
              <span className="relative"> {trade.symbol}</span>
            </span>

          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {trade.entryPrice}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {trade.size}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">
          {profit}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

        <p className="">
          {Number(pips).toFixed(0)}
        </p>
      </td>
    </tr>
  )
}
