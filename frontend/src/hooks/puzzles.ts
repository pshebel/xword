import { useQuery, UseQueryResult, useMutation } from '@tanstack/react-query';
import { Puzzle, CheckRequest, CheckResponse } from '@types/api';
import { useGameStore } from '@/store/game';
import { useStatusStore } from '@/store/status';


export const getPuzzle = (): UseQueryResult<Puzzle> => {
    return useQuery({
        queryKey: ['puzzle'],
        queryFn: async (): Promise<Puzzle> => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/puzzle`);
            return await response.json()
        }
    })
}
