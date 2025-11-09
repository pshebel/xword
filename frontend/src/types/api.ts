export interface Puzzle {
    id: string;
    size: number;
    block: number[];
    clues: Clue[];
}

export interface Clue {
    index: number;
    across: boolean;
    text: string;
}


export interface CheckRequest {
    id: string;
    words: Map<number, string>;
}

export interface CheckResponse {
    id: string;
    success: boolean;
}
