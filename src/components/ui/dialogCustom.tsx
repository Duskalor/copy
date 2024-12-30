import { Text } from '@/App';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './textarea';
import { useState } from 'react';

export function DialogCustom({
  functionAction,
  edit = false,
  Idata,
}: {
  edit?: boolean;
  Idata?: Text;
  functionAction: (data: Text) => void;
}) {
  const [data, setdata] = useState(() => {
    return Idata ? Idata : { name: '', text: '' };
  });
  const [open, setOpen] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  // console.log(Idata);
  const handleSend = () => {
    if (data.name === '' || data.text === '') return;
    functionAction(
      Idata ? { ...data, id: Idata.id } : { ...data, id: crypto.randomUUID() }
    );
    setOpen(false);
    if (!Idata) setdata({ name: '', text: '' });
  };

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button variant='outline'>{!edit ? 'Nuevo' : 'Edit'}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Ingrese nombre y descripción</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              onChange={handleChange}
              value={data.name}
              name='name'
              id='name'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              descripción
            </Label>
            <Textarea
              onChange={handleChange}
              name='text'
              id='username'
              value={data.text}
              className='col-span-3 resize-none [field-sizing:content]'
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSend}>{!edit ? 'Crear' : 'Actualizar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
