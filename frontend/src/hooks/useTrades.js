import { useEffect, useState } from "react"
import { useAccounts } from "./useAccounts"
import { useService } from "./useFeathers"

export const useTrades = () => {
  const tradeService = useService("trades")
  const { refreshAccounts } = useAccounts()
  useEffect(() => {



  }, [tradeService, refreshAccounts])

  const addTrade = async (trade) => {
    try {
      const response = await tradeService?.create(trade)
      if (response) {
        return {
          success: true,
        }
      }

      throw new Error("Failed to add trade")
    } catch (error) {
      console.log(`error`, error)
      return {
        success: false,
        error,
      }
    }
  }

  const updateTrade = async (trade) => {
    const { id, profit, pips, isProfit, ...data } = trade
    try {
      const response = await tradeService?.patch(id, { ...data })
      if (response) {
        return {
          success: true,
        }
      }

      throw new Error("Failed to update trade")
    } catch (error) {
      console.log(`error`, error)
      return {
        success: false,
        error,
      }
    }
  }
  const deleteTrade = async (trade) => {
    const { id } = trade
    try {
      const response = await tradeService?.remove(id)
      if (response) {
        return {
          success: true,
        }
      }

      throw new Error("Failed to delete trade")
    } catch (error) {
      console.log(`error`, error)
      return {
        success: false,
        error,
      }
    }
  }

  const closeTrade = async (id) => {
    try {
      const response = await tradeService?.patch(id, {
        isOpen: false,
      })
      if (response) {
        return {
          success: true,
        }
      }
      throw new Error("Failed to close trade")
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }

  return {
    addTrade,
    updateTrade,
    deleteTrade,
    closeTrade,
  }
}
