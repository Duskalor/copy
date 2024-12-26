import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Textarea } from './textarea';
import { useState } from 'react';

interface Props {
  id: string;
  name: string;
  text: string;
  SaveChanges: (id: string, text: string) => void;
}

export function TooltipDemo({ row }: any) {
  const { id, name, text, SaveChanges } = row.original;
  const HandleCopy = () => {
    navigator.clipboard.writeText(text);
  };
  const [newText, setNewText] = useState('');
  const Onblur = () => {
    SaveChanges(id, newText);
  };

  return (
    <TooltipProvider delayDuration={600}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span onClick={HandleCopy} className='cursor-pointer'>
            {name}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <Textarea
            defaultValue={text}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={Onblur}
            className='[field-sizing:content] resize-none'
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
