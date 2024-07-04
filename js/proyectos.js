/* import { url } from "./config.js";

document.addEventListener('DOMContentLoaded', async () => {
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const reposContainer = document.getElementById('projects-grid');
        data.forEach(repo => {
          const repoElement = document.createElement('div');
          repoElement.className = 'project';
          repoElement.className = 'project-tile';

          repoElement.innerHTML = `
          <img class="project-image" src="./assets/proyectos_img/enciclopedio_del_invocador.png" alt="project"></img>
          <a href="${repo.html_url}" target="_blank">
            <p class="project-title">
              <span class="code">&lt;</span>
              ${repo.name}
              <span class="code">/&gt;</span>
            </p>
          </a>`;

          reposContainer.appendChild(repoElement);
        });
        console.log(data)
      })
      .catch(error => console.error('Error al obtener los repositorios:', error));
}) */

const select = document.getElementById('value-section');
const todos = document.querySelectorAll('.project');
const devF = document.querySelectorAll('.devF');
const frontMentor = document.querySelectorAll('.frontMentor');
const perso = document.querySelectorAll('.perso');

select.addEventListener('change', () => {
  const value = select.value
  if (value === 'dev_f') {

    perso.forEach((perso) => perso.style.display = 'none')
    devF.forEach((devF) => devF.style.display = 'block')
    frontMentor.forEach((frontMentor) => frontMentor.style.display = 'none')

  } else if (value === 'frontend_mentor') {

    perso.forEach((perso) => perso.style.display = 'none')
    devF.forEach((devF) => devF.style.display = 'none')
    frontMentor.forEach((frontMentor) => frontMentor.style.display = 'block')

  } else if (value === 'personales') {

    perso.forEach((perso) => perso.style.display = 'block')
    devF.forEach((devF) => devF.style.display = 'none')
    frontMentor.forEach((frontMentor) => frontMentor.style.display = 'none')
    
  } else if (value === 'todos') {

    todos.forEach((todos) => todos.style.display = 'block')

  }
});
