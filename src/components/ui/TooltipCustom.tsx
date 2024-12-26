import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Textarea } from './textarea';

interface Props {
  name: string;
  text: string;
}

export function TooltipDemo({ name, text }: Props) {
  const HandleCopy = () => {
    navigator.clipboard.writeText(text);
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
            className='[field-sizing:content] resize-none'
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
