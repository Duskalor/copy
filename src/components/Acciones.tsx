import DeleteDialog from './DeleteDialog';
import { DialogCustom } from './ui/dialogCustom';

export const Acciones = ({ table, row }: any) => {
  const { updateRow } = table.options.meta;
  const deleteRow = table.options.meta.deleteRow;
  const handleDelete = () => deleteRow(row.original.id);
  return (
    <nav>
      <ul className='flex gap-4'>
        <li>
          <DialogCustom functionAction={updateRow} edit Idata={row.original} />
        </li>
        <li>
          <DeleteDialog onDelete={handleDelete} />
        </li>
      </ul>
    </nav>
  );
};
