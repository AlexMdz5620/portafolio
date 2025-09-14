"use client";
import { usePublicStore } from '@/store/publicStore';
import { /* FaGithub, FaLinkedin, */ FaCoffee } from "react-icons/fa";
import LinkFooter from './ui/LinkFooter';

export default function Footer() {
    const { profile } = usePublicStore()
    if (profile) return (
        <footer
            className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-gray-800 border-t-4 border-red-500 font-light"
        >
            <div className="text-center mb-8">
                <p className="italic text-2xl md:text-3xl text-white flex items-center justify-center">
                    Trabajemos juntos!!!
                </p>
                <p className="italic text-xl md:text-2xl text-white mt-2 flex items-center justify-center">
                    ¿O invitame un café? <FaCoffee className="ml-2 text-yellow-400" />
                </p>
            </div>
            <div className="flex justify-center w-full max-w-4xl flex-wrap">
                {profile.links && (profile.links.map(link => (
                    <LinkFooter
                        key={link.id}
                        link={link}
                    />
                )))}
                {/* <a
                    href="https://github.com/AlexMdz5620"
                    target="_blank"
                    className="flex items-center text-xl md:text-2xl bg-white/10 text-white mx-4 my-2 px-6 py-3 rounded-lg transition-all duration-300 hover:translate-y-2 hover:bg-white/20 backdrop-blur-sm"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="mr-2" /> GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/manuel-alejandro-mendoza-c%C3%A1rdenas-133967274/"
                    target="_blank"
                    className="flex items-center text-xl md:text-2xl bg-white/10 text-white mx-4 my-2 px-6 py-3 rounded-lg transition-all duration-300 hover:translate-y-2 hover:bg-white/20 backdrop-blur-sm"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin className="mr-2" /> LinkedIn
                </a> */}
            </div>
            <p className="text-gray-400 mt-8 text-sm">
                &copy; {new Date().getFullYear()} - Hecho con todo mi ❤️ y mucho café
            </p>
        </footer>
    );
}