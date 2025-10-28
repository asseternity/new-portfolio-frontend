import { useState } from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { PiReadCvLogo } from 'react-icons/pi';
import { MdOutlineMail } from 'react-icons/md';
import { Button } from './ui/button';
import dragon_icon from '/dragon-svgrepo-com.svg';
import PhaserGame from '@/lib/phaser';

function Header() {
  const [gameHidden, setGameHidden] = useState<boolean>(true);

  return (
    <div className="header w-full flex flex-col justify-center items-center gap-3 px-5 text-center">
      <h1 className="text-4xl">Asset Nakupov</h1>
      <p className="text-xs">Middle Full-Stack TypeScript Developer</p>
      <div className="flex flex-row gap-2 justify-center">
        <div className="text-xs border border-black px-3 py-1 rounded-full">
          React · Node.js · PostgreSQL · Prisma · Vitest · Docker
        </div>
        <div className="text-xs border border-black px-3 py-1 rounded-full">
          IELTS 8.5 · Tbilisi, Georgia · Open to remote and relocation
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <Button className="h-9 w-9">
          <CiLinkedin />
        </Button>
        <Button className="h-9 w-9">
          <FaGithub />
        </Button>
        <Button className="h-9 w-9">
          <PiReadCvLogo />
        </Button>
        <Button className="h-9 w-9">
          <MdOutlineMail />
        </Button>
        <Button
          className="h-9 w-9 p-1 bg-green-800"
          onClick={() => {
            setGameHidden(false);
          }}
        >
          <img src={dragon_icon} className="w-full h-full" />
        </Button>
        <PhaserGame gameHidden={gameHidden} callback={setGameHidden} />
      </div>
    </div>
  );
}

export default Header;
