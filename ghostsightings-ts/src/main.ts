// src/main.ts
//import functions
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSightings, createSighting, deleteSighting } from './api';
import { GhostSighting } from './types';

const form = document.getElementById('sighting-form') as HTMLFormElement;
const sightingList = document.getElementById('sighting-list') as HTMLUListElement;
// for fecthing and deleting Sightings

async function displaySightings() {
  const sightings = await fetchSightings();
  sightingList.innerHTML = '';
  sightings.forEach(sighting => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${sighting.location} - ${sighting.date} - ${sighting.typeOfGhost}
      <button class="btn btn-outline-danger btn-sm" data-id="${sighting.id}">Delete Entry</button>
    `;
    const deleteButton = li.querySelector('button') as HTMLButtonElement;
    deleteButton.addEventListener('click', () => {
      if (sighting.id) deleteSighting(sighting.id);
    });
    sightingList.appendChild(li);
  });
}
// form to add sighitngs 
form.addEventListener('submit', async event => {
  event.preventDefault();
  const location = (document.getElementById('location') as HTMLInputElement).value;
  const date = (document.getElementById('date') as HTMLInputElement).value;
  const typeOfGhost = (document.getElementById('typeOfGhost') as HTMLInputElement).value;
  await createSighting(location, date, typeOfGhost);
  form.reset();
  await displaySightings();
});

// Load initial sightings
displaySightings();
