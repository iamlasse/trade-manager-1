import { useCallback, useEffect, useState } from "react"
import { useFeathers, useFeathersContext, useService } from "./useFeathers"

function uniqueArray(a) {
  return [...new Set(a)]
}

export const useAccounts = () => {
  const { client, getService } = useFeathersContext()
  const accountService = getService("accounts")

  const [accounts, setAccounts] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function setupAccounts() {
      setIsLoading(true)
      console.log(`client`, client)
      // return
      const newAccounts = await accountService?.find()
      // newAccounts && accountStore.saveAccounts(newAccounts)
      // console.log(`accountService`, newAccounts)
      console.log(`newAccounts`, newAccounts)
      newAccounts && setAccounts(newAccounts)
      setIsLoading(false)
    }

    setupAccounts()
    return () => {
      // cleanup
    }
  }, [client, accountService])

  const refreshAccounts = useCallback(async () => {
    const refreshedAccounts = await accountService?.find()
    console.log(`refresh`, refreshedAccounts)
    setAccounts(refreshedAccounts)
  }, [accountService])

  const getSymbols = () =>
    uniqueArray(
      accounts?.data
        ?.map((a) => a.trades.data)
        ?.reduce((acc, a) => [...new Set(acc), ...a], [])
        ?.map((t) => t.symbol),
    ).join()

  return {
    symbols: getSymbols(),
    accounts,
    refreshAccounts,
    isLoading
    // error,
    // isValidating,
  }
}
