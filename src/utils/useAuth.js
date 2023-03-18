import { useState, useEffect } from "react"
import { Auth } from "aws-amplify"

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch (error) {
        setUser(null)
      }
    }

    checkUser()
  }, [])

  return { user }
}
