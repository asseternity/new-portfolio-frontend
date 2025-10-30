import { useState } from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { Button } from './ui/button';
import dragon_icon from '/dragon-svgrepo-com.svg';
import cv_icon from '/cv.svg';
import PhaserGame from '@/lib/phaser';

const LIincrement = async () => {
  const res = await fetch(
    'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/li',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
};

const GHincrement = async () => {
  const res = await fetch(
    'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/gh',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
};

const CVincrement = async () => {
  const res = await fetch(
    'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/cv',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
};

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
        <Button className="h-9 w-9" onClick={LIincrement}>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/asset-nakupov-b705bab7/"
          >
            <CiLinkedin />
          </a>
        </Button>
        <Button className="h-9 w-9" onClick={GHincrement}>
          <a target="_blank" href="https://github.com/asseternity">
            <FaGithub />
          </a>
        </Button>
        <Button className="h-9 w-9 p-1" onClick={CVincrement}>
          <a href="/cv.pdf" download>
            <img src={cv_icon} className="w-full h-full" />
          </a>
        </Button>
        <Button className="h-9 w-9" onClick={CVincrement}>
          <a target="_blank" href="mailto:asset_n@proton.me">
            <MdOutlineMail />
          </a>
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
