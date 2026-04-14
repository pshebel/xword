import { StyleSheet, Pressable, TextInput, View, Dimensions } from 'react-native';
import { useRef, useEffect, KeyboardEvent, useState } from 'react';
import { useGameStore } from '@store/game';
import { Puzzle } from '@types/api';
import { getSquares, getFocus, getOrientation, setSquares, setOrientation, setFocus } from '@/store/local';

type SquareProps = {
  size: number,
  index: number,
  inFocus: boolean,
  onClick: (index: number) => void,
  onKeyPress: (index: number, e: any) => void,
  onChangeText: (index: number, text: string) => void,
  inputRefs: React.RefObject<Array<TextInput | null>>;
}
const Square = ({size, index, inFocus, onClick, onKeyPress,  inputRefs}: SquareProps) => {
  // const {squares, focus} = useGameStore();
  const squares = getSquares()
  const focus = getFocus()

  const isBlock = squares[index] === '*'
  let squareStyles = [styles.square]
  if (isBlock) {
    squareStyles.push(styles.block)
  } else if (focus === index) {
    squareStyles.push(styles.isFocus)
  } else {
    if (inFocus) {
      squareStyles.push(styles.inFocus)
    }
  }

  if (index >=0 && index <=4) {
    squareStyles.push(styles.borderTop)
  }
  if (index >=20 && index <=24) {
    squareStyles.push(styles.borderBottom)
  }
  if (index%5 === 0){
    squareStyles.push(styles.borderLeft)
  }
  if (index%5 === 4) {
    squareStyles.push(styles.borderRight)
  }


  if (index === 0) {
    squareStyles.push(styles.topLeft)
  } else if (index === size - 1) {
    squareStyles.push(styles.topRight)
  } else if (index === size * (size - 1)) {
    squareStyles.push(styles.bottomLeft)
  } else if (index === (size * size) - 1) {
    squareStyles.push(styles.bottomRight)
  }

  return (
    <Pressable disabled={isBlock} onPressIn={() => onClick(index)}>
      <TextInput
        style={squareStyles}
        ref={el => { inputRefs.current[index] = el; }}
        maxLength={1}
        editable={!isBlock}
        value={squares[index] || ''}
        onKeyPress={(e) => onKeyPress(index, e)}
      />
    </Pressable>
  )
}

type GameProps = {
  puzzle: Puzzle
}

export default function Game({puzzle}: GameProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  // const {squares, orientation, focus, setSquares, setOrientation, setFocus} = useGameStore()

  // const squares = getSquares()
  // const orientation = getOrientation()
  // const focus = getFocus()
  const [squares, setSquaresState] = useState<string[]>(() => getSquares());
  const [orientation, setOrientationState] = useState<boolean>(() => getOrientation());
  const [focus, setFocusState] = useState<number>(() => getFocus());

  useEffect(() => {
    move(focus, orientation)
    inputRefs.current[focus]?.focus()
  }, [puzzle.id]);

  // useEffect(() => {
  //   if (puzzle.size > 0) {
  //     let tmp = Array(puzzle.size * puzzle.size).fill("")
  //     puzzle.block.forEach((b: number) => {
  //       tmp[b] = "*"
  //     })
      
  //     setSquares(tmp);
  //     setSquaresState(tmp);
  //     if (puzzle.block.includes(0)) {
  //       forward(0, orientation)
  //     } else {
  //       move(0, orientation)
  //     }
      
  //     // inputRefs.current[focus]?.focus()
  //   }
  // }, [puzzle.id]);

  const move = (index: number, orientation: boolean) => {
    inputRefs.current[index]?.focus()
    setFocus(index)
    setFocusState(index)
    setOrientation(orientation)
    setOrientationState(orientation)
  }
  
  const forward = (index: number, orientation: boolean) => {
    if (index !== puzzle.size*puzzle.size -1) {
      if (orientation) {
        if (puzzle.block.includes(index+1)) {
            forward(index+1, orientation)
            return
        }
        move(index+1, orientation)
      } else {
        const row = Math.floor(index/puzzle.size)
        const col = index % puzzle.size;

        if (row < puzzle.size-1) {
            if (puzzle.block.includes((row+1)*puzzle.size + col)) {
                forward((row+1)*puzzle.size + col, orientation)
                return
            }
            move((row+1)*puzzle.size + col, orientation)
        } else {
            if (puzzle.block.includes(col+1)) {
                forward(col + 1, orientation)
                return
            }
            move(col+1, orientation)
        }
      }
    } else {
      if (puzzle.block.includes(0)) {
          forward(0, !orientation)
          return
      }
      move(0, !orientation)
    }
  }

  const back = (index: number, orientation: boolean) => {
    if (index !== 0) {
        if (orientation) {
            if (puzzle.block.includes(index-1)){
                back(index-1, orientation)
                return
            }
            move(index-1, orientation)
        } else {
            const row = Math.floor(index/puzzle.size)
            const col = index - (row*puzzle.size)
            if (row > 0) {
                if (puzzle.block.includes((row-1)*puzzle.size + col)) {
                    back((row-1)*puzzle.size + col, orientation)
                    return
                }
                move((row-1)*puzzle.size + col, orientation)
            } else {
                if (puzzle.block.includes((puzzle.size-1)*puzzle.size + col-1)) {
                    back((puzzle.size-1)*puzzle.size + col-1, orientation)
                    return
                }
                move((puzzle.size-1)*puzzle.size + col-1, orientation)
            }
        }
    }
  }

  const handleSquareChange = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (squares[index] === '') {
          back(index, orientation)
      } else {
          let tmp = squares
          tmp[index] = ''
          setSquares(tmp)
          setSquaresState(tmp)
          back(index, orientation)
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      forward(index, orientation)
    }
    // input can only be alphabetical
    if (RegExp(/^\p{L}$/,'u').test(e.key)) {
      const value = e.key.toUpperCase()
      let tmp = getSquares()
      tmp[index] = value
      setSquares(tmp)
      setSquaresState(tmp)
      forward(index, orientation)
    }
  }

  const handleSquareClick = (index: number) => {
    // on a double click, switch orientation
    if (index === focus) {
        setOrientation(!orientation)
        setOrientationState(!orientation)
    } else {
        setFocus(index)
        setFocusState(index)
    }
  }
  const renderSquare = (index: number) => {
    const inFocus = (orientation) ? Math.floor(focus/puzzle.size) === Math.floor(index/puzzle.size) : focus % puzzle.size === index % puzzle.size;

    return (
      <Square
        size={puzzle.size}
        index={index}
        inFocus={inFocus}
        onClick={handleSquareClick}
        onKeyPress={handleSquareChange}
        inputRefs={inputRefs}
      />
    )
  }

  let rows = []
  for (let i: number=0;i < puzzle.size;i++) {
    let row = []
    for (let j: number=0; j<puzzle.size;j++) {
      const index = i*puzzle.size+j;
      row.push(renderSquare(index))
    }
    rows.push(<View key={i} style={styles.row}>{row}</View>)
  }
  return (
    <View style={styles.game}>
      {rows}
    </View>
  )
}

const { width, height } = Dimensions.get('window');
let size = 0
if ((width / 10) > 100) {
  size = 100
} else {
  size = width / 10
}
// const size = (height > width) ? (width / 5) - 10 : width / 10;
const styles = StyleSheet.create({
  game: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  row: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  square: {
    width: size,
    height: size,
    fontSize: 36,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 1,
    marginRight: -1,
    marginTop: -1,
    outlineStyle: 'none',
    fontFamily: 'Cooper-Black',
  },
  block: {
    backgroundColor: '#000',
    opacity: .9
  },
  isFocus: {
    backgroundColor: '#C12C2C',
    opacity: .9,
  },
  inFocus: {
    backgroundColor: '#E9BCB7',
    opacity: .9,
  },
  topLeft: {
    borderTopLeftRadius: 20,
  },
  topRight: {
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    borderBottomRightRadius: 20,
  },
  borderTop: {
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  borderLeft: {
    borderLeftWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  borderRight: {
    borderRightWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  borderBottom: {
    borderBottomWidth:0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  }

});
