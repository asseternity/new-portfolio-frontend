import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import StackProjects from './stack_projects';
import About from './about';

function Content() {
  return (
    <div className="content flex-1 min-h-0 p-5">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="!overflow-y-auto">
          <StackProjects />
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
