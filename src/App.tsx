// import SimpleTable from "./components/SimpleTable";
import data from "./users.json";
import dayjs from "dayjs";


import SimpleTable from "./components/SimpleTable";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { page } from "./pages/page";
import { DataTable } from "./payments/DataTable";

function App() {

  

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "Mi ID",
    },
    {
      header: "Nombre y Apellido",
      accessorFn: (row) => `${row.name} - ${row.lastname}`,
    },    
    {
      header: "Email",
      accessorKey: "email",
      footer: "Mi ID",
    },
    {
      header: "Country",
      accessorKey: "country",
      footer: "Mi ID",
    },
    {
      header: "Day of Birth",
      accessorKey: "dateOfBirth",
      footer: "Mi fecha de nacimiento",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },
  ];

  

  return (
    <div className="container mx-auto py-10">
      
      <SimpleTable columns={columns} data={data} />
      {/* <page /> */}
        {/*<Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}

export default App;
