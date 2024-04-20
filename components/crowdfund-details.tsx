"use client";

import { useReadContract } from "wagmi";
import { crowdfundAbi } from "./abi";
import { CROWDFUND_CONTRACT_ADDRESS_BAOBAB } from "./contracts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function CrowdFundDetails() {
  const {
    data: campaignDetails,
    isPending,
    isFetched,
    isSuccess,
    refetch
  } = useReadContract({
    abi: crowdfundAbi,
    address: CROWDFUND_CONTRACT_ADDRESS_BAOBAB,
    functionName: "campaigns",
    args: [BigInt(1)],
  });
  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow-xl w-full lg:max-w-3xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">My funded amount</h1>
        <Button variant="outline" size="icon" onClick={() => refetch()}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <p className="italic text-sm">
        Total amount of KLAY that I have funded the contract
      </p>
      {isPending && isFetched ? (
        <Skeleton className="w-[50px] h-[20px]" />
      ) : isSuccess ? (
        <p className="text-xl font-mono flex flex-row items-center">
          {
            // return the entire campaignDetails as a string
            campaignDetails.toString()
          }
        </p>
      ) : (
        <Badge className="w-fit" variant="secondary">
          Connect to see your funded amount
        </Badge>
      )}
    </div>
  );
}