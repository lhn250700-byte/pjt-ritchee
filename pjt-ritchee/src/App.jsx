import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from './componetns/Nav';
import Home from './assets/page/home/Home';
import About from './assets/page/about/About';
import DentList from './assets/page/dentistlist/DentList';
import Mypage from './assets/page/mypage/Mypage';
import Event from './assets/page/event/Event';
import Member from './assets/member/Member';
import Map from './assets/page/shared/Map';
import Footer from './componetns/Footer';
import ProtectedRoute from './componetns/ProtectedRoute';
import { useUser } from './context/UserContext';
import AppmList from './assets/page/dentistlist/AppmList';

function App() {
  const location = useLocation();
  const { user } = useUser();

  // /member 경로에서는 Nav와 Footer 숨김
  const hideNavFooter = location.pathname.startsWith('/member');

  return (
    <>
      {!hideNavFooter && <Nav />}
      <div className={hideNavFooter ? '' : 'wrap'}>
        <div className={hideNavFooter ? '' : 'container'}>
          <Routes>
            <Route
              path="/"
              element={
                user?.u_kind === '1' ? (
                  <Home />
                ) : user?.u_kind === '2' ? (
                  <AppmList />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/about/*"
              element={
                user?.u_kind === 2 || user?.u_kind === '2' ? (
                  <Navigate to="/" />
                ) : (
                  <About />
                )
              }
            />
            <Route
              path="/dentistList/*"
              element={
                user?.u_kind === 2 || user?.u_kind === '2' ? (
                  <Navigate to="/" />
                ) : (
                  <DentList />
                )
              }
            />
            <Route
              path="/mypage/*"
              element={
                <ProtectedRoute>
                  <Mypage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/*"
              element={
                user?.u_kind === 2 || user?.u_kind === '2' ? (
                  <Navigate to="/" />
                ) : (
                  <Event />
                )
              }
            />
            <Route path="/map/*" element={<Map />} />
            <Route path="/member/*" element={<Member />} />
          </Routes>
        </div>
      </div>
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
