import { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Nav() {
  const { user, signOut } = useUser();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  {
    /* 에러페이지 */
  }

  // const location = useLocation();

  // const hidePaths = ["/test"];

  // const shouldHide = hidePaths.some((path) => location.pathname.startsWith(path));

  // if (shouldHide) return null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 메뉴 열렸을 때 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 화면 크기 변경 시 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const allNavLinks = [
    {
      name: user?.name ? `${user.name} 님의 마이페이지` : "마이페이지",
      to: "/mypage",
    },
    { name: "진료 예약", to: "/dentistList" },
    { name: "릿치 소개", to: "/about" },
    { name: "치과 리스트", to: "/dentistList" },
    { name: "이벤트", to: "/event" },
  ];

  // u_kind가 2일 때 로그아웃을 제외한 모든 메뉴 숨기기
  const navLinks =
    user?.u_kind === 2 || user?.u_kind === "2"
      ? [] // 로그아웃을 제외한 모든 메뉴 숨기기
      : allNavLinks;

  // 로그아웃 핸들러
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      setIsOpen(false);
      alert("로그아웃 되었습니다.");
      navigate("/member/signin");
    } catch (error) {
      console.error("로그아웃 에러:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <nav className="bg-main-02 text-white fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="w-full md:w-[90%] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ham menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="메뉴 열기"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* logo */}
          <div className="shrink-0">
            <Link
              to="/"
              className="block hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/logo_wh.png"
                alt="logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* pc mene*/}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="relative text-white hover:text-light-01 transition-colors duration-300 py-2 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
              ))}
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="relative text-white hover:text-light-01 transition-colors duration-300 py-2 group cursor-pointer"
                >
                  로그아웃
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </button>
              ) : (
                <Link
                  to="/member/signin"
                  className="relative text-white hover:text-light-01 transition-colors duration-300 py-2 group"
                >
                  로그인
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
              )}
            </div>
          </div>

          {/* mb right menu*/}
          {user?.u_kind !== 2 && user?.u_kind !== "2" && (
            <div className="flex items-center gap-2 md:hidden">
              <Link
                to="/map"
                className="w-10 h-10 flex items-center justify-center text-white hover:text-main-01 transition-colors duration-300"
              >
                <span className="material-icons">location_on</span>
              </Link>
              <Link
                to="/mypage"
                className="w-10 h-10 flex items-center justify-center text-white hover:text-main-01 transition-colors duration-300"
              >
                <span className="material-icons">person</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* deem */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* mb menu*/}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out relative z-50 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-light-01">
          {/* mb menu big */}
          {navLinks.length > 0 && (
            <div className="bg-main-01 p-[2%]">
              <div className="flex justify-evenly">
                {navLinks[0] && (
                  <Link
                    to={navLinks[0].to}
                    className="w-[45%] flex-col my-[20px] py-[20px] px-4 text-deep bg-white hover:bg-deep hover:text-white transition-all duration-300 flex items-center gap-2 rounded-[10px] text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className="material-icons text-main-02"
                      style={{ fontSize: "48px" }}
                    >
                      person
                    </span>
                    {user?.name ? (
                      <>
                        {user.name} 님의
                        <br />
                        마이페이지
                      </>
                    ) : (
                      "마이페이지"
                    )}
                  </Link>
                )}
                {navLinks[1] && (
                  <Link
                    to={navLinks[1].to}
                    className="w-[45%] flex-col my-[20px] py-[20px] px-4 text-deep bg-white hover:bg-deep hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-[10px] text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className="material-icons text-main-02"
                      style={{ fontSize: "48px" }}
                    >
                      schedule
                    </span>
                    {navLinks[1].name}
                  </Link>
                )}
              </div>
            </div>
          )}
          {/* mb menu another  */}
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="block py-3 px-4 text-deep hover:bg-main-02/20 hover:text-deep transition-all duration-300 border-b border-main-02"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* 로그인/로그아웃 버튼 */}
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full text-left py-3 px-4 text-deep hover:bg-main-02/20 hover:text-deep transition-all duration-300 border-b border-main-02 cursor-pointer"
            >
              로그아웃
            </button>
          ) : (
            <Link
              to="/member/signin"
              className="block py-3 px-4 text-deep hover:bg-main-02/20 hover:text-deep transition-all duration-300 border-b border-main-02"
              onClick={() => setIsOpen(false)}
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
