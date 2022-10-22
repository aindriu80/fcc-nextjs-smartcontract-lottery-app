// Creating a function to enter the lottery
import { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi, contractAddresses } from '../constants'
import { ethers } from 'ethers'

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState('0')

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkID
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee,
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkID
    functionName: 'getEntranceFee',
    params: {},
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read the raffle entrance fee
      async function updatedUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        setEntranceFee(entranceFeeFromCall)
      }
      updatedUI()
    }
  }, [entranceFee, getEntranceFee, isWeb3Enabled, setEntranceFee])

  return (
    <div>
      <br />
      Hello from Lottery Entrance, <br />
      {raffleAddress ? (
        <div>
          <button
            onClick={async function () {
              await enterRaffle()
            }}>
            Enter Raffle
          </button>
          <br />
          Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH
        </div>
      ) : (
        <div>No Raffle Address Deteched</div>
      )}
    </div>
  )
}
