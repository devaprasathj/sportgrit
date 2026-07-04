import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SportChatBot from "./SportChatBot";

export default function Layout({ children, hideNavbar = false, user }) {
  const location = useLocation();
  const showChatbot = location.pathname === "/home" || location.pathname === "/assessment";

  return (
    <>
      {!hideNavbar && <Navbar user={user} />}
      <div className={hideNavbar ? "" : "pt-20"}>
        {children}
      </div>
      {showChatbot && <SportChatBot />}
    </>
  );
}
