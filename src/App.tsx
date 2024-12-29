import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
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

export interface Text {
  name: string;
  text: string;
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
    cell: () => {
      return (
        <nav className=' space-x-2'>
          <Button>Editar</Button>
          <Button>Eliminar</Button>
        </nav>
      );
    },
  },
];
const schema = z.object({
  name: z.string(),
  text: z.string(),
});
function App() {
  const [texts, setText] = useState<Text[]>(initialState);
  const table = useReactTable({
    data: texts,
    columns,
    meta: {
      updateData: async (id, newText) => {
        console.log(id, newText);
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
      <DialogCustom SaveText={handleSave} />
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
