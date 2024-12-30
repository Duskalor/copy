import { useState } from 'react';
import './App.css';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { initialState } from './lib/const';
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
  const [texts, setText] = useState<Text[]>(initialState);
  console.log(texts);
  const table = useReactTable({
    data: texts,
    columns,
    meta: {
      updateRow(row: Text) {
        console.log(row);
        const index = texts.findIndex((text) => text.id === row.id);
        const newData = texts.with(index, row);
        setText(newData);
      },
      deleteRow(id: string) {
        const newData = texts.filter((text) => text.id !== id);
        setText(newData);
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSave = (data: Text) => {
    const result = schema.safeParse(data);
    if (!result.success) return;
    setText((prev) => [...prev, data]);
  };
  return (
    <section className='container mx-auto'>
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
    </section>

    // <main className='container mx-auto flex bg-red-800 '>
    //   <section className='bg-gray-600'>
    //     <Button>Nuevo</Button>

    //     {texts.map((text) => {
    //       return (
    //         <div className='flex' key={text.id}>
    //           <TooltipDemo {...text} />
    //           <nav>
    //             <Button>Editar</Button>
    //             <Button>Eliminar</Button>
    //           </nav>
    //         </div>
    //       );
    //     })}
    //   </section>
    // </main>
  );
}

export default App;
