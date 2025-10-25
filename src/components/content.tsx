import { toast, Toaster } from 'sonner';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Stack from './stack';
import About from './about';
import { useEffect, useRef } from 'react';

function Content() {
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;

    toast('About me', {
      description:
        'Drag the handle on the right edge of the screen to reveal the about me section.',
      action: { label: 'Got it', onClick: () => {} },
    });
  }, []);

  return (
    <div className="content flex-1 min-h-0 p-5">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="!overflow-y-auto" defaultSize={100}>
          <Stack />
        </ResizablePanel>
        <ResizableHandle withHandle className="mx-3" />
        <ResizablePanel className="!overflow-y-auto">
          <About />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster position="top-right" />
    </div>
  );
}

export default Content;
