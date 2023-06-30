import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  time: string | undefined;
  linkId: string | undefined;
  address: string | undefined;
};
type secondProps = {
  address: string | undefined;
};
async function createNewFlow(recipient: any, flowRate: number) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const chainId = await (window as any).ethereum.request({
    method: "eth_chainId",
  });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("fDAIx");

  console.log(daix);

  try {
    const createFlowOperation = daix.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate.toString(),
    });

    console.log(createFlowOperation);
    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    alert(`Error.See console for full trace`);
    console.error(error);
  }
}
function DialogDemo({ address }: secondProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Reward</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Enter flow rate</DialogTitle>
          <DialogDescription>
            Enter the desired flow rate at which you want to stream a token per
            sec
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 bg-black text-white">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Flow Rate
            </Label>
            <Input
              id="name"
              placeholder="10"
              className="col-span-3 bg-black text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={address}
              className="col-span-3 bg-black text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Confirm and Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default function TableInnerBody({ time, linkId, address }: Props) {
  const calculateFlowRate = (flowRate: number) => {
    const amountInWei = ethers.BigNumber.from(flowRate);
    const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
    const calculatedFlowRate = parseInt(monthlyAmount) * 3600 * 24 * 30;
    return calculatedFlowRate;
  };
  return (
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">{time}</TableCell>
        <TableCell>
          <a href={`https://lenster.xyz/posts/${linkId}`} target="_blank">
            Link
          </a>
        </TableCell>
        <TableCell>{address}</TableCell>
        <TableCell className="text-right">
          <button
            onClick={() =>
              createNewFlow(
                "0x3781c0e2BB968e69D599E5d22472e5b8821A7bbc", // just for testing, rather than spamming unknown addrs
                calculateFlowRate(10)
              )
            }
          >
            Reward
          </button>
          {/* <DialogDemo address="0x3781c0e2BB968e69D599E5d22472e5b8821A7bbc" /> */}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
