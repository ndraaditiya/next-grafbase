'use client'

import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Button from './Button'

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams: Record<string, string> | null
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res: any = await getProviders()

      setProviders(res)
    }

    fetchProviders()
  }, [])

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider) => (
          <Button
            title='Sign In'
            key={provider.id}
            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    )
  }

  return <div>Auth Providers</div>
}

export default AuthProviders
