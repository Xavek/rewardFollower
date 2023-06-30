import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableInnerBody from "@/components/ui/tableBody";
import { getPublicationComments } from "@/lib/lensMethods";
import React, { useEffect } from "react";
import { CommentFragment, PublicationFragment } from "@lens-protocol/client";

export default function CommentDetail() {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = React.useState<string>("");
  const [isConnected, setConnected] = React.useState<boolean>(false);
  const [commentsPresent, setCommentsPresent] = React.useState<boolean>(false);
  const [commentsOf, setCommentsOf] = React.useState<PublicationFragment[]>([]);
  const data = Object.keys(router.query);
  useEffect(() => {
    async function feth() {
      const userComments = await getPublicationComments(data[0]);
      setCommentsPresent(true);
      setCommentsOf(userComments.reverse().slice(0, 5));
    }
    feth();
  }, []);
  const handleWalletConnect = async () => {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setConnected(true);
      setCurrentAccount(accounts[0]);
      // account = currentAccount;
      //       // Setup listener! This is for the case where a user comes to our site
      //       // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="m-16 p-2">
        <button className="py-2 rounded-full" onClick={handleWalletConnect}>
          {isConnected
            ? `${currentAccount.substring(0, 4)}...${currentAccount.substring(
                38
              )}`
            : "Connect To Wallet"}
        </button>
      </div>
      <div className="m-16 p-2">
        <Table>
          <TableCaption>A list of first 5 Comments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Comment By</TableHead>
              <TableHead className="text-right">Reward</TableHead>
            </TableRow>
          </TableHeader>
          {commentsPresent
            ? commentsOf.map((singleData, i) => {
                return (
                  <>
                    <TableInnerBody
                      address={singleData.profile.ownedBy}
                      linkId={singleData.id}
                      time={singleData.createdAt}
                      key={i}
                    />
                  </>
                );
              })
            : null}
        </Table>
      </div>
    </div>
  );
}
