import { Payment, columns } from "../payments/columns";
import { DataTable } from "../payments/DataTable";
import { nanoid } from "nanoid";

async function getData(): Promise<Payment[]> {
  return new Array(50).fill(null).map(() => ({
    id: nanoid(),
    amount: Math.random() * 1000,
    status: "pending",
    email: "idk@example.com",
  }));
}

const page = async () => {
  const data = await getData();
  return <>Hi</>;
};

export default page;
