import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/project';

const LoungeIncrement = async () => {
  const res = await fetch(
    'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/lounge',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
};

type ProjectProps = {
  project: Project;
  callback: Function;
};

const ProjectProfile = ({ project, callback }: ProjectProps) => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    fetch(project.fullDescription)
      .then((res) => res.text())
      .then(setMarkdown)
      .catch(() => setMarkdown('Failed to load description.'));
  }, [project.fullDescription]);

  return (
    <section className="flex-1 p-5">
      <div className="container w-full h-full grid items-center gap-10 lg:grid-cols-2 lg:gap-20 p-5">
        <div className="mx-auto flex flex-col items-center md:ml-auto lg:max-w-3xl lg:items-start text-left">
          <h1 className="my-6 text-4xl font-bold lg:text-6xl xl:text-7xl">
            {project.name}
          </h1>
          <h2 className="my-6 text-2xl lg:text-4xl xl:text-5xl text-gray-700">
            {project.subtitle}
          </h2>
          <div className="text-muted-foreground mb-8 max-w-xl lg:text-xl prose prose-neutral">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-6 mb-4 space-y-1" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-4 leading-relaxed" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-gray-100 px-1 py-0.5 rounded"
                    {...props}
                  />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col gap-5 h-full w-full justify-top">
          {project.screenshotPaths?.map((screenshotPath) => {
            return <img
            src={
              screenshotPath ||
              'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg'
            }
            key={`img_${screenshotPath}`}
            alt="project screenshot"
            className="max-h-600px object-contain"
          />
          })}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            <Button asChild className="w-full sm:w-auto" onClick={LoungeIncrement}>
              <a target="_blank" href={project.demoLink}>
                Live Demo
              </a>
            </Button>
            <Button asChild variant="outline" onClick={LoungeIncrement}>
              <a target="_blank" href={project.githubLink}>
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-400"
              onClick={() => callback(false)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProjectProfile };
