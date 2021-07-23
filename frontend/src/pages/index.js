import React, { useEffect } from "react";
import Account from "../components/accounts/account-view";
import Content from "../components/content";
import { useAccounts } from "../hooks/useAccounts";
import { useFeathersContext } from "../hooks/useFeathers";


export default function HomePage() {
  const { client, getService } = useFeathersContext()
  const { accounts = {}, refreshAccounts } = useAccounts()
  const { data: allAccounts } = accounts




  const tradeService = getService('trades')

  useEffect(() => {
    tradeService?.on("created", (createdTrade) => {
      console.log(`trade created`, createdTrade)
      // messages.unshift(formatMessage(createdMessage))
      refreshAccounts()
    })
    tradeService?.on("removed", (removedTrade) => {
      refreshAccounts()
      // deleteMessage(removedMessage)
    })

    tradeService?.on('updated', (updatedTrade) => {
      console.log(`updated trade`, updatedTrade)
      refreshAccounts()
      // deleteMessage(removedMessage)
    })

    tradeService?.on('patched', (updatedTrade) => {
      console.log(`patched trade`, updatedTrade)
      refreshAccounts()
      // deleteMessage(removedMessage)
    })

    return () => {
      // cleanup
    }
  }, [tradeService, refreshAccounts])

  useEffect(() => {
    (async () => {
      await client?.authenticate({
        strategy: 'local',
        email: 'iamlasse@gmail.com',
        password: 'test'
      })
    })()
    return () => {
      // cleanup
    }
  }, [client])

  return <Content>
    {allAccounts?.map(account => <Account key={account.id} account={account} />)}
  </Content>
}
