import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Puzzle } from '@types/api';


export const getPuzzle = (): UseQueryResult<Puzzle> => {
    return useQuery({
        queryKey: ['puzzle'],
        queryFn: async (): Promise<Puzzle> => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/puzzle`);
            return await response.json()
        }
    })
}
