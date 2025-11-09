import { StyleSheet, Text, View } from 'react-native';
import { getPuzzle } from '@hooks/puzzles';
import Game from '@components/game'
import Info from '@components/info'
import { usePuzzleStore } from '@store/puzzle';

export default function Container() {
  const { data, isLoading, error } = getPuzzle();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
        <Game puzzle={data}/>
        <Info clues={data?.clues}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  loading: {},
  error: {},
  refetch: {},
});
