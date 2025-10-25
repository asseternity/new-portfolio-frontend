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
};

export function ProjectItem({ project }: ProjectProps) {
  return (
    <div className="flex-1">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{project.name}</ItemTitle>
          <ItemDescription>{project.description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Read more
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
