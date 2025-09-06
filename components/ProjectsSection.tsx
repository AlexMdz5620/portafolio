import Link from 'next/link';
import ProjectCard from './projects/ProjectCard';

const projects = [
    {
        id: 1,
        image: "/proyectos_img/perso/enciclopedio_del_invocador.png",
        title: "Enciclopedia del Invocador",
        link: "https://alexmdz5620.github.io/LoL-encyclopedia/",
    },
    {
        id: 2,
        image: "/proyectos_img/perso/calculadora_básica.png",
        title: "Calculadora Básica",
        link: "https://alexmdz5620.github.io/basic_calculator/",
    },
    {
        id: 3,
        image: "/proyectos_img/perso/db_macrociclo.png",
        title: "API de Conceptos de Teo. y Met. del Entrenamiento",
        link: "https://github.com/AlexMdz5620/api_training_theory_and_methodology",
    },
    {
        id: 4,
        image: "/proyectos_img/dev.f/simulador_atm.png",
        title: "Simulador de un ATM",
        link: "https://alexmdz5620.github.io/proyecto-simulador-atm/#",
    },
    {
        id: 5,
        image: "/proyectos_img/dev.f/clone_pinterest.png",
        title: "Clon de Pinterest",
        link: "https://alexmdz5620.github.io/proyecto-clon-pinterest/",
    },
    {
        id: 6,
        image: "/proyectos_img/frontend_mentor/FQA.png",
        title: "FQA Carta en Acordeón",
        link: "https://alexmdz5620.github.io/frontend-mentor-faq-accordion-card/",
    },
];

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="text-center py-8 bg-[#45567d] w-full"
        >
            <h2 className="max-w-4xl mx-auto mb-10 pb-2 border-b-2 border-white text-white text-3xl md:text-4xl font-semibold">
                Aquí están algunos de mis Proyectos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-24 px-4">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            <Link
                href="/proyectos"
                className="bg-[#be3144] text-white px-6 py-3 rounded transition-colors duration-300 hover:bg-[#45567d] inline-flex items-center text-lg"
            >
                Más Proyectos
                <i className="fas fa-chevron-right ml-2.5 transition-transform duration-300 ease-out group-hover:translate-x-1"></i>
            </Link>
        </section>
    );
}