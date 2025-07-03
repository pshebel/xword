'use client'

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

interface Word {
  id: number;
  clue: string;
  across: boolean;
  index: number;
}

interface Puzzle {
  id: number;
  words: Word[];
}


async function getXword(): Promise<Puzzle> {
  const response = await fetch(`http://localhost:3000/api/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data as Puzzle; 
}

export default function Home() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getXword()
      .then(data => setPuzzle(data))
      .catch(err => setError(err.message));
  }, []);
  return (
    <div className={styles.page}>
      <div>header</div>
      <div>board</div>
      {error && <div>Error: {error}</div>}
      {puzzle && (
        <div>
          <h3>Puzzle ID: {puzzle.id}</h3>
          <ul>
            {puzzle.words.map(word => (
              <li key={word.id}>
                {word.clue} (Index: {word.index}, Across: {word.across ? 'Yes' : 'No'})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
