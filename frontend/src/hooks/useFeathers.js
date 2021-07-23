import feathers, { authentication, socketio } from "@feathersjs/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import hooks from "feathers-hooks"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
export const FeathersContext = createContext();
export const useFeathersContext = () => useContext(FeathersContext)
export const useFeathers = () => {
  const [client, setClient] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const [socketState, setSocketState] = useState({
    isConnecting: false,
    isConnected: false,
    isAuthenticating: false,
    isAuthenticated: false,
  })

  const updateState = (key, value) => {
    console.log(`updateState: `, key, value)
    setSocketState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const setIsConnecting = (state) => updateState("isConnecting", state)
  const setIsConnected = (state) => updateState("isConnected", state)
  const setIsAuthenticated = (state) => updateState("isAuthenticated", state)
  const setIsAuthenticating = (state) => updateState("isAuthenticating", state)

  const login = async (credentials = undefined) => {
    try {
      const userInfo = await client?.authenticate({
        strategy: "local",
        ...credentials,
      })

      setUserInfo(userInfo)
      setIsAuthenticated(true)
      setIsAuthenticating(false)
    } catch (error) { }
  }

  const setupSocket = useCallback(async () => {
    console.log(`setup socket`, client)
    // const emit =
  }, [client])

  const getService = (service) => client?.service(service)
  const getClient = () => client

  const authenticate = async () => {
    try {
      setIsAuthenticating(true)
      const { user = undefined, ...rest } = await client?.reAuthenticate()
      console.log(`response`, rest)
      setUserInfo(user)
      if (client?.authentication?.authenticated) {
        setIsAuthenticated(client?.authentication?.authenticated)
      }

      setIsAuthenticating(false)
    } catch ({ name, message, type }) {
      setIsAuthenticating(false)
      console.log(`error`, name, message, type)
    }
  }

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030'
    console.log(`API_URL`, API_URL)
    const options = { transports: ["websocket"], pingTimeout: 3000, pingInterval: 5000 }
    const socketIO = io(API_URL, options)
    setIsConnecting(true)
    const app = feathers()
      .configure(socketio(socketIO))
      .configure(hooks)
      .configure(
        authentication({
          storage: AsyncStorage, // To store our accessToken
        }),
      )

    setClient(app)
    setIsConnected(true)
    setIsConnecting(false)
  }, [setClient])

  useEffect(() => {
    async function startApp() {
      await authenticate()
      await setupSocket()
    }
    startApp()
  }, [client])

  return {
    ...socketState,
    userInfo,
    client,
    getService,
    getClient,
    login,
    authenticate,
  }
}


export const useService = (service) => {
  const { getService } = useFeathers()

  return getService(service)
}