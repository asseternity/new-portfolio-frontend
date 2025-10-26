import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/project';

type ProjectProps = {
  project: Project;
};

const ProjectProfile = ({ project }: ProjectProps) => {
  return (
    <section className="flex-1 p-5">
      <div className="container w-full h-full grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl">
            {project.name}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {project.description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            <Button asChild className="w-full sm:w-auto">
              <a href={project.demoLink}>Live Demo</a>
            </Button>
            <Button asChild variant="outline">
              <a href={project.githubLink}>GitHub</a>
            </Button>
          </div>
        </div>
        <div className="flex h-full w-full">
          <img
            src={
              project.screenshotPath
                ? project.screenshotPath
                : 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg'
            }
            alt="placeholder hero"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </div>
      </div>
    </section>
  );
};

export { ProjectProfile };
