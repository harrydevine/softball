import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle
} from '@patternfly/react-core';
import { Outlet, Link } from 'react-router-dom';
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

