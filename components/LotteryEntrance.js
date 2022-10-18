// Creating a function to enter the lottery
import { useWeb3Contract } from 'react-moralis'
export default function LotteryEntrance() {
	const {runContractFunction: raffle} = useWeb3Contract({
		abi: //,
		contractAddress: //,
		functionName: //,
		params:{},
		msgValue:

	})
  return <div>Hello from Lottery Entrance</div>
}
