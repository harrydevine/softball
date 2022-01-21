import * as React from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SoftballPageLayoutNav from './pages/SoftballPageLayoutNav';

export default function App() {
  useEffect(() => {
    document.title = "EHT Youth Softball";
  }, []);

  return (
    <div>
      <SoftballPageLayoutNav>
        <Outlet />
      </SoftballPageLayoutNav>
    </div>
  );
}

