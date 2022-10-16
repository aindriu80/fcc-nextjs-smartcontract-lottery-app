import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
export default function ManualHeader() {
  const { enableWeb3, account, isWeb3Enabled } = useMoralis()
  useEffect(() => {
    console.log('useEffect.....')
    console.log(isWeb3Enabled)
  }, [])
  // no dependency array : run anytime something re-renders
  // CAREFUL with this!! because you can get circular render
  // blnnk dependency array, only run once.

  return (
    <div>
      {account ? (
        <div>Connected to {account}!</div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3()
          }}>
          Connect
        </button>
      )}
    </div>
  )
}
