import { Link } from '@/schemas/linkSchema';
import { JSX, ReactNode } from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

type SocialNetLinkProps = {
    link: Link;
    children?: ReactNode;
}

export default function SocialNetLink({ link, children }: SocialNetLinkProps) {
    const faImg: Record<string, JSX.Element> = {
        github: <FaGithub className={`${children ? 'text-xl' : ''}`} />,
        linkedin: <FaLinkedin className={`${children ? 'text-xl' : ''}`} />,
        facebook: <FaFacebook className={`${children ? 'text-xl' : ''}`} />,
        instagram: <FaInstagram className={`${children ? 'text-xl' : ''}`} />,
        x: <FaX className={`${children ? 'text-xl' : ''}`} />,
    }

    const icon = faImg[link.name.toLowerCase()] ?? <FaGithub />;

    return (
        <a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex text-white ${children ? '' : 'text-3xl'} hover:text-[#be3144] transition-colors duration-150`}
            aria-label={link.name}
        >
            {icon}
            {children}
        </a>
    )
}
