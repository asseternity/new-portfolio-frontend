import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { PiReadCvLogo } from 'react-icons/pi';
import { MdOutlineMail } from 'react-icons/md';
import { Button } from './ui/button';

function Header() {
  return (
    <div className="header w-full flex flex-col justify-center items-center gap-3">
      <h1 className="text-4xl">Asset Nakupov</h1>
      <h3 className="text-sm">Middle Full-Stack TypeScript Developer</h3>
      <h3 className="text-sm">
        React / Node.js / PostgreSQL / Prisma / Vitest / TDD / Docker
      </h3>
      <h3 className="text-sm">
        IELTS 8.5 · Tbilisi, Georgia · Open to remote and relocation
      </h3>
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
