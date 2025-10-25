import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Stack from './stack';
import About from './about';

function Content() {
  return (
    <div className="content flex-1 min-h-0 p-5">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="!overflow-y-auto" defaultSize={90}>
          <Stack />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="!overflow-y-auto">
          <About />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Content;
