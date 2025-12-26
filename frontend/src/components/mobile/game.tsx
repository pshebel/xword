import { StyleSheet, Pressable, TextInput, View, Dimensions, Text } from 'react-native';
import { useRef, useEffect, KeyboardEvent } from 'react';
import {forward, back} from '@/game/move';
import { check } from '@/game/check';
import { useGameStore } from '@store/game';
import { Puzzle } from '@types/api';

type SquareProps = {
  size: number,
  index: number,
  inFocus: boolean,
  onClick: (index: number) => void,
}

const Square = ({size, index, inFocus, onClick}: SquareProps) => {
  const {squares, focus} = useGameStore();
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
      <Text style={squareStyles} maxLength={1}>
        {squares[index]}
      </Text>
    </Pressable>
  )
}

type GameProps = {
  puzzle: Puzzle,
}

export default function Game({puzzle}: GameProps) {
  const {squares, orientation, focus, setSquares, setOrientation, setFocus} = useGameStore()
  useEffect(() => {
    if (puzzle.size > 0) {
      let tmp = Array(puzzle.size * puzzle.size).fill("")
      puzzle.block.forEach((b: number) => {
        tmp[b] = "*"
      })
      
      setSquares(tmp);
      if (puzzle.block.includes(0)) {
        const [newIndex, newOrientation] = forward(puzzle.block, puzzle.size, 0, orientation)
        move(newIndex, newOrientation)
      } else {
        move(0, orientation)
      }
    }
  }, [puzzle.id]);

  const move = (index: number, orientation: boolean) => {
    setFocus(index)
    setOrientation(orientation)
  }

  const handleSquareClick = (index: number) => {
    // on a double click, switch orientation
    if (index === focus) {
        setOrientation(!orientation)
    } else {
        setFocus(index)
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
let size = (width-20) / 5
if (width - 20 > height/2) {
  size = ((height / 2) - 10) / 5
}
// const size = (height > width) ? (width / 5) - 10 : width / 10;
const styles = StyleSheet.create({
  game: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 1,
    marginRight: -1,
    marginTop: -1,
    outlineStyle: 'none',
    fontFamily: 'Cooper-Black',
  },
  block: {
    backgroundColor: '#000'
  },
  isFocus: {
    backgroundColor: '#C12C2C',
  },
  inFocus: {
    backgroundColor: '#E9BCB7',
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
  }
});
