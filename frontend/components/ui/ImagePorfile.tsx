import Image from 'next/image'
import React from 'react'

export default function ImagePorfile() {
    return (
        <Image
            src="/perfil/perso.jpg"
            alt="Alex Mendoza"
            width={260}
            height={260}
            className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-[#be3144]"
        />
    )
}
