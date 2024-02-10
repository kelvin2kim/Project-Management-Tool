import { getUserFromCookie } from "../lib/auth";
/*remember that http requests are made by default by the browser even to access new pages; files in the nextjs api route are
made to handle specific requests, like password input, etc. */
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";


const getData = async () => {
    const user = await getUserFromCookie(cookies());
    return user;
}


export default async function Greetings() {
  const user = await getData();
  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user.firstName}.
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today's Schedule</Button>
      </div>
    </Card>
  );
}