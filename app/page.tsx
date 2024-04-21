import { ConnectButton } from '@rainbow-me/rainbowkit';
import GetWKLAY from '@/components/get-wklay';
import MyWKLAY from '@/components/wklay-balance';
import UnwrapWKLAY from '@/components/unwrap-wklay';
import Launch from '@/components/launch';
import LaunchEventList from '@/components/launch-event-list';
import Pledge from '@/components/pledge';
import CrowdFundDetails from '@/components/crowdfund-details';
import ApproveWKLAY from '@/components/approve-wklay';
import UnPledge from '@/components/unpledge';
import Claim from '@/components/claim';

export default function Home() {

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-12 px-4 p-48:lg">
      <ConnectButton />
      <MyWKLAY />
      <GetWKLAY />
      <UnwrapWKLAY />
      <Launch />
      <LaunchEventList />
      <ApproveWKLAY />
      <CrowdFundDetails />
      <Pledge />
      <UnPledge />
      <Claim />
    </div>
  );
}