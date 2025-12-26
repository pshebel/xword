import { Platform, StyleSheet, Text, View, Dimensions, Alert, Pressable } from 'react-native';
import { useRef, useEffect, KeyboardEvent } from 'react';
import {forward, back} from '@/game/move';
import {useMutation } from '@tanstack/react-query';
import { useGameStore } from '@store/game';
import { usePuzzleStore } from '@store/puzzle';
import { CheckRequest, CheckResponse, Puzzle } from '@types/api';

type InfoProps = {
  puzzle: Puzzle;
}

export default function Info() {
  const { puzzle } = usePuzzleStore();
  const { focus, orientation } = useGameStore();

  console.log(puzzle)

  // Find the clue that corresponds to the current focus and orientation
  const getCurrentClue = () => {
    if (!puzzle.clues || puzzle.clues.length === 0) return null;
    
    // Determine which clue index we're in based on focus position and orientation

    if (orientation) {
      const index = Math.floor(focus / puzzle.size);
      return puzzle.clues.find(item => item.index === index && item.across === true)
    } else {
      const index = focus % puzzle.size;
      return puzzle.clues.find(item => item.index === index && item.across === false)
    }
  };
  
  const currentClue = getCurrentClue();
  
  if (!currentClue) return null;
  
  return (
    <View style={styles.clueContainer}>
      <Text style={styles.clueNumber}>
        {currentClue.index + 1} {orientation ? 'Across' : 'Down'}
      </Text>
      <Text style={styles.clueText}>{currentClue.text}</Text>
    </View>
  )
  
}

const { width, height } = Dimensions.get('window');

const buttonSize = (width * .80) / 11

const styles = StyleSheet.create({
  clueContainer: {
    width: '100%',
    flexGrow: 1,
    paddingTop: 2,
    paddingBottom: 2,
    overflow: 'scroll'
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
    maxWidth: (width) - 20,
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
});