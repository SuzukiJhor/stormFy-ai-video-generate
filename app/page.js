import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Ola mundo</h2>
      <Button variant="ghost">StormFy AI Video Generator</Button>
      <UserButton/>
    </div>
  );
}
