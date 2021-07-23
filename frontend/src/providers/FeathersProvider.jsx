import React from "react"
import { FeathersContext, useFeathers } from "../hooks/useFeathers"

export const FeathersProvider = ({ children }) => {
  const { client, getService } = useFeathers()
  return (
    <FeathersContext.Provider value={{ client, getService }}>{children}</FeathersContext.Provider>
  )
}
