import React, { useState, useEffect } from 'react';
import Button from '../../../componetns/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import supabase from '../../../assets/utils/supabase';

function EditInfo() {
  const [checked, setChecked] = useState(false);
  const [select, setSelect] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  const [addr, setAddr] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    pwd: '',
    pwd_ch: '',
    phone: '',
    addr: '',
    bigo: '',
  });

  // 사용자 정보로 폼 초기화
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        pwd: '',
        pwd_ch: '',
        phone: user.phone || '',
        addr: user.addr || '',
        bigo: user.text || '',
      });

      // 성별 설정 (user.gender가 '남'이면 option1, '여'이면 option2)
      if (user.gender === '남' || user.gender === '남자' || user.gender === 'M') {
        setSelect('option1');
      } else if (user.gender === '여' || user.gender === '여자' || user.gender === 'F') {
        setSelect('option2');
      }
    }
  }, [user]);

  // 공용 handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('handleSubmit 실행됨');
    console.log('checked:', checked);
    console.log('form:', form);
    console.log('select:', select);
    console.log('user:', user);

    if (!checked) {
      alert('개인 정보 체크 동의해 주세요.');
      return;
    }

    // 비밀번호는 선택사항이므로 제외하고 체크
    const requiredFields = ['name', 'email', 'phone', 'addr'];
    for (let key of requiredFields) {
      if (!form[key] || form[key].trim() === '') {
        const label = {
          name: '이름',
          email: '이메일',
          phone: '연락처',
          addr: '주소',
        };

        alert(`${label[key]}를 입력해주세요.`);
        return;
      }
    }

    // 비밀번호 변경 시 비밀번호 확인 체크
    if (form.pwd && form.pwd.trim() !== '') {
      if (form.pwd !== form.pwd_ch) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    // 성별이 선택되지 않았는지 체크
    if (!select) {
      alert('성별을 선택해주세요.');
      return;
    }

    if (!user?.id) {
      alert('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    console.log('검증 통과, 업데이트 시작');

    try {
      // 성별을 DB 형식으로 변환 (option1 -> 남, option2 -> 여)
      const genderValue = select === 'option1' ? 'M' : 'F';

      // h_user 테이블 업데이트
      const updateData = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        addr: form.addr.trim(),
        gender: genderValue,
        text: form.bigo.trim() || null,
      };

      console.log('업데이트할 데이터:', updateData);
      console.log('사용자 ID:', user.id);

      const { data, error: updateError } = await supabase.from('h_user').update(updateData).eq('id', user.id).select();

      console.log('업데이트 결과:', { data, error: updateError });

      if (updateError) {
        console.error('업데이트 오류:', updateError);
        alert('정보 수정 중 오류가 발생했습니다: ' + updateError.message);
        return;
      }

      console.log('h_user 테이블 업데이트 성공');

      // 비밀번호가 입력된 경우 Supabase Auth 비밀번호 업데이트
      if (form.pwd && form.pwd.trim() !== '') {
        try {
          console.log('비밀번호 업데이트 시작');

          // 타임아웃 추가 (1초)
          const updatePasswordPromise = supabase.auth.updateUser({
            password: form.pwd,
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('비밀번호 업데이트 타임아웃')), 1000)
          );

          const { data: pwdData, error: passwordError } = await Promise.race([
            updatePasswordPromise,
            timeoutPromise,
          ]).catch((err) => {
            console.error('비밀번호 업데이트 타임아웃 또는 오류:', err);
            return { data: null, error: err };
          });

          console.log('비밀번호 업데이트 결과:', { data: pwdData, error: passwordError });

          if (passwordError) {
            // 기존 비밀번호와 같다는 오류는 무시하고 계속 진행
            if (passwordError.message && passwordError.message.includes('different from the old password')) {
              console.log('비밀번호가 기존과 동일하여 변경하지 않음');
            } else {
              console.error('비밀번호 변경 오류:', passwordError);
              // 비밀번호 오류는 alert만 표시하고 계속 진행 (다른 정보는 업데이트 완료됨)
              console.warn('비밀번호 변경 실패했지만 다른 정보는 업데이트됨');
            }
          } else {
            console.log('비밀번호 업데이트 성공');
          }
        } catch (pwdErr) {
          console.error('비밀번호 업데이트 중 예외 발생:', pwdErr);
          // 예외 발생해도 계속 진행
        }
      }

      console.log('비밀번호 업데이트 처리 완료');

      // 이메일이 변경된 경우 Supabase Auth 이메일 업데이트
      if (form.email && form.email.trim() !== user.email) {
        try {
          console.log('이메일 업데이트 시작');
          const { data: emailData, error: emailError } = await supabase.auth.updateUser({
            email: form.email.trim(),
          });

          console.log('이메일 업데이트 결과:', { data: emailData, error: emailError });

          if (emailError) {
            console.error('이메일 변경 오류:', emailError);
            // 이메일 오류도 alert만 표시하고 계속 진행
            console.warn('이메일 변경 실패했지만 다른 정보는 업데이트됨');
          } else {
            console.log('이메일 업데이트 성공');
          }
        } catch (emailErr) {
          console.error('이메일 업데이트 중 예외 발생:', emailErr);
          // 예외 발생해도 계속 진행
        }
      }

      console.log('이메일 업데이트 처리 완료');
      console.log('모든 업데이트 처리 완료');
      alert('정보가 수정되었습니다');
      console.log('alert 표시 후 navigate 실행');
      navigate('/mypage');
      console.log('navigate 실행 완료');
    } catch (error) {
      console.error('수정 중 오류:', error);
      alert('정보 수정 중 오류가 발생했습니다: ' + error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-light-01 myBg px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg">
        <div className="container flex flex-col items-center">
          <h4 className="tit w-[90%] my-4 mt-15 mx-auto + max-w-xl">
            <span className="material-icons">person</span>
            회원 정보 수정
          </h4>

          <div className="w-full flex flex-col items-center ">
            <div className="w-[90%] py-2 mx-auto + max-w-xl">
              <form className="w-full" onSubmit={handleSubmit}>
                {/* 이름 */}
                <div className="mb-4 w-full ">
                  <input
                    type="text"
                    name="name"
                    className="border border-main-01 p-2 w-full rounded bg-white focus:bg-white"
                    placeholder="이름"
                    value={form.name}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 이메일 */}
                <div className="mb-4 w-full">
                  <input
                    type="text"
                    name="email"
                    className="border border-main-01 p-2 w-full rounded bg-white focus:bg-white"
                    placeholder="이메일"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 비밀번호 */}
                <div className="mb-4 w-full">
                  <input
                    type="password"
                    name="pwd"
                    className="border border-main-01 p-2 w-full rounded bg-white"
                    placeholder="비밀번호 변경"
                    value={form.pwd}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 비밀번호 확인 */}
                <div className="mb-4 w-full">
                  <input
                    type="password"
                    name="pwd_ch"
                    className="border border-main-01 p-2 w-full rounded bg-white"
                    placeholder="비밀번호 변경 확인"
                    value={form.pwd_ch}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 성별 */}
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSelect('option1')}>
                    <input
                      type="radio"
                      name="gender"
                      className="hidden"
                      checked={select === 'option1'}
                      onChange={() => setSelect('option1')}
                    />
                    {select === 'option1' ? (
                      <span className="material-icons text-main-02">radio_button_checked</span>
                    ) : (
                      <span className="material-icons text-main-02">radio_button_unchecked</span>
                    )}
                    남
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSelect('option2')}>
                    <input
                      type="radio"
                      name="gender"
                      className="hidden"
                      checked={select === 'option2'}
                      onChange={() => setSelect('option2')}
                    />
                    {select === 'option2' ? (
                      <span className="material-icons text-main-02">radio_button_checked</span>
                    ) : (
                      <span className="material-icons text-main-02">radio_button_unchecked</span>
                    )}
                    여
                  </label>
                </div>
                {/* 연락처 */}
                <div className="mb-4 w-full">
                  <input
                    type="text"
                    name="phone"
                    className="border border-main-01 p-2 w-full rounded bg-white"
                    placeholder="연락처"
                    value={form.phone}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 주소 */}
                <div className="mb-4 w-full">
                  <input
                    type="text"
                    name="addr"
                    className="border border-main-01 p-2 w-full rounded bg-white"
                    placeholder="주소"
                    value={form.addr}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 특이 사항 */}
                <div className="mb-4 w-full">
                  <textarea
                    name="bigo"
                    className="border border-main-01 p-2 w-full h-24 rounded resize-none bg-white"
                    placeholder="특이 사항"
                    value={form.bigo}
                    onChange={handleChange}
                    style={{
                      backgroundColor: 'white',
                      WebkitBoxShadow: '0 0 0px 1000px white inset',
                    }}
                  />
                </div>
                {/* 체크박스 */}
                <div
                  onClick={() => setChecked(!checked)}
                  className="flex items-top gap-2 cursor-pointer select-none mb-6"
                >
                  <span className="material-icons text-main-02">
                    {checked ? 'check_box' : 'check_box_outline_blank'}
                  </span>

                  <span className="text-gray-mid !text-xs md:!text-base">
                    병원 예약을 위해 기본 개인정보를 수집·이용합니다. 예약 완료 후 관련 법령에 따라 보관 후 파기합니다.
                  </span>
                </div>
                {/* 버튼 */}
                <Button
                  size="long"
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    console.log('Button 클릭됨');
                    // form submit은 자동으로 처리됨
                  }}
                >
                  정보수정
                </Button>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditInfo;
