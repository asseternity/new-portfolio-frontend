import { useState } from 'react';
import Header from './components/header';
import Content from './components/content';
import { ProjectProfile } from './components/profile';
import type { Project } from './lib/project';

function App() {
  const [profileMode, setProfileMode] = useState<boolean>(false);
  const [project, setProject] = useState<Project | null>();

  function GoToProfile(project: Project): void {
    setProfileMode(true);
    setProject(project);
  }

  return (
    <div className="main_container h-screen flex flex-col">
      <Header />
      {!profileMode && <Content callback={GoToProfile} />}
      {profileMode && project && (
        <ProjectProfile project={project} callback={setProfileMode} />
      )}
    </div>
  );
}

export default App;
