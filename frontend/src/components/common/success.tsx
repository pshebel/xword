import { useGameStore } from '@/store/game';
import { usePuzzleStore } from '@/store/puzzle';
import { getPuzzle } from '@hooks/puzzles';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@/components/common/button';


export default function Success() {
    const {reset: resetGame} = useGameStore();
    const {reset: resetPuzzle} = usePuzzleStore();
    const { refetch } = getPuzzle();
    
    const handleClick = async () => {
        resetGame();
        resetPuzzle();
        await refetch();
    }
    return (
        <View style={styles.successContainer}>
          <Text style={styles.success}>Success!</Text>
          <Button text={"Next"} onClick={handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  success: {
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'Cooper-Black',
  }
});
