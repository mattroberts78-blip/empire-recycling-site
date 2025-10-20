import dynamic from "next/dynamic";
const UserUI = dynamic(() => import("./UserUI"), { ssr: false });

export default function UserPage() {
  return <UserUI />;
}
