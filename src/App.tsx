import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import './App.css';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { TooltipDemo } from './components/ui/TooltipCustom';
import { DialogCustom } from './components/ui/dialogCustom';
import { z } from 'zod';
import { Acciones } from './components/Acciones';

export interface Text {
  name: string;
  text: string;
  id: string;
}

const columns: ColumnDef<Text>[] = [
  {
    header: 'Nombre',
    accessorKey: 'name',
    cell: TooltipDemo,
  },

  {
    header: 'Acciones',
    accessorKey: 'actions',
    cell: Acciones,
  },
];
const schema = z.object({
  name: z.string(),
  text: z.string(),
});
function App() {
  const [texts, setText] = useState<Text[]>(() => {
    return JSON.parse(localStorage.getItem('texts') || '[]');
  });

  const table = useReactTable({
    data: texts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateRow(row: Text) {
        const index = texts.findIndex((text) => text.id === row.id);
        const newData = texts.with(index, row);
        setText(newData);
      },
      deleteRow(id: string) {
        const newData = texts.filter((text) => text.id !== id);
        setText(newData);
      },
    },
  });

  const handleSave = (data: Text) => {
    const result = schema.safeParse(data);
    if (!result.success) return;
    setText((prev) => [...prev, data]);
  };

  useEffect(() => {
    localStorage.setItem('texts', JSON.stringify(texts));
  }, [texts]);

  // useEffect(() => {
  //   const URL = 'https://api.jsonbin.io/v3/b/6772b589ad19ca34f8e3205d/latest';

  //   fetch(URL, {
  //     method: 'GET',
  //     headers: {
  //       'X-Master-Key':
  //         '$2b$10$7Epf2dc12cN0BVWXuZaRMOZG/OZz0doUuEt0rjzgVaYDKaGfN9xLe',
  //       'X-Access-Key':
  //         '$2a$10$4Vaa4NcBMJSlChbTyGRLz.h2q8WNdS0yCBwhdeQx2J/1TARzGCSHq',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <section className='container mx-auto p-5'>
      <DialogCustom functionAction={handleSave} />
      <Table style={{ width: table.getTotalSize(), margin: 'auto' }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.column.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Toaster richColors />
    </section>
  );
}

export default App;
