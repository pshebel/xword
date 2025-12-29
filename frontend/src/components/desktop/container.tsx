import { Platform, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getPuzzle } from '@hooks/puzzles';
import Game from '@/components/common/game'
import Info from '@/components/desktop/info'
import ClueKeyboard from '@/components/mobile/info'
import Success from '@/components/common/success'
import { useGameStore } from '@/store/game';

export default function DesktopContainer() {
  const { data, isLoading, error } = getPuzzle();
  const { success } = useGameStore();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error: {error.message}</Text>
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
  )
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
    minHeight: height - 100,
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
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Cooper-Black',
    fontSize: 32,
  },
  error: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Cooper-Black',
    fontSize: 32,
  },
});
