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
import { useState } from 'react';
import { toast } from 'sonner';
// import DOMPurify from 'dompurify';
export function DialogCustom({
  functionAction,
  edit = false,
  Idata,
}: {
  edit?: boolean;
  Idata?: Text;
  functionAction: (data: Text) => void;
}) {
  const [data, setdata] = useState(() =>
    Idata ? Idata : { name: '', text: '' }
  );
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>
  ) => {
    const target = e.target as HTMLInputElement;

    const T = target.dataset.name
      ? { [target.dataset.name]: target.innerHTML }
      : { [target.name]: target.value };

    const newData = { ...data, ...T };
    setdata(newData);
  };

  const handleSend = () => {
    if (data.name === '' || data.text === '') return;
    functionAction(
      Idata ? { ...data, id: Idata.id } : { ...data, id: crypto.randomUUID() }
    );
    setOpen(false);
    if (!Idata) setdata({ name: '', text: '' });
    toast.info(`Elemento ${Idata ? 'actualizado' : 'creado'}`);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData =
      e.clipboardData ||
      (window as typeof window & { clipboardData: DataTransfer }).clipboardData;
    const htmlData =
      clipboardData.getData('text/html') || clipboardData.getData('text/plain');

    // const sanitizedHtml = DOMPurify.sanitize(htmlData, {
    //   ALLOWED_TAGS: [
    //     'b',
    //     'i',
    //     'u',
    //     'strong',
    //     'em',
    //     'span',
    //     'p',
    //     'div',
    //     'table',
    //     'tr',
    //     'td',
    //     'th',
    //     'tbody',
    //     'thead',
    //     'tfoot',
    //     'caption',
    //   ],
    //   ALLOWED_ATTR: ['style'],
    // });

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    selection.deleteFromDocument();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const fragment = range.createContextualFragment(htmlData);
    range.insertNode(fragment);
    setdata({ ...data, text: htmlData });
  };

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button variant={!edit ? 'info' : 'outline'}>
          {!edit ? 'Nuevo' : 'Edit'}
        </Button>
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
            <div
              onInput={(e) => handleChange(e)}
              dangerouslySetInnerHTML={edit ? { __html: data.text } : undefined}
              contentEditable
              data-name='text'
              onPaste={handlePaste}
              className='col-span-3 border border-input rounded-md px-3 py-1 max-w-72  max-h-72 overflow-hidden scroll-y'
            ></div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSend}>{!edit ? 'Crear' : 'Actualizar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
