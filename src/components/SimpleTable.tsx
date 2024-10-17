import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";

export function SimpleTable({ data, columns }) {
  // {"id":10,"name":"Daren","lastname":"Oki","email":"doki9@about.me","country":"Indonesia","dateOfBirth":"3/27/2023"}]

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [dataTable, setDataTable] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const loopReactTablePaginationData = (tableInstance: any) => {
    try {
      const stringify = JSON.stringify(tableInstance);
      const clone = JSON.parse(stringify);
  
      const rows: any = [];
      for (let i = 0; i < clone.pageCount; i++) {
        clone.page.map((item: any) => {
          rows.push(item.original);
        });
        if (clone.canNextPage) {
          clone.nextPage();
        }
      }
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  /**
   * @desc get table data as json
   * @param data
   * @param columns
   */
  const getTableDataForExport = (data: any[], columns: any[]) => data?.map((record: any) => columns
  .reduce((recordToDownload, column) => (
    { ...recordToDownload, [column.Header]: record[column.accessor] }
  ), {}));

  const convertToCSV = (data: any) => {
    let result = ""

    const columnDelimeter = ',';
    const lineDelimeter = '\n';
    const keys = Object.keys(data[0])

    result = '';
    result += keys.join(columnDelimeter)
    result += lineDelimeter
  
    data.forEach((item: any) => {
      let ctr = 0;
      keys.forEach(key => {
        if(ctr> 0) result += columnDelimeter
        result += item[key]
        ctr++
      })
      result += lineDelimeter;
    })

    return result

  }

  

  const handlePrepareData = () => {
    const headers = table
      .getHeaderGroups()
      .map((x) => x.headers)
      .flat();    
    console.log(headers)
    //const rows = table.getCoreRowModel().rows.map((row) => row.original);
    const rows = table.getCoreRowModel().rows.map((row) => row.original)
    return rows
    //https://gist.github.com/xargr/97f160e5ab1bbc513bc7a1acd4ed88e4
    //https://github.com/TanStack/table/discussions/4402
  }

  const handleDownload = () => {
    const data = handlePrepareData();

    const link= document.createElement("a")
    let csv = convertToCSV(data)
    if(csv == null)  return

    const filename = "b360ai.csv"

    if(!csv.match(/^data:text\/cvv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }
    link.setAttribute("href", encodeURI(csv))
    link.setAttribute("download", filename)
    link.click()
  }

  return (
    <>
      <h2>SimpleTable</h2>
      <button onClick={() => handleDownload(dataTable)}>Export CSV</button>
      <input
        type="text"
        placeholder="Buscar"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <button onClick={() => table.setPageIndex(0)}>Primer Página</button>
      <button onClick={() => table.previousPage()}>Página Anterior</button>
      <button onClick={() => table.nextPage()}>Página Siguiente</button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Última página
      </button>
    </>
  );
}

export default SimpleTable;
