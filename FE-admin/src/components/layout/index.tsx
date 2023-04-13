import { ComponentPropsWithoutRef, useState } from "react";
import clsx from "clsx";
import { ToastContainer } from "material-react-toastify";

import { Footer } from "../footer";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import "./styles.css";

type PageLayoutProps = ComponentPropsWithoutRef<"div">;

export function PageLayout({ children, ...rest }: PageLayoutProps) {
  const [isLoggedIn] = useState(JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken);
  const footerClass = clsx(!isLoggedIn ? "w-full" : "footer-logged-in");
  const contentClass = clsx(isLoggedIn && "content");

  return (
    <div className={`w-full layout ${isLoggedIn && "min-h-98/100"}`} {...rest}>
      {isLoggedIn && <Sidebar />}
      <div className={clsx(contentClass)}>
        <Header isLoggedIn={isLoggedIn} />
        <div
          className={`${isLoggedIn ? "layout-content footer-cal" : ""} pb-20`}
          style={{ minHeight: "880px" }}
        >
          {children}
        </div>
        <div className={clsx(footerClass, `${isLoggedIn ? "h-12 pt-6" : "h-12 pt-4"}`)}>
          <Footer isLoggedIn={isLoggedIn} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
