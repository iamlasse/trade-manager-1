import React from "react"
import { useCurrencyPrices } from "../hooks/useCurrencyPrices"
import { PriceContext } from "../hooks/usePrices"

export const PriceProvider = ({ children }) => {
  const { prices, isError, isLoading, isValidating, pipsMoved } = useCurrencyPrices() || {}
  console.log(`prices from api`, prices, isValidating)
  return (
    <PriceContext.Provider value={{ prices, isLoading, isError, isValidating, pipsMoved }}>
      {children}
    </PriceContext.Provider>
  )
}
