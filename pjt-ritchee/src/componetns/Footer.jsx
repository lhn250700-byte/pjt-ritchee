import { Link, useLocation } from "react-router-dom";

function Footer() {
  {
    /* 에러페이지 */
  }
  // const loaction = useLocation();

  // const hidePaths = ["/test"];

  // const shouldHide = hidePaths.some((path) => location.pathname.startsWith(path));

  // if (shouldHide) return null;

  return (
    <footer className="bg-deep text-white py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col md:justify-between gap-4">
          {/* 로고 */}
          <Link to="/" className="block hover:opacity-80 transition-opacity duration-300 w-fit">
            <img
              src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/logo_wh.png"
              alt="logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* 설명 */}
          <p className="text-white text-xs" style={{ fontWeight: 100 }}>
            COPYRIGHTⓒ 2025.jumeogdajim. fist fight. INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
