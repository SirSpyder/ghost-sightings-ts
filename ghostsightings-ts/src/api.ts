// src/api.ts
//this is used for Api 
import { GhostSighting } from './types';

const API_URL = 'http://localhost:3000/ghostSightings';

export async function fetchSightings(): Promise<GhostSighting[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch ghost sightings');
  return response.json();
}

export async function createSighting(location: string, date: string, typeOfGhost: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location, date, typeOfGhost }),
  });
  if (!response.ok) throw new Error('Failed to create ghost sighting');
}

export async function deleteSighting(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete ghost sighting entry');
}
