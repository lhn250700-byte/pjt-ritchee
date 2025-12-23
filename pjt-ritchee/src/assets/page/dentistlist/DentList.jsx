import { Link, Route, Routes } from 'react-router-dom';
import DentistView from '../shared/DentistView';
import DentistReview from '../shared/DentistReview';
import List from './List';
import DentistReviewView from '../shared/DentistReviewView';

function DentList() {
  return (
    <>
      <Routes>
        <Route index element={<List />} />
        <Route path="/" element={<List />} />
        <Route path="/dentistView/" element={<DentistView />} />
        <Route path="/dentistView/dentistReview" element={<DentistReviewView />} />
      </Routes>
    </>
  );
}

export default DentList;
