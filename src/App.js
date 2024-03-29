import * as React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './auth/protected-route';

import SoftballPageLayoutNav from './pages/SoftballPageLayoutNav';
import Dashboard from './pages/Dashboard';
import BoardMinutes from './pages/BoardMinutes';
import BoardMembers from './pages/BoardMembers';
import FAQ from './pages/FAQ';
import Forms from './pages/Forms';
import FieldInfo from './pages/FieldInfo';
import RecTeams from './pages/RecTeams';
import TravelTeams from './pages/TravelTeams';
import Sponsors from './pages/Sponsors';
import Tournaments from './pages/Tournaments';
import Media from './pages/Media';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div>
      <Helmet>
        <title>EHT Youth Softball</title>
      </Helmet>
      <SoftballPageLayoutNav>
        <Outlet />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="boardminutes" element={<BoardMinutes />} />
        <Route path="boardmembers" element={<BoardMembers />} />
        <Route path="fieldinfo" element={<FieldInfo />} />
        <Route path="recteams" element={<RecTeams />} />
        <Route path="travelteams" element={<TravelTeams />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="forms" element={<Forms />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="media" element={<Media />} />
        <Route exact path="admin" element={<Admin />}/>
      </Routes>
      </SoftballPageLayoutNav>
    </div>
  );
}

