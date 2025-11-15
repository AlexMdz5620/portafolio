"use client";

import { usePublicStore } from '@/store/publicStore';
import { /* FaGithub, FaLinkedin, */ FaCoffee } from "react-icons/fa";
import LinkFooter from './ui/LinkFooter';
import { useRouteDetection } from '@/hooks/useRouteDetection';

export default function Footer() {
    const { profile } = usePublicStore();
    const { isAdminRoute } = useRouteDetection();

    if (isAdminRoute) return null

    if (profile) return (
        <footer
            className="flex flex-col items-center justify-center p-8 bg-linear-to-b from-gray-900 to-gray-800 border-t-4 border-red-500 font-light"
        >
            <div className="text-center mb-8">
                <p className="italic text-2xl md:text-3xl text-white flex items-center justify-center">
                    Trabajemos juntos!!!
                </p>
                <p className="italic text-xl md:text-2xl text-white mt-2 flex items-center justify-center">
                    ¿O vamos un café? <FaCoffee className="ml-2 text-yellow-400" />
                </p>
            </div>
            <div className="flex justify-center w-full max-w-4xl flex-wrap">
                {profile.links && (profile.links.filter(link => link.active).map(link => (
                    <LinkFooter
                        key={link.id}
                        link={link}
                    />
                )))}
            </div>
            <p className="text-gray-400 mt-8 text-sm">
                &copy; {new Date().getFullYear()} - Hecho con todo mi ❤️ y mucho café
            </p>
        </footer>
    );
}