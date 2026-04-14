export interface State {
    puzzle: Puzzle;
    date: string;
    focus: number;
    orientation: boolean;
    success: boolean;
    squares: string[];
    start: Date;
    finish: Date;
}

export interface Puzzle {
    id: string;
    cert: string;
    size: number;
    block: number[];
    words: Words[];
}

export interface Words {
    id: number;
    across: boolean;
    index: number;
    clue: string;
}

export interface CheckRequest {
    id: string;
    cert: string;
}

export interface CheckResponse {
    id: string;
    success: boolean;
}
