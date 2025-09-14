import Image from 'next/image';

type ImageProfileType = {
    img: string
    name: string
    lastname: string
}

export default function ImagePorfile({ img, name, lastname }: ImageProfileType) {
    return (
        <Image
            // src="/perfil/perso.jpg"
            src={`${img}`}
            // alt="Alex Mendoza"
            alt={`${name} ${lastname}`}
            width={260}
            height={260}
            className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-[#be3144]"
        />
    )
}
