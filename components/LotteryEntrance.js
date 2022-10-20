// Creating a function to enter the lottery
import { useEffect } from 'react'
import { useWeb3Contract } from 'react-moralis'
import { abi, contractAddresses } from '../constants'
import { useMoralis } from 'react-moralis'

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null

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
        const entranceFeeFromContract = await getEntranceFee()
        console.log(entranceFeeFromContract)
      }
      updatedUI()
    }
  }, [getEntranceFee, isWeb3Enabled])

  return <div>Hello from Lottery Entrance</div>
}
