import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { setPuzzle } from '@store/puzzle';
import { setSquares } from '@store/game';
import { Puzzle, CheckRequest, CheckResponse } from '@types/api';

export const getPuzzle = (): UseQueryResult<Puzzle> => {
    return useQuery({
        queryKey: ['puzzles'],
        queryFn: async (): Promise<Puzzle> => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/puzzle`);
            return await response.json()
        },
        onSuccess: data => {
            setPuzzle(data)
            const squares = Array(data.size * data.size).fill("");
            data.block.forEach((b: number) => {
                squares[b] = "*";
            });
            setSquares(squares)
        }
    })
}
