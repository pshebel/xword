import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useGameStore } from '@store/game';
import { Puzzle } from '@types/api';


export default function Game({puzzle}) {
  const {squares} = useGameStore()
  const board = []
  for (let i=0;i<puzzle.size;i++) {
    const row = []
    for (let j=0;j<puzzle.size;j++) {
      const index = i*puzzle.size + j;
      row.push(<Text style={styles.square}>{index}</Text>)
    }
    board.push(<View style={styles.row}>{row}</View>)
  }
  return (
    <View style={styles.game}>
      {board}
    </View>
  );
}


const styles = StyleSheet.create({
  game: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  square: {
    flex: 1,
  }
});
