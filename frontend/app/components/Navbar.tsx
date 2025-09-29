"use client";

import { login, logout } from "@/lib/auth-action";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="mx-auto container flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
          <span className="text-2xl font-bold text-gray-800">Trivio</span>
        </Link>

        <div className="flex items-center space-x-4">
          {session && (
            <>
              <Link
                href={"/trips"}
                className="text-slate-900 hover:text-sky-500 font-semibold"
              >
                My Trips
              </Link>
              <Link
                href={"/globe"}
                className="text-slate-900 hover:text-sky-500 font-semibold"
              >
                Globe
              </Link>
              <button
                className="font-bold !rounded-xl flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 cursor-pointer"
                onClick={logout}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
