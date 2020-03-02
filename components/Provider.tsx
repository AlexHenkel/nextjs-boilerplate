import React, { useState } from 'react'
import { AuthContext } from 'utils/context'
import { initGA, logPageView } from 'utils/analytics'

const Provider: React.SFC = ({ children }) => {
  const [isAuth, toggleAuth] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('isAuth') === 'true' : false
  )

  // @ts-ignore
  if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
    initGA()
    // @ts-ignore
    window.GA_INITIALIZED = true
  }
  logPageView()

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        toggleAuth: (value: boolean) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('isAuth', value ? 'true' : 'false')
          }
          toggleAuth(value)
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default Provider
