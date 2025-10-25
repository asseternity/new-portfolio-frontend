import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { PiReadCvLogo } from 'react-icons/pi';
import { MdOutlineMail } from 'react-icons/md';
import { Button } from './ui/button';

function Header() {
  return (
    <div className="header w-full flex flex-col justify-center items-center gap-3 px-5 text-center">
      <h1 className="text-4xl">Asset Nakupov</h1>
      <p className="text-xs">Middle Full-Stack TypeScript Developer</p>
      <div className="flex flex-row gap-2 justify-center">
        <div className="text-xs border px-3 py-1 rounded-full">
          React · Node.js · PostgreSQL · Prisma · Vitest · Docker
        </div>
        <div className="text-xs border px-3 py-1 rounded-full">
          IELTS 8.5 · Tbilisi, Georgia · Open to remote and relocation
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <Button>
          <CiLinkedin />
        </Button>
        <Button>
          <FaGithub />
        </Button>
        <Button>
          <PiReadCvLogo />
        </Button>
        <Button>
          <MdOutlineMail />
        </Button>
      </div>
    </div>
  );
}

export default Header;
