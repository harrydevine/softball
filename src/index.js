import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import BoardMinutes from './pages/BoardMinutes';
import BoardMembers from './pages/BoardMembers';
import FieldInfo from './pages/FieldInfo';
import './App.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="boardminutes" element={<BoardMinutes />} />
        <Route path="boardmembers" element={<BoardMembers />} />
        <Route path="fieldinfo" element={<FieldInfo />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
	/>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

