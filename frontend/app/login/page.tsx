'use client'
import { useState } from "react";
import Image from "next/image";
import { login } from "@/lib/auth-action";

const LoginPage = () => {
    const [hadAccount, setHadAccount] = useState(true);
    return <div className="container flex gap-10">
        <div className="w-2/3 mt-[42px] hidden lg:flex items-center">
            {/* Video */}
            <div className="xl:aspect-video h-full w-full rounded-lg overflow-hidden shadow-md">
                <video
                    className="w-full h-full object-cover rounded-lg shadow-md pointer-events-none"
                    src="/trivio-banner-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Trivio background video"
                />
            </div>
        </div>
        <div className="lg:w-1/3 w-full flex justify-center items-center">
            <div className="w-full bg-white flex flex-col gap-4 mt-[42px] p-6 md:border border-gray-300 rounded">
            <div className="flex justify-between">
                <div>
                    <p className="text-2xl">Welcome to</p>
                    <h1 className="-mt-1">Trivio</h1>
                </div>
                <Image src={"/flying-plane.jpg"} alt="Trivio" width={100} height={50} />
            </div>

            {/* github login */}
            <div>
                <button onClick={login} className="flex h-12 font-bold items-center justify-center bg-gray-900 hover:bg-gray-700 text-white p-2 w-full">
                    Sign in with GitHub
                    <svg
                        className="w-6 h-6 ml-2"
                        viewBox="0 0 24 24"
                        aria-label="GitHub"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fill="currentColor"
                        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.836 2.807 1.306 3.492.997.108-.775.418-1.306.76-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.01-.322 3.3 1.23.95-.266 1.982-.399 3.003-.404 1.02.005 2.047.138 3.003.404 2.29-1.552 3.3-1.23 3.3-1.23.654 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.81 1.102.81 2.222 0 1.606-.014 2.896-.014 3.286 0 .319.216.694.825.576C20.565 21.796 24 17.296 24 12 24 5.37 18.627 0 12 0z"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-center italic text-gray-500">Or {hadAccount ? "sign in" : "create an account"}</span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" required className="border border-gray-300 p-2 rounded placeholder:italic" />
                <input type="password" placeholder="Password" required className="border border-gray-300 p-2 rounded placeholder:italic" />
                <p className="text-[12px] -mt-2 text-right">{hadAccount ? "Don't have an account?" : "Already have an account?"} <a onClick={() => setHadAccount(!hadAccount)} className="text-blue-500 hover:text-blue-700 font-bold duration-300 !h-auto cursor-pointer">{hadAccount ? "Sign up now!" : "Sign in now!"}</a></p>
                <button onClick={login} className="bg-blue-500 text-white h-12 p-2 rounded font-bold hover:bg-blue-900">Sign {hadAccount ? "In" : "Up"}</button>
            </form>
        </div>
        </div>
    </div>
}

export default LoginPage;