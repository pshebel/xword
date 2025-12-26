import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useGameStore } from '@store/game';
import { check } from '@/game/check';
import { forward, back } from '@/game/move';
import { Puzzle } from '@types/api';

type InfoProps = {
  puzzle: Puzzle;
}

export default function Keyboard({ puzzle }: InfoProps) {
  const { squares, setSquares, setSuccess, focus, setFocus, orientation, setOrientation } = useGameStore();

  const move = (index: number, orientation: boolean) => {
    setFocus(index)
    setOrientation(orientation)
  }

  const handleTab = () => {
    const [newIndex, newOrientation] = forward(puzzle.block, puzzle.size, focus, orientation)
    move(newIndex, newOrientation)
  }

  const handleSwitch = () => {
    setOrientation(!orientation)
  }

  const handleBackspace = () => {
    const tmp = squares
    tmp[focus] = ''
    setSquares(tmp)
    const [newIndex, newOrientation] = back(puzzle.block, puzzle.size, focus, orientation)
    move(newIndex, newOrientation)
  }

  const handleKeyPress = (letter: string) => {
    const tmp = squares
    tmp[focus] = letter
    setSquares(tmp)
    const [newIndex, newOrientation] = forward(puzzle.block, puzzle.size, focus, orientation)
    move(newIndex, newOrientation)
  };

  return (
    <View style={styles.keyboardContainer}>
      <View >
        <View style={styles.keyboardRow}>
          {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
            <Pressable 
              key={letter} 
              style={styles.button}
              onPressIn={() => handleKeyPress(letter)}
            >
              <Text selectable={false} style={styles.buttonText}>{letter}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.keyboardRow}>
          <Pressable style={styles.button} onPressIn={() => handleTab()}><Text selectable={false} style={styles.buttonTab}>→</Text></Pressable>
          {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
            <Pressable 
              key={letter} 
              style={styles.button}
              onPressIn={() => handleKeyPress(letter)}
            >
              <Text selectable={false} style={styles.buttonText}>{letter}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.button} onPressIn={() => handleBackspace()}><Text selectable={false} style={styles.buttonBack}>←</Text></Pressable>
        </View>
        <View style={styles.keyboardRow}>
          <Pressable style={styles.button} onPressIn={() => handleSwitch()}><Text selectable={false} style={styles.buttonSwitch}>↺</Text></Pressable>
          {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
            <Pressable 
              key={letter} 
              style={styles.button}
              onPressIn={() => handleKeyPress(letter)}
            >
              <Text selectable={false} style={styles.buttonText}>{letter}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.button} onPressIn={() => check({squares, puzzle, setSuccess})}><Text selectable={false} style={styles.buttonDone}>✓</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const buttonSize = (width * .80) / 11


const styles = StyleSheet.create({
  keyboardContainer: {
    // display: 'flex',
    // backgroundColor: 'white'
    width: '100%',
    // maxWidth: width-50,
    // minWidth: width-50,
    // maxHeight: height - (width - 50) - 40,
    // minHeight: height - (width - 50) - 40,
    display: 'flex',
    justifyContent: 'space-between'
  },
  keyboardRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  buttonTab: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonBack: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonSwitch: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonDone: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'black',
    color: 'white',
    width: buttonSize,
    height: buttonSize*1.25,
    padding: 5,

  },
  buttonText: {
    alignContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  buttonContainer: {
    paddingTop: 5,
  },
});