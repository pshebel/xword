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
import {getState, setState, setSuccess, setStart,  getSquares, getFocus, getOrientation, setSquares, setFocus, setOrientation} from '@/store/local';
import {getDate} from '@/game/date'
import {State} from '@/types/api'
import Header from './header';
import Footer from '@/components/common/footer';

export default function MobileContainer() {
  const date = getDate();
  // const savedState = getState();
  const [state, setStateState] = useState<State>(() => getState());
  const [squares, setSquaresState] = useState<string[]>(() => getSquares());
  const [orientation, setOrientationState] = useState<boolean>(() => getOrientation());
  const [focus, setFocusState] = useState<number>(() => getFocus());
  const isEmpty = !state?.puzzle || state.puzzle.id === '0';
  const isStale = state?.date !== date;
  console.log(isEmpty, isStale)
  const { data, isLoading, error } = getPuzzle(isEmpty || isStale);

  useEffect(() => {
      console.log("use effect", data, isEmpty, isStale)
      if (data && (isEmpty || isStale)) {
        setState(date, data);
        setStateState(getState());
        setStart()
      }
  }, [data]);

  const onSuccess = () => {
    setSuccess()
    setStateState(getState())
  }

  const handleSquares = (squares: string[]) => {
    setSquaresState(squares)
    setSquares(squares)
  }

  const handleFocus = (focus: number) => {
    setFocusState(focus)
    setFocus(focus)
  }

  const handleOrientation = (orientation: boolean) => {
    setOrientationState(orientation)
    setOrientation(orientation)
  }

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

  if (state.success) {
    return (
      <View style={styles.layout}>
        <Header/>
        <Success/>
        <Footer/>
      </View>
    )
  }

  // play
  // if (play) {
  //   return (
  //     <View style={styles.container}>
  //       <Game puzzle={data}/>
  //       <Info puzzle={data}/>
  //       <Keyboard puzzle={data}/>
  //     </View>
  //   )
  // }

  return (
    <View style={styles.layout}>
      <Header/>
      <View style={styles.container}>
        <Game 
          puzzle={state.puzzle} 
          squares={squares}
          focus={focus}
          orientation={orientation}
          handleSquares={handleSquares} 
          handleFocus={handleFocus} 
          handleOrientation={handleOrientation}
        />
        <Info 
          puzzle={state.puzzle} 
          focus={focus} 
          orientation={orientation}
        />
        <Keyboard 
          puzzle={state.puzzle} 
          squares={squares}
          focus={focus}
          orientation={orientation}
          handleSquares={handleSquares} 
          handleFocus={handleFocus} 
          handleOrientation={handleOrientation}
          onSuccess={onSuccess}
        />
      </View>
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
