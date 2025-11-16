import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useGameStore } from '@store/game';
import { Puzzle } from '@types/api';

type ClueKeyboardProps = {
  puzzle: Puzzle;
}

export default function ClueKeyboard({ puzzle }: ClueKeyboardProps) {
  const { focus, orientation } = useGameStore();
  console.log(focus, orientation)
  // Find the clue that corresponds to the current focus and orientation
  const getCurrentClue = () => {
    if (!puzzle.clues || puzzle.clues.length === 0) return null;
    
    // Determine which clue index we're in based on focus position and orientation
    const row = Math.floor(focus / puzzle.size);
    const col = focus % puzzle.size;
    
    // Filter clues by orientation (across = true for horizontal, false for vertical)
    const relevantClues = puzzle.clues.filter(clue => clue.across === orientation);
    
    // Find the clue that contains this position
    for (const clue of relevantClues) {
      const clueRow = Math.floor(clue.index / puzzle.size);
      const clueCol = clue.index % puzzle.size;
      
      if (orientation) {
        // Across: check if we're in the same row and at or after the clue start
        if (row === clueRow && col >= clueCol) {
          // Make sure we haven't passed a block
          let isValid = true;
          for (let c = clueCol; c < col; c++) {
            if (puzzle.block.includes(row * puzzle.size + c)) {
              isValid = false;
              break;
            }
          }
          if (isValid) return clue;
        }
      } else {
        // Down: check if we're in the same column and at or after the clue start
        if (col === clueCol && row >= clueRow) {
          // Make sure we haven't passed a block
          let isValid = true;
          for (let r = clueRow; r < row; r++) {
            if (puzzle.block.includes(r * puzzle.size + col)) {
              isValid = false;
              break;
            }
          }
          if (isValid) return clue;
        }
      }
    }
    
    return null;
  };
  
  const currentClue = getCurrentClue();
  
  if (!currentClue) return null;
  
  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.clueHeader}>
        <Text style={styles.clueNumber}>
          {currentClue.index + 1} {orientation ? 'Across' : 'Down'}
        </Text>
      </View>
      <View style={styles.clueBody}>
        <Text style={styles.clueText}>{currentClue.text}</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  keyboardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  clueHeader: {
    marginBottom: 6,
  },
  clueNumber: {
    fontSize: 16,
    fontFamily: 'Cooper-Black',
    color: '#C12C2C',
  },
  clueBody: {
    paddingBottom: 4,
  },
  clueText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
});