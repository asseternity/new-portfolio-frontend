import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { ProjectItem } from './project_item';
import { projects } from '@/lib/projects';
import type { Project } from '@/lib/project';
import {
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiVitest,
  SiGit,
  SiDocker,
  SiPython,
  SiPandas,
  SiDotnet,
  SiTelegram,
  SiUnity,
  SiGodotengine,
  SiBlender,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

type FunctionProps = {
  callback: Function;
};

function Item({
  name,
  Icon,
  active,
  onToggle,
}: {
  name: string;
  Icon?: any;
  active: boolean;
  onToggle: (name: string) => void;
}) {
  const base =
    'inline-flex items-center justify-center rounded-md bg-black text-white';
  const inactive = active ? '' : ' opacity-50';
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => onToggle(name)}
          aria-pressed={active}
          className={base + inactive + (Icon ? ' size-7' : ' text-xs px-2 h-7')}
        >
          {Icon ? <Icon className="w-4 h-4" aria-hidden /> : name}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Stack({ callback }: FunctionProps) {
  const allNames = [
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React',
    'Tailwind CSS',
    'shadcn/ui',
    'Vite',
    'Express',
    'REST APIs',
    'Auth',
    'SQL',
    'PostgreSQL',
    'Prisma ORM',
    'Vitest',
    'TDD',
    'Git',
    'CI/CD',
    'Docker',
    'Python',
    'pandas',
    'XGBoost',
    'C#',
    '.NET',
    'ASP.NET',
    'Telegram Bots',
    'Unity',
    'Godot',
    'Articy',
    'Blender',
  ] as const;

  const [activatedIcons, setActivatedIcons] = useState<string[]>(
    Array.from(allNames)
  );

  const [shownProjects, setShownProjects] = useState<Project[]>();

  useEffect(() => {
    const newProjects: Project[] = projects.filter((x) => {
      return x.tags?.some((tag) =>
        activatedIcons.some((name) =>
          name.toLowerCase().includes(tag.toLowerCase())
        )
      );
    });
    setShownProjects(newProjects);
  }, [activatedIcons]);

  const toggle = (name: string) => {
    setActivatedIcons((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const isActive = (name: string) => activatedIcons.includes(name);

  const toggleAll = () => {
    if (activatedIcons.length > 0) setActivatedIcons([]);
    else setActivatedIcons(Array.from(allNames));
  };

  // Use a responsive CSS variable for the left column width.
  // Rows use grid-cols-[var(--label)_1fr]; the variable changes with breakpoints.
  const rowCls = 'grid grid-cols-[var(--label)_1fr] gap-2 items-start';

  return (
    <TooltipProvider>
      <div className="flex flex-row">
        <h2 className="text-xl mx-5">Skills</h2>
        <Button size="sm" className="h-7 px-2 text-xs" onClick={toggleAll}>
          {activatedIcons.length > 0 ? 'Hide all' : 'Select all'}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 mx-5">
        Click to filter the projects
      </p>
      <div className="p-6 space-y-4 [--label:5rem] sm:[--label:8rem] md:[--label:11rem] lg:[--label:13rem]">
        <Separator orientation="horizontal" />
        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            Languages & Runtime
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item
              name="TypeScript"
              Icon={SiTypescript}
              active={isActive('TypeScript')}
              onToggle={toggle}
            />
            <Item
              name="JavaScript"
              Icon={SiJavascript}
              active={isActive('JavaScript')}
              onToggle={toggle}
            />
            <Item
              name="Node.js"
              Icon={SiNodedotjs}
              active={isActive('Node.js')}
              onToggle={toggle}
            />
          </div>
        </div>

        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            Frontend
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item
              name="React"
              Icon={SiReact}
              active={isActive('React')}
              onToggle={toggle}
            />
            <Item
              name="Tailwind CSS"
              Icon={SiTailwindcss}
              active={isActive('Tailwind CSS')}
              onToggle={toggle}
            />
            <Item
              name="shadcn/ui"
              active={isActive('shadcn/ui')}
              onToggle={toggle}
            />
            <Item
              name="Vite"
              Icon={SiVite}
              active={isActive('Vite')}
              onToggle={toggle}
            />
          </div>
        </div>

        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            Backend & Security
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item
              name="Express"
              Icon={SiExpress}
              active={isActive('Express')}
              onToggle={toggle}
            />
            <Item
              name="REST APIs"
              active={isActive('REST APIs')}
              onToggle={toggle}
            />
            <Item name="Auth" active={isActive('Auth')} onToggle={toggle} />
          </div>
        </div>

        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            Data & Persistence
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item name="SQL" active={isActive('SQL')} onToggle={toggle} />
            <Item
              name="PostgreSQL"
              Icon={SiPostgresql}
              active={isActive('PostgreSQL')}
              onToggle={toggle}
            />
            <Item
              name="Prisma ORM"
              Icon={SiPrisma}
              active={isActive('Prisma ORM')}
              onToggle={toggle}
            />
          </div>
        </div>

        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            Testing & Quality
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item
              name="Vitest"
              Icon={SiVitest}
              active={isActive('Vitest')}
              onToggle={toggle}
            />
            <Item name="TDD" active={isActive('TDD')} onToggle={toggle} />
          </div>
        </div>

        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            DevOps
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item
              name="Git"
              Icon={SiGit}
              active={isActive('Git')}
              onToggle={toggle}
            />
            <Item name="CI/CD" active={isActive('CI/CD')} onToggle={toggle} />
            <Item
              name="Docker"
              Icon={SiDocker}
              active={isActive('Docker')}
              onToggle={toggle}
            />
          </div>
        </div>

        <div className={rowCls}>
          <h2 className="text-md md:text-lg font-semibold tracking-tight">
            Bonus
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Item
              name="Python"
              Icon={SiPython}
              active={isActive('Python')}
              onToggle={toggle}
            />
            <Item
              name="pandas"
              Icon={SiPandas}
              active={isActive('pandas')}
              onToggle={toggle}
            />
            <Item
              name="XGBoost"
              active={isActive('XGBoost')}
              onToggle={toggle}
            />
            <Item
              name="C#"
              Icon={TbBrandCSharp}
              active={isActive('C#')}
              onToggle={toggle}
            />
            <Item
              name=".NET"
              Icon={SiDotnet}
              active={isActive('.NET')}
              onToggle={toggle}
            />
            <Item
              name="ASP.NET"
              active={isActive('ASP.NET')}
              onToggle={toggle}
            />
            <Item
              name="Telegram Bots"
              Icon={SiTelegram}
              active={isActive('Telegram Bots')}
              onToggle={toggle}
            />
            <Item
              name="Unity"
              Icon={SiUnity}
              active={isActive('Unity')}
              onToggle={toggle}
            />
            <Item
              name="Godot"
              Icon={SiGodotengine}
              active={isActive('Godot')}
              onToggle={toggle}
            />
            <Item name="Articy" active={isActive('Articy')} onToggle={toggle} />
            <Item
              name="Blender"
              Icon={SiBlender}
              active={isActive('Blender')}
              onToggle={toggle}
            />
          </div>
        </div>
      </div>
      <div className="projects w-full px-5 flex flex-col gap-2">
        <Separator orientation="horizontal" />
        <h2 className="text-xl">Portfolio Projects</h2>
      </div>
      <div className="projects w-full p-5 flex flex-col gap-2">
        {shownProjects?.map((x) => (
          <ProjectItem project={x} callback={callback} key={x.name} />
        ))}
      </div>
    </TooltipProvider>
  );
}
