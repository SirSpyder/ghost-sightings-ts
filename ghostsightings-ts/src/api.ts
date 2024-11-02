// src/api.ts
//this is used for Api 
import { GhostSighting } from './types';

const API_URL = 'http://localhost:3000/ghostSightings';

export async function fetchSightings(): Promise<GhostSighting[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch ghost sightings');
  return response.json();
}
//createSighting
// was having problems with the db fixed it by adding the await to this 
export async function createSighting(location: string, date: string, typeOfGhost: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location, date, typeOfGhost }),
  });
  if (!response.ok) throw new Error('Failed to create ghost sighting');
  await fetchSightings(); // refresh list after new entry
}
//deleteSighting
export async function deleteSighting(id: number): Promise<void> {   try {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete ghost sighting entry');
  }
//my auto page refresh on delete is not working idk how to fix atm it should work
  console.log(`Ghost sighting with ID ${id} deleted successfully`);
  await fetchSightings(); // Refresh the list after deletion
} catch (error) {
  console.error(`Error deleting ghost sighting with ID ${id}:`, error);
}
}