"use client";
import Image from "next/image";
import { BsTwitter, BsSearch, BsBookmark } from "react-icons/bs";
import { BiHomeCircle } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useCallback } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

interface TwitterSideBarButtons {
  title: string;
  icons: React.ReactNode;
}

const sidebarMenu: TwitterSideBarButtons[] = [
  {
    title: "Home",
    icons: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icons: <BsSearch />,
  },
  {
    title: "Notifications",
    icons: <IoIosNotificationsOutline />,
  },
  {
    title: "Bookmark",
    icons: <BsBookmark />,
  },
  {
    title: "Profile",
    icons: <MdOutlineAccountCircle />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleGoogleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Token success");
      if (verifyGoogleToken) {
        window.localStorage.setItem("_twitter_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  return (
    <GoogleOAuthProvider clientId="753225828247-h0bg4kilcb6m451dars5vrkj95vj4gg9.apps.googleusercontent.com">
      <Toaster />
      <div className="grid grid-cols-12 h-screen w-s px-56">
        <div className="col-span-3 ">
          <div className="text-3xl mt-8  ml-4 hover:bg-gray-800 h-fit rounded-full p-2 cursor-pointer w-fit">
            <BsTwitter />
          </div>
          <div className="mt-4 font-bold text-2xl cursor-pointer">
            <ul>
              {sidebarMenu.map((item) => {
                return (
                  <li
                    className="flex justify-start items-center gap-4 hover:bg-gray-600 rounded-2xl w-fit px-4 py-2"
                    key={item.title}
                  >
                    <span className="text-3xl">{item.icons}</span>
                    <span> {item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-5 px-3 ">
            <button className="bg-[#1d9bf0] text-lg rounded-full p-4 w-full">
              Post
            </button>
          </div>
          {user && (
            <div className="">
              {user && user.profileImageUrl && (
                <Image
                  className="rounded "
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
            </div>
          )}
        </div>
        <div className=" col-span-6 border-r-[1px] border-l-[1px] border-gray-600 overflow-scroll h-screen">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className=" p-5 border rounded-lg bg-slate-700 ">
            <h1 className="text-2xl my-2">New to Twitter</h1>
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
