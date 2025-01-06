import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface Props {
  row: { original: { name: string; text: string } };
}

export function TooltipDemo({ row }: Props) {
  const { name, text } = row.original;
  const HandleCopy = () => {
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([text], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
      // 'image/png': new Blob([text], { type: 'image/png' }),
    });
    navigator.clipboard.write([clipboardItem]);
    toast.success(`Copiado al portapapeles : ${name}`);
  };

  return (
    <div>
      <TooltipProvider delayDuration={600}>
        <Tooltip>
          <TooltipTrigger asChild className='cursor-pointer'>
            <span className='font-bold text-sm' onClick={HandleCopy}>
              {name}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div
              className='bg-white p-2 rounded-md shadow-md text-black'
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
