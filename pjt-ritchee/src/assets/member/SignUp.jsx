import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../componetns/Button';
import supabase from '../utils/supabase';
import { useUser } from '../../context/UserContext';
import { checkUserEmail } from '../../api/userEmailCheck';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');
  const { signIn } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    useremail: '',
    userpswd: '',
    userpswd1: '',
    gender: '',
    phone: '',
    text: '',
    addr: '',
  });
  const [errorM, setErrorM] = useState('');
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const navigate = useNavigate();

  const isValidBirth = (str) => {
    if (!/^\d{8}$/.test(str)) return false;
    const year = parseInt(str.slice(0, 4), 10);
    const month = parseInt(str.slice(4, 6), 10) - 1;
    const day = parseInt(str.slice(6, 8), 10);
    if (year < 1900 || year > 2025) return false;
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  };

  const isValidPhone = (str) => /^\d{10,11}$/.test(str);

  const validateField = (name, value) => {
    switch (name) {
      case 'birth':
      case 'phone':
        return /^\d*$/.test(value);
      case 'gender':
        return value === '남' || value === '여';
      default:
        return true;
    }
  };

  const eventHandler = (e) => {
    const { name, value } = e.target;
    if (validateField(name, value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrorM('');
      // 이메일이 변경되면 중복 체크 메시지 초기화
      if (name === 'useremail') {
        setEmailCheckMessage('');
      }
    } else {
      setErrorM(`${name} 입력이 유효하지 않습니다.`);
    }
  };

  const handleEmailCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.useremail) {
      setEmailCheckMessage('이메일을 입력해주세요.');
      return;
    }
    if (!emailRegex.test(formData.useremail)) {
      setEmailCheckMessage('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsCheckingEmail(true);
    setEmailCheckMessage('');

    try {
      const result = await checkUserEmail(formData.useremail);
      const checkResult = typeof result === 'string' ? result : result?.userInfoCheckYn || result;

      if (checkResult === 'Y' || checkResult === 'y') {
        setEmailCheckMessage('이미 가입된 이메일입니다.');
      } else if (checkResult === 'N' || checkResult === 'n') {
        setEmailCheckMessage('사용 가능한 이메일입니다.');
      } else {
        setEmailCheckMessage('이메일 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setEmailCheckMessage('이메일 확인 중 오류가 발생했습니다.');
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleGenderClick = (selectedGender) => {
    const genderValue = selectedGender === '남' ? 'M' : 'F';

    if (validateField('gender', selectedGender)) {
      setGender(selectedGender);
      setFormData((prev) => ({ ...prev, gender: genderValue }));
      setErrorM('');
    }
  };

  const validation = () => {
    if (!formData.name) return '이름을 입력하세요.';
    if (!isValidBirth(formData.birth)) return '올바른 생년월일을 입력하세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.useremail)) return '올바른 이메일을 입력하세요.';
    if (formData.userpswd.length < 8) return '비밀번호는 8자리 이상이어야 합니다.';
    if (formData.userpswd !== formData.userpswd1) return '비밀번호가 일치하지 않습니다.';
    if (!formData.gender) return '성별을 선택해주세요.';
    if (!isValidPhone(formData.phone)) return '핸드폰 번호는 10~11자리 숫자로 입력해야 합니다.';
    if (!formData.addr) return '주소를 입력하세요.';
    return '';
  };

  const confirmHandler = async (e) => {
    e.preventDefault();

    const message = validation();
    if (message) {
      setErrorM(message);
      return;
    }

    setErrorM('');
    setLoading(true);

    let createdUserId = null;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.useremail,
        password: formData.userpswd,
      });

      if (error) {
        let msg = error.message;
        if (msg.includes('User already registered')) {
          msg = '이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.';
        }
        throw new Error(msg);
      }

      if (!data?.user?.id) {
        throw new Error('회원가입 실패: 사용자 정보를 생성할 수 없습니다.');
      }

      createdUserId = data.user.id;

      const { data: insertData, error: dbError } = await supabase
        .from('h_user')
        .insert({
          id: createdUserId,
          name: formData.name,
          birth: formData.birth,
          gender: formData.gender,
          phone: formData.phone,
          addr: formData.addr,
          text: formData.text,
          u_kind: 1,
        })
        .select();

      if (dbError) {
        console.error('h_user 테이블 insert 에러:', dbError);
        // admin.deleteUser는 서버 사이드에서만 가능하므로 클라이언트에서는 제거
        throw new Error(`회원 정보 저장 중 오류가 발생했습니다: ${dbError.message}`);
      }

      if (!insertData || insertData.length === 0) {
        console.error('h_user 테이블 insert 실패: 데이터가 반환되지 않음');
        throw new Error('회원 정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      }

      // 회원가입 성공 후 자동 로그인 처리
      // UserContext의 signIn을 호출하여 user 정보를 명시적으로 설정
      // DB 커밋을 위해 약간의 지연 추가
      await new Promise((resolve) => setTimeout(resolve, 500));

      const loginResult = await signIn(formData.useremail, formData.userpswd);

      if (loginResult?.error) {
        console.error('자동 로그인 실패:', loginResult.error);
        // 로그인 실패해도 회원가입은 성공했으므로 로그인 페이지로 이동
        alert(`${formData.name}님, 회원가입을 환영합니다! 로그인해주세요.`);
        navigate('/member/signin');
        return;
      }

      // 성공 - user 정보가 UserContext에 설정됨
      alert(`${formData.name}님, 회원가입을 환영합니다!`);
      navigate('/');
    } catch (err) {
      // 실패 메시지 표시
      console.error('회원가입 에러:', err);
      setErrorM(err.message || '회원가입 중 오류가 발생했습니다.');

      // admin.deleteUser는 서버 사이드에서만 가능하므로 클라이언트에서는 사용 불가
      // 필요시 서버 사이드 함수나 트리거를 사용해야 함
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-main-01 myBg flex flex-col items-center justify-center min-h-screen py-10">
      <div>
        <img
          src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/logo_wh.png"
          alt="logo"
          className="w-32 mb-6"
        />
      </div>

      <form onSubmit={confirmHandler} className="flex flex-col items-center w-[90%] max-w-[480px] py-10">
        <div className="w-full mb-2">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="이메일"
              name="useremail"
              value={formData.useremail}
              onChange={eventHandler}
              disabled={loading || isCheckingEmail}
              className="outline-none placeholder-gray-mid rounded text-[13px] bg-white flex-1 py-2 px-3 border border-main-01"
            />
            <button
              type="button"
              onClick={handleEmailCheck}
              disabled={loading || isCheckingEmail}
              className="px-4 py-2 bg-white text-main-01 rounded text-[13px] border border-main-01 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isCheckingEmail ? '확인중...' : '중복체크'}
            </button>
          </div>
          {emailCheckMessage && (
            <div
              className={`text-[12px] mt-1 ${
                emailCheckMessage === '사용 가능한 이메일입니다.' ? 'text-deep' : 'text-red-400'
              }`}
            >
              {emailCheckMessage}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="이름"
          name="name"
          value={formData.name}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01"
        />
        <input
          type="text"
          placeholder="생년월일 (YYYYMMDD)"
          name="birth"
          value={formData.birth}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01"
        />

        <input
          type="password"
          placeholder="비밀번호"
          name="userpswd"
          value={formData.userpswd}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01"
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          name="userpswd1"
          value={formData.userpswd1}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01"
        />

        <div className="flex flex-row w-full my-2">
          <div className="mr-5 flex items-center cursor-pointer" onClick={() => handleGenderClick('남')}>
            <span className="material-icons mr-2" style={{ color: gender === '남' ? '#fff' : '#fff' }}>
              {gender === '남' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
            <label className="text-white">남</label>
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => handleGenderClick('여')}>
            <span className="material-icons mr-2" style={{ color: gender === '여' ? '#fff' : '#fff' }}>
              {gender === '여' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
            <label className="text-white">여</label>
          </div>
        </div>

        <input
          type="text"
          placeholder="핸드폰 번호"
          name="phone"
          value={formData.phone}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01"
        />

        <input
          type="text"
          placeholder="주소"
          name="addr"
          value={formData.addr}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01"
        />

        <input
          type="text"
          placeholder="특이사항"
          name="text"
          value={formData.text}
          onChange={eventHandler}
          disabled={loading}
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01 h-32"
        />

        {/* 오류 메시지 */}
        <div className="text-red-500 mb-2">{errorM}</div>

        <Button type="submit" className="py-2 text-[13px] w-full" disabled={loading}>
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
