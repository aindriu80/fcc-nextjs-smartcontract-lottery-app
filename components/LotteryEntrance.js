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

  // const { runContractFunction: raffle } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: raffleAddressess, // specify the networkID
  //   functionName: 'enterRaffle',
  //   params: {},
  //   msgValue: {},
  // })

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
        setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall, 'ether'))
      }
      updatedUI()
    }
  }, [entranceFee, getEntranceFee, isWeb3Enabled, setEntranceFee])

  return (
    <div>
      <br />
      Hello from Lottery Entrance, <br />
      Entrance Fee: {entranceFee} ETH
    </div>
  )
}
