import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SoftballPageLayoutNav from './pages/SoftballPageLayoutNav';

export default function App() {
  return (
    <div>
      <Helmet>
        <title>EHT Youth Softball</title>
      </Helmet>
      <SoftballPageLayoutNav>
        <Outlet />
      </SoftballPageLayoutNav>
    </div>
  );
}

