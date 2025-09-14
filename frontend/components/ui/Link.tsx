import type { Link } from '@/schemas/zodSchema'
import { JSX } from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const faImg: Record<string, JSX.Element> = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    x: <FaX />,
}

export default function SocialNetLink({ link }: { link: Link}) {
    const icon = faImg[link.name.toLowerCase()] ?? <FaGithub />;
    return (
        <a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-3xl hover:text-[#be3144] transition-colors duration-300"
            aria-label={link.name}
        >
            {icon}
        </a>
    )
}
