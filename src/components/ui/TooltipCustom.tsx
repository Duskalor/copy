import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Textarea } from './textarea';

interface Props {
  row: { original: { name: string; text: string } };
}

export function TooltipDemo({ row }: Props) {
  const { name, text } = row.original;
  const HandleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <TooltipProvider delayDuration={600}>
        <Tooltip>
          <TooltipTrigger asChild className='cursor-pointer'>
            <span onClick={HandleCopy}>{name}</span>
          </TooltipTrigger>
          <TooltipContent>
            <Textarea
              disabled
              defaultValue={text}
              className='[field-sizing:content] resize-none'
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
