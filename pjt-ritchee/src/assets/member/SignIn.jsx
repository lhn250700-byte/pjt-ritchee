import React, { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../componetns/Button";

function SignIn() {
  const { loading, setLoading, signIn } = useUser();

  const [formData, setFormData] = useState({
    useremail: "",
    userpwd: "",
  });

  const [errorM, setErrorM] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const pwdRef = useRef(null);

  const eventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    e.target.setCustomValidity("");
    setErrorM("");
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    setErrorM("");
    setLoading(true);

    try {
      const result = await signIn(formData.useremail, formData.userpwd);

      if (result?.error) {
        setErrorM("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
        setFormData({ useremail: "", userpwd: "" });
        emailRef.current?.focus();
        setLoading(false);
        return;
      }
      
      // 로그인 성공 시 약간의 지연 후 이동 (상태 업데이트 대기)
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 200);
    } catch (err) {
      console.error("로그인 예외:", err);
      setErrorM("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  return (
    <div className="  bg-main-01 myBg flex flex-col items-center justify-center h-screen ">
      <div>
        <img
          src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/logo_wh.png"
          alt="logo"
          className="w-32 mb-6"
        />
      </div>
      {/* PC 버전 */}

      <form
        onSubmit={confirmHandler}
        className="flex flex-col items-center w-[90%] max-w-[480px] my-10"
      >
        <label htmlFor="email" className="sr-only">
          이메일
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="아이디를 입력하세요."
          name="useremail"
          onChange={eventHandler}
          required
          disabled={loading}
          onInvalid={(e) =>
            e.target.setCustomValidity("이메일을 입력해주세요.")
          }
          className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full max-w-[480px] py-2 px-3 mb-2 border border-main-01 focus:border-main-02"
        />

        <label htmlFor="pwd" className="sr-only">
          비밀번호
        </label>
        <input
          ref={pwdRef}
          type="password"
          id="pwd"
          placeholder="비밀번호를 입력하세요."
          name="userpwd"
          onChange={eventHandler}
          required
          disabled={loading}
          onInvalid={(e) =>
            e.target.setCustomValidity("비밀번호를 입력해주세요.")
          }
          className="outline-none placeholder-gray-mid rounded text-[13px]  bg-white w-full max-w-[480px] py-2 px-3 mb-2 border border-main-01 focus:border-main-02"
        />
        {errorM && (
          <div
            style={{ color: "red", marginBottom: "6px", textAlign: "center" }}
          >
            {errorM}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full max-w-[480px] mt-2 mb-3 py-2 text-[13px]"
        >
          {loading ? "로그인 중..." : " 로그인"}
        </Button>

        <hr className=" border-gray-300 rounded my-3 w-full " />
        <div className="flex flex-col gap-[1px] w-full ">
          <Button type="button" className="py-2 text-[13px] w-full">
            아이디 / 비밀번호 찾기
          </Button>
          <Link to="/member/signUp">
            <Button className="py-2 text-[13px] w-full">회원가입</Button>
          </Link>
        </div>
      </form>

      {/* 모바일 버전 */}
      {/* <div className="block md:hidden">
        <div className="wrap myBg  bg-light-01 h-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col items-center pb-6">
            <form onSubmit={confirmHandler} className="flex flex-col items-center w-full pb-30">
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                ref={emailRef}
                type="email"
                id="mobile-email"
                placeholder="아이디를 입력하세요."
                name="useremail"
                onChange={eventHandler}
                required
                disabled={loading}
                onInvalid={(e) => e.target.setCustomValidity("이메일을 입력해주세요.")}
                className="outline-none placeholder-gray-mid rounded text-[13px] bg-white w-full py-2 px-3 mb-2 border border-main-01 focus:border-main-02"
              />

              <label htmlFor="pwd" className="sr-only">
                비밀번호
              </label>
              <input
                ref={pwdRef}
                type="password"
                id="mobile-pwd"
                placeholder="비밀번호를 입력하세요."
                name="userpwd"
                onChange={eventHandler}
                required
                disabled={loading}
                onInvalid={(e) => e.target.setCustomValidity("비밀번호를 입력해주세요.")}
                className="outline-none placeholder-gray-mid rounded text-[13px]  bg-white w-full py-2 px-3 mb-2 border border-main-01 focus:border-main-02"
              />
              {errorM && <div style={{ color: "red", marginBottom: "6px", textAlign: "center" }}>{errorM}</div>}

              <Button type="submit" disabled={loading} className="w-full mt-2 mb-3 py-2 text-[13px]">
                {loading ? "로그인 중..." : " 로그인"}
              </Button>

              <hr className=" border-gray-300 rounded my-3 w-full" />
              <div className="flex flex-col gap-[1px] w-full">
                <Button type="button" className="py-2 text-[13px] w-full">
                  아이디 / 비밀번호 찾기
                </Button>
                <Link to="/member/signUp">
                  <Button className="py-2 text-[13px] w-full">회원가입</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default SignIn;
