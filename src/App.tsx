import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/header';
import Content from './components/content';
import { ProjectProfile } from './components/profile';
import type { Project } from './lib/project';
import { projects } from '@/lib/projects';

function App() {
  const [profileMode, setProfileMode] = useState<boolean>(false);
  const [project, setProject] = useState<Project | null>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('project');
    if (slug) {
      const found = projects.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      if (found) {
        setProject(found);
        setProfileMode(true);
      }
    }
  }, []);

  function GoToProfile(project: Project): void {
    setProfileMode(true);
    setProject(project);
    const slug = encodeURIComponent(
      project.name.toLowerCase().replace(/\s+/g, '-')
    );
    const newUrl = `?project=${slug}`;
    window.history.pushState({ project: slug }, '', newUrl);
  }

  return (
    <div className="main_container h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="wait">
        {!profileMode && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Content callback={GoToProfile} />
          </motion.div>
        )}

        {profileMode && project && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProjectProfile project={project} callback={setProfileMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
