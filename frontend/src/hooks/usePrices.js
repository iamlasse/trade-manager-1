import { createContext, useContext } from "react"

export const PriceContext = createContext({})
export const usePrices = () => useContext(PriceContext)