"use client";

import { useReadContract } from "wagmi";
import { wklayAbi } from "./abi";
import { WKLAY_CONTRACT_ADDRESS_BAOBAB } from "./contracts";
import { formatEther } from "viem";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccount } from "wagmi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function MyWKLAY() {
  const account = useAccount();
  const {
    data: amountFunded,
    isPending,
    isFetched,
    isSuccess,
    refetch
  } = useReadContract({
    abi: wklayAbi,
    address: WKLAY_CONTRACT_ADDRESS_BAOBAB,
    functionName: "balanceOf",
    args: [account.address ?? "0x0"],
    query: {
      // if account is not connected, don't query
      enabled: !!account.address,
    },
  });
  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow-xl w-full lg:max-w-3xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">My WKLAY balance</h1>
        <Button variant="outline" size="icon" onClick={() => refetch()}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <p className="italic text-sm">
        Total amount of WKLAY that I have
      </p>
      {isPending && isFetched ? (
        <Skeleton className="w-[50px] h-[20px]" />
      ) : isSuccess ? (
        <p className="text-xl font-mono flex flex-row items-center">
          {formatEther(amountFunded ?? BigInt(0))} WKLAY
        </p>
      ) : (
        <Badge className="w-fit" variant="secondary">
          Connect to see your WKLAY balance
        </Badge>
      )}
    </div>
  );
}