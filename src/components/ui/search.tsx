import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function SearchBar() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="xyz.lens" />
      <Button type="submit">Search</Button>
    </div>
  );
}
