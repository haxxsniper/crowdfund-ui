"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { crowdfundAbi } from "./abi";
import { CROWDFUND_CONTRACT_ADDRESS_BAOBAB } from "./contracts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CrowdFundDetails() {
  const [campaignId, setCampaignId] = useState(0); // [1, 2, 3, 4, 5]
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
    args: [// if campaignId is null or undefined, use 0
      
      campaignId ? BigInt(campaignId) : BigInt(0)
    ],
    // query: {
    //   // if campaignId is 0, don't query
    //   enabled: !!campaignId,
    // },
  });

  function handleCampaignIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCampaignId(parseInt(event.target.value));
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow-xl w-full lg:max-w-3xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">Campaign details</h1>
        <Button variant="outline" size="icon" onClick={() => refetch()}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <Input className="w-full" placeholder="Enter campaign ID" onChange={handleCampaignIdChange}/>
      <p className="italic text-sm">
        Current campaign details
      </p>
      {isPending && isFetched ? (
        <Skeleton className="w-[50px] h-[20px]" />
      ) : isSuccess ? (
        <ul className="text-xl font-mono">
          {
            campaignDetails?.map((detail, index) => (
              <li key={index}>{detail.toString()}</li>
            ))
          }
        </ul>
      ) : (
        <Badge className="w-fit" variant="secondary">
          Enter a campaign ID to get details
        </Badge>
      )}
    </div>
  );
}

