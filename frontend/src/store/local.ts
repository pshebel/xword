import Success from '@/components/common/success';
import { Puzzle, State } from '@/types/api'

const initialState: State = {
    puzzle: {
        id: '0',
        cert: '',
        size: 0,
        block: [],
        words: []
    },
    date: '',
    focus: 0,
    squares: [],
    orientation: true,
    success: false,
    start: '',
    finish: ''
}

const STORAGE_KEY = 'xword';

export const getState = (): State => {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) return initialState;

  try {
    const data: State = JSON.parse(rawData);
    if (!data?.puzzle) return initialState;
    return data
  } catch (error) {
    console.error("Failed to sync guest data", error);
    return initialState
  }
};

export const setState = (date: string, puzzle: Puzzle): void => {
    let tmp = Array(puzzle.size * puzzle.size).fill("")
    puzzle.block.forEach((b: number) => {
        tmp[b] = "*"
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify({...initialState, squares: tmp, date, puzzle}));
}

export const resetState = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
}

export const getFocus = (): number => {
    const rawData = localStorage.getItem(STORAGE_KEY)
    if (!rawData) return 0

    try {
        const data: State = JSON.parse(rawData);
        return data.focus
    } catch(error) {
        console.error("failed to get focus", error)
        return 0
    }
}   

export const setFocus = (index: number): void => {
    const rawData = localStorage.getItem(STORAGE_KEY)
    if (!rawData) return

    try {
        const data: State = JSON.parse(rawData);
        data.focus = index

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("failed to set focus", error);
    }
}

export const getSquares = (): string[] => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return [];
    try {
        const data: State = JSON.parse(rawData);
        return data.squares;
    } catch (error) {
        console.error("failed to get squares", error);
        return [];
    }
};

export const setSquares = (squares: string[]): void => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;
    try {
        const data: State = JSON.parse(rawData);
        data.squares = squares;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("failed to set squares", error);
    }
};


export const getOrientation = (): boolean => {
    const rawData = localStorage.getItem(STORAGE_KEY)
    if (!rawData) return true

    try {
        const data: State = JSON.parse(rawData);
        return data.orientation
    } catch(error) {
        console.error("failed to get focus", error)
        return true
    }
}   

export const setOrientation = (orientation: boolean): void => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;
    try {
        const data: State = JSON.parse(rawData);
        data.orientation = orientation;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("failed to set orientation", error);
    }
};



export const setSuccess = (): void => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;
    try {
        const data: State = JSON.parse(rawData);
        data.success = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("failed to set success", error);
    }
};


export const setStart = (): void => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;
    try {
        const data: State = JSON.parse(rawData);
        data.start = new Date();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("failed to set success", error);
    }
}

export const setFinish = (): void => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;
    try {
        const data: State = JSON.parse(rawData);
        data.finish = new Date();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("failed to set success", error);
    }
}

export const getTime = (): string => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return '';
    const data: State = JSON.parse(rawData);
    if (!data?.start || !data?.finish) return '';
    const start = data.start ? new Date(data.start) : null;
    const finish = data.finish ? new Date(data.finish) : null;

    if (!start || !finish || isNaN(start.getTime()) || isNaN(finish.getTime())) {
        return '';
    }

    const diffInMs = Math.abs(finish.getTime() - start.getTime());

    // 2. Convert to total seconds
    const totalSeconds = Math.floor(diffInMs / 1000);

    // 3. Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // 4. Pad with leading zeros (e.g., "5" becomes "05")
    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');

    return `${mm}:${ss}`;
}