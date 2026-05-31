import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If URL contains a hash, don't force scroll to top
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", // use "auto" if you don't want animation
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;