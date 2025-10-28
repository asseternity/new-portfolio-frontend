import type { Project } from '@/lib/project';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

type ProjectProps = {
  project: Project;
  callback: Function;
};

export function ProjectItem({ project, callback }: ProjectProps) {
  return (
    <div className="flex-1">
      <Item variant="outline" className="border-black">
        <ItemContent>
          <ItemTitle>{project.name}</ItemTitle>
          <ItemDescription>{project.description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            className="bg-transparent border-black"
            size="sm"
            onClick={() => callback(project)}
          >
            Read more
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
