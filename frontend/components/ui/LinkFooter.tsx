// import type { Link } from '@/schemas/zodSchema'
import { Link } from '@/schemas/linkSchema';
import { JSX } from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const faImg: Record<string, JSX.Element> = {
    github: <FaGithub className="mr-2" />,
    linkedin: <FaLinkedin className="mr-2" />,
    facebook: <FaFacebook className="mr-2" />,
    instagram: <FaInstagram className="mr-2" />,
    x: <FaX className="mr-2" />,
}

export default function LinkFooter({ link }: { link: Link }) {
    const icon = faImg[link.name.toLowerCase()] ?? <FaGithub />;

    return (
        <a
            href={link.link}
            target="_blank"
            className="flex items-center text-xl md:text-2xl bg-white/10 text-white mx-4 my-2 px-6 py-3 rounded-lg transition-all duration-300 hover:translate-y-2 hover:bg-white/20 backdrop-blur-sm"
            rel="noopener noreferrer"
        >
            {icon} {link.name}
        </a>
    )
}
