import * as React from 'react';
import { Outlet } from 'react-router-dom';
import SoftballPageLayoutNav from './pages/SoftballPageLayoutNav';

export default function App() {
  return (
    <div>
      <SoftballPageLayoutNav>
        <Outlet />
      </SoftballPageLayoutNav>
    </div>
  );
}

