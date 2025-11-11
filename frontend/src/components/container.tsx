import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { getPuzzle } from '@hooks/puzzles';
import Game from '@components/game'
import Info from '@components/info'
import Success from '@components/success'
import { useGameStore } from '@/store/game';

export default function Container() {
  const { data, isLoading, error } = getPuzzle();
  const { success } = useGameStore();

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

  if (success) {
    return (
      <Success/>
    )
  }

  return (
    <View style={styles.container}>
      <Game puzzle={data}/>
      <Info puzzle={data}/>
    </View>
  );
}

const { height, width } = Dimensions.get('window');
const mobile = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: height - 150,
    minWidth: '100%',
    gap: 20,
  }
})
const web = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    gap: 20,
  }
})

const styles = StyleSheet.create({
  container: (height>width) ? mobile.container : web.container,
  loading: {},
  error: {},
  refetch: {},
});
