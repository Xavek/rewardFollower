import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type propTypes = {
  name: string | undefined | null;
  handle: string | undefined;
  bio: string | undefined | null;
  followers: number | undefined;
  following: number | undefined;
  totalPost: number | undefined;
};
export default function ProfileCard({
  name,
  handle,
  bio,
  followers,
  following,
  totalPost,
}: propTypes) {
  return (
    <div className="max-w-md mx-auto bg-black rounded-xl  shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:self-center">
          {/* <img
            className="h-32 w-full object-cover rounded-full md:w-32"
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt="User Avatar"
          /> */}
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-slate-500 font-semibold">
            {handle}
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-white hover:underline"
          >
            {name}
          </a>
          <p className="mt-2 text-white-500">{bio}</p>
          <div className="mt-4 flex items-center">
            <span className="text-white-700 mr-2">{followers} followers</span>

            <span className="text-white-700 mr-2">{following} following</span>

            <span className="text-white-700">{totalPost} post</span>
          </div>
          <div className="mt-4">
            {/* <button className="px-4 py-2 mr-4 bg-white text-black rounded-md hover:bg-slate-200">
              Sponsor
            </button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button className="px-4 py-2 bg-white text-black rounded-md">
                    Other Sponsor
                  </button>
                </TooltipTrigger>
                <TooltipContent asChild>
                  <p>It has several other sponsors. 1eth, 2 Dai</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
        </div>
      </div>
    </div>
  );
}
