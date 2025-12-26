import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react';
import { getPuzzle } from '@hooks/puzzles';
import Game from './game'
import Info from './info'
import Success from '@/components/common/success'
import Button from '@/components/common/button'
import Keyboard from './keyboard';
import { useGameStore } from '@/store/game';
import {checkPuzzle} from '@/hooks/puzzles';
import { usePuzzleStore } from '@/store/puzzle';
import {check} from '@/game/check';

import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

export default function MobileContainer() {
  const { data, isLoading, error } = getPuzzle();
  const { squares, success, setSuccess } = useGameStore();
  const {puzzle, setPuzzle} = usePuzzleStore();

  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (data) {
      setPuzzle(data);
    }
  }, [data, setPuzzle]);

  if (isLoading) {
    return (
      
      <View style={styles.layout}>
        <Header/>
        <View style={styles.loading}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
        <Footer/>
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.layout}>
        <Header/>
        <View style={styles.error}>
          <Text>Error: {error.message}</Text>
        </View>
        <Footer/>
      </View>
    )
  }

  if (success) {
    return (
      <View style={styles.layout}>
        <Header/>
        <Success/>
        <Footer/>
      </View>
    )
  }

  // play
  if (play) {
    return (
      <View style={styles.container}>
        <Game puzzle={data}/>
        <Info />
        <Keyboard puzzle={data}/>
      </View>
    )
  }

  return (
    <View style={styles.layout}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.header}>Random Puzzle</Text>
        <Button onClick={() => setPlay(true)} text="play"/>
      </View>
      <Footer/>
    </View>
  )
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    layout: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // minWidth: '100%',
    // minHeight: '100%'
  },
  container: {
    padding: 10,
    // paddingTop: 20,
    // paddingBottom: 20,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: height - 100,
    minWidth: '100%',
    gap: 20,
  },
  header: {
    fontFamily: 'Cooper-Black',
    fontSize: 32,
  },
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
