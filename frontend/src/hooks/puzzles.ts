import { useQuery, UseQueryResult, useMutation } from '@tanstack/react-query';
import { Puzzle, CheckRequest, CheckResponse } from '@types/api';
import {Alert} from '@/components/common/alert'


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

interface CheckPuzzleProps {
  puzzle: {
    id: string;
    size: number;
  };
  squares: string[];
  onSuccess: () => void;
}

export const checkPuzzle = ({ puzzle, squares, onSuccess }: CheckPuzzleProps) => {
  const mutation = useMutation({
    mutationFn: async (req: CheckRequest) => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      return response.json() as Promise<CheckResponse>;
    },
    onSuccess: (data) => {
      if (data.success) {
        onSuccess();
      } else {
        Alert("Not quite right. Keep Trying!")
      }
    },
    onError: (err: any) => {
      Alert(err.message);
    },
  });

  const handleCheck = async () => {
    const words = [];
    for (let i = 0; i < puzzle.size; i++) {
      words.push(
        squares.slice(i * puzzle.size, (i + 1) * puzzle.size).join('').toLowerCase()
      );
    }
    mutation.mutate({ id: puzzle.id, cert: words.join(',') });
  };

  return {
    handleCheck,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};