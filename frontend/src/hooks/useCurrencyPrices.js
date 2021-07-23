import { useEffect, useState } from "react"
import { useFeathers, useService } from "./useFeathers"

export const useCurrencyPrices = () => {
  const priceService = useService('price')

  const [prices, setPrices] = useState({})
  const [isLoading, setIsLoading] = useState(false)





  console.log(`use currency prices`, priceService, prices)





  useEffect(() => {
    async function setup() {
      console.log(`setup priceService`, await priceService?.find())
      try {
        setIsLoading(true)
        const pricesFromService = await priceService?.find()
        console.log(`prices`, pricesFromService)
        setPrices(() => {
          setIsLoading(false)
          return pricesFromService?.data?.reduce(
            (acc, price) => ({
              ...acc,
              [price.symbol]: {
                symbol: price.symbol,
                current: price.current,
              },
            }),
            {},
          )
        })
      } catch (error) {
        return error
      }
    }

    setup()
    return () => {
      // cleanup
    }
  }, [priceService])

  useEffect(() => {
    priceService?.on("created", () => {
      reloadPrices()
    })
    priceService?.on("updated", (updatedPrice) => {
      console.log(`price updated`, updatedPrice)
      reloadPrices()
    })
    priceService?.on("removed", () => {
      reloadPrices()
    })
    return () => { }
  }, [])

  const reloadPrices = async () => {
    await priceService.find()
  }

  const pipsMoved = (priceEntry, priceNow, type = "SELL") => {
    const isBuy = type === "BUY"
    const divider = countDecimals(priceEntry) < 5 ? 0.01 : 0.0001
    return (isBuy ? priceNow - priceEntry : priceEntry - priceNow) / divider
  }

  return {
    prices,
    pipsMoved,
    isLoading,
    reloadPrices,
    isError: {},
  }
}

export const countDecimals = function (value) {
  if (Math.floor(value) === value) return 0
  return value.toString().split(".")[1].length || 0
}
