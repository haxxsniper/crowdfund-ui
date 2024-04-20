'use client';

import { useWatchContractEvent } from 'wagmi'
import { crowdfundAbi } from "./abi";
import { CROWDFUND_CONTRACT_ADDRESS_BAOBAB } from "./contracts";

export default function LaunchEventList() {
  useWatchContractEvent({
    address: CROWDFUND_CONTRACT_ADDRESS_BAOBAB,
    abi: crowdfundAbi,
    eventName: 'Launch',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    poll: true,
  })
  return null
}