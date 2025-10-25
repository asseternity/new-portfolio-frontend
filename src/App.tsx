import Header from './components/header';
import Content from './components/content';
import { ProjectProfile } from './components/profile';
import { useState } from 'react';

function App() {
  const [profileMode, setProfileMode] = useState<boolean>(true);

  return (
    <div className="main_container h-screen flex flex-col">
      <Header />
      {!profileMode && <Content />}
      {profileMode && <ProjectProfile />}
    </div>
  );
}

export default App;
