import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const hasAlerted = useRef(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // 초기 로딩 중이면 체크하지 않음
    if (loading) {
      return;
    }

    // user가 없을 때도 짧은 지연을 두어 일시적인 상태 변경을 방지
    if (!user) {
      const timer = setTimeout(() => {
        // 여전히 user가 없으면 리다이렉트
        if (!user && !hasAlerted.current) {
          hasAlerted.current = true;
          alert('로그인이 필요합니다.');
          navigate('/member/signin');
        }
        setCheckingAuth(false);
      }, 500); // 500ms 지연

      return () => clearTimeout(timer);
    } else {
      // user가 있으면 체크 완료
      setCheckingAuth(false);
      hasAlerted.current = false; // 리셋하여 다시 로그인했을 때 alert 가능하도록
    }
  }, [user, loading, navigate]);

  // 로딩 중이거나 체크 중이면 아무것도 렌더링하지 않음
  if (loading || checkingAuth || !user) {
    return null;
  }

  // 로그인한 경우 children 렌더링
  return children;
}

export default ProtectedRoute;
