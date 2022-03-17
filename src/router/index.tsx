import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { AuthPage } from '../pages/AuthPage';
import { GameHistoryPage } from '../pages/GameHisroryPage';
import { GameLibraryPage } from '../pages/GameLibraryPage';
import { LogoutPage } from '../pages/LogoutPage';
import { WheelPage } from '../pages/WheelPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/wheel"   element={<WheelPage />} />
          <Route path="/history" element={<GameHistoryPage />} />
          <Route path="/library" element={<GameLibraryPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/auth"    element={<AuthPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/wheel" />} />

      </Routes>
    </BrowserRouter>
  );
};
