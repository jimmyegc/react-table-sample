import SimpleTable from "./components/SimpleTable";
import data from "./users.json";
import dayjs from "dayjs";

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
    /*  {
      header: "Name",
      accessorKey: "name",
      footer: "Mi ID",
    },
    {
      header: "Lastname",
      accessorKey: "lastname",
      footer: "Mi ID",
    }, */
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
    <>
      <h1>App</h1>
      <SimpleTable data={data} columns={columns} />
    </>
  );
}

export default App;
