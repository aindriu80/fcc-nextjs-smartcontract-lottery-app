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
    <div>
      Hello from Lottery Entrance {console.log(raffleAddress)}
      <br />
      {raffleAddress ? (
        <div>
          <button
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }}>
            Enter Raffle
          </button>
          <br />
          Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH
          <br />
          Number of Players{numPlayers}
          <br />
          Recent Winner {recentWinner}
        </div>
      ) : (
        <div>No Raffle Address Deteched</div>
      )}
    </div>
  )
}
