import { ConnectButton } from 'web3uikit'

export default function Header() {
  return (
    <div className="ml-auto py-2 px-4">
      <ConnectButton moralisAuth={false} />
    </div>
  )
}
