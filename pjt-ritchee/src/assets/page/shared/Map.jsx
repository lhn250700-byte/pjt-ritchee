import React from 'react';
import MapPage from './MapPage';
import { Route, Routes } from 'react-router-dom';
import ReservationCheck from './ReservationCheck';
import ReservationForm from './ReservationForm';
import ProtectedRoute from '../../../componetns/ProtectedRoute';

const Map = () => {
  return (
    <>
      <Routes>
        <Route index element={<MapPage />} />
        <Route path="/" element={<MapPage />} />
        <Route 
          path="/reservationForm" 
          element={
            <ProtectedRoute>
              <ReservationForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reservationForm/reservationCheck" 
          element={
            <ProtectedRoute>
              <ReservationCheck />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
};

export default Map;
