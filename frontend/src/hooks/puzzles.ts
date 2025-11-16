import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Puzzle } from '@types/api';


export const getPuzzle = (): UseQueryResult<Puzzle> => {
    return useQuery({
        queryKey: ['puzzle'],
        queryFn: async (): Promise<Puzzle> => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/puzzle`);
            // const response = await fetch('https://r9cljvi9e9.execute-api.us-east-1.amazonaws.com/');
            return await response.json()
        }
    })
}
