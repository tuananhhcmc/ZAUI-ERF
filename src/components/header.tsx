import { useAtomValue } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import {
  categoriesStateUpwrapped,
  loadableUserInfoState,
} from "@/state";
import { useMemo } from "react";
import { useRouteHandle } from "@/hooks";
import { getConfig } from "@/utils/template";
import headerIllus from "@/static/header-illus.svg";
import SearchBar from "./search-bar";
import TransitionLink from "./transition-link";
import { Icon } from "zmp-ui";
import { DefaultUserAvatar } from "./vectors";

export default function Header() {
  const categories = useAtomValue(categoriesStateUpwrapped);
  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();
  const userInfo = useAtomValue(loadableUserInfoState);

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ categories, params: match.params });
      } else {
        return handle.title;
      }
    }
  }, [handle, categories]);

  const showBack = location.key !== "default" && !handle?.noBack;

  return (
    <div
      className="w-full flex flex-col px-4 pt-4 pb-2 bg-green-600 text-white rounded-b-2xl shadow-lg overflow-hidden bg-no-repeat bg-right-top"
      style={{
        backgroundImage: `url(${headerIllus})`,
        backgroundSize: "auto 80%",
      }}
    >
      <div className="w-full min-h-12 pr-[90px] flex py-2 space-x-2 items-center">
        {handle?.logo ? (
          <>
            <img
              src={getConfig((c) => c.template.logoUrl)}
              className="flex-none w-10 h-10 rounded-full border-2 border-white shadow"
              alt="Logo"
            />
            <TransitionLink to="/stations" className="flex-1 overflow-hidden">
              <div className="flex items-center space-x-1">
                <h1 className="text-lg font-bold truncate">
                  {getConfig((c) => c.template.shopName)}
                </h1>
                <Icon icon="zi-chevron-right" />
              </div>
              <p className="overflow-x-auto whitespace-nowrap text-xs opacity-90">
                {getConfig((c) => c.template.shopAddress)}
              </p>
            </TransitionLink>
          </>
        ) : (
          <>
            {showBack && (
              <div
                className="py-1 px-2 cursor-pointer hover:bg-green-700 rounded transition"
                onClick={() => navigate(-1)}
              >
                <Icon icon="zi-arrow-left" />
              </div>
            )}
            <div className="text-xl font-medium truncate">{title}</div>
          </>
        )}
      </div>
      {handle?.search && (
        <div className="w-full py-2 flex space-x-2 items-center">
          <div className="flex-1">
            <SearchBar
              className="bg-white text-black rounded-lg shadow px-4 py-2"
              onFocus={() => {
                if (location.pathname !== "/search") {
                  navigate("/search", { viewTransition: true });
                }
              }}
            />
          </div>
          <TransitionLink to="/profile">
            {userInfo.state === "hasData" && userInfo.data ? (
              <img
                className="w-9 h-9 rounded-full border-2 border-white shadow"
                src={userInfo.data.avatar}
                alt="User"
              />
            ) : (
              <DefaultUserAvatar
                width={36}
                height={36}
                className={
                  "bg-white rounded-full border-2 border-green-600 " +
                  (userInfo.state === "loading" ? "animate-pulse" : "")
                }
              />
            )}
          </TransitionLink>
        </div>
      )}
    </div>
  );
}