// Creating a function to enter the lottery
import { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi, contractAddresses } from '../constants'
import { ethers } from 'ethers'
import { useNotification } from 'web3uikit'

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const dispatch = useNotification()
  const [entranceFee, setEntranceFee] = useState('0')
  const [numPlayers, setNumPlayers] = useState('0')
  const [recentWinner, setRecentWinner] = useState('0')
  console.log(raffleAddress)

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
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

const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
  abi: abi,
  contractAddress: raffleAddress, // specify the networkID
  functionName: 'getNumberOfPlayers',
  params: {},
})

const { runContractFunction: getRecentWinner } = useWeb3Contract({
  abi: abi,
  contractAddress: raffleAddress, // specify the networkID
  functionName: 'getRecentWinner',
  params: {},
})

async function updateUI() {
  // try to read the raffle entrance fee
  const entranceFeeFromCall = await getEntranceFee()
  const numPlayersFromCall = await getNumberOfPlayers().toString()
  const recentWinnerFromCall = await getRecentWinner().toString
  setEntranceFee(entranceFeeFromCall)
  setNumPlayers(numPlayersFromCall)
  setRecentWinner(recentWinnerFromCall)
}

useEffect(() => {
  if (isWeb3Enabled) {
    updateUI()
  }
}, [entranceFee, getEntranceFee, isWeb3Enabled, setEntranceFee])

const handleSuccess = async function (tx) {
  await tx.wait(1)
  handleNewNotification(tx)
  updateUI()
}
const handleNewNotification = function () {
  dispatch({
    type: 'success',
    message: 'Transaction Complete!',
    title: 'Tx Notification',
    position: 'topR',
  })
}

return (
  <div className="p-5">
    Hello from Lottery Entrance
    <br />
    {raffleAddress ? (
      <div>
        <button
          className="px-2 py-2 ml-auto font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={async function () {
            await enterRaffle({
              onSuccess: handleSuccess,
              onError: (error) => console.log(error),
            })
          }}
          disabled={isLoading || isFetching}>
          {isLoading || isFetching ? (
            <div className="w-8 h-8 border-b-2 animate-spin spinner-border"></div>
          ) : (
            <div>Enter Raffle</div>
          )}
        </button>
        <br />
        Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH
        <br />
        Number of Players{numPlayers}
        <br />
        Recent Winner {recentWinner}
      </div>
    ) : (
      <div>No Raffle Address Detected</div>
    )}
  </div>
)
}
