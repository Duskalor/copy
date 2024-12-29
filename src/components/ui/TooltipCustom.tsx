import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Textarea } from './textarea';
import { useState } from 'react';

// interface Props {
//   id: string;
//   name: string;
//   text: string;
//   SaveChanges: (id: string, text: string) => void;
// }

export function TooltipDemo({ table, row }: any) {
  const { id, name, text } = row.original;
  const HandleCopy = () => {
    navigator.clipboard.writeText(text);
  };
  const [newText, setNewText] = useState('');
  const [open, setOpen] = useState(false);
  // console.log(table);
  const Onblur = () => {
    table.options.meta.updateData(id, newText);
  };

  return (
    <TooltipProvider delayDuration={600}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <span onClick={HandleCopy} className='cursor-pointer'>
            {name}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <Textarea
            defaultValue={text}
            onChange={(e) => setNewText(e.target.value)}
            // onBlur={Onblur}
            className='[field-sizing:content] resize-none'
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
