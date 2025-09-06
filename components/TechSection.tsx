export default function TechSection() {
    const technologies = [
        { name: "JavaScript", level: "Intermedio" },
        { name: "HTML", level: "Intermedio" },
        { name: "CSS", level: "Intermedio" },
        { name: "SQL", level: "Principiante/Intermedio" },
        { name: "React", level: "Principiante" },
        { name: "Python", level: "Principiante" }
    ];

    return (
        <section id="tech" className="flex flex-col justify-center items-center text-center w-full min-h-screen px-8 bg-gradient-to-br from-gray-900 to-gray-700 py-8">
            <h1 className="text-4xl font-bold text-white mb-6">Tecnologías que Conozco</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {technologies.map((tech, index) => (
                    <li
                        key={index}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/10"
                    >
                        <span className="text-2xl font-semibold block mb-2">{tech.name}</span>
                        <span className="text-lg text-blue-200">{tech.level}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}