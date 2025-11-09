import { useState, useEffect, useRef } from 'react'

// Square Component
const Square = ({ size, block, index, inFocus, isFocus, value, onChange, onClick, inputRef }) => {
    let name = "square"
    if (block) {
        name += " block "
    } else if (isFocus) {
        name += " is-focus"
    } else {
        if (inFocus) {
            name += " in-focus"
        }
    }
    if (index === 0) {
        name = name + " top-left"
    } else if (index === size - 1) {
        name = name + " top-right"
    } else if (index === size * (size - 1)) {
        name = name + " bottom-left"
    } else if (index === (size * size) - 1) {
        name = name + " bottom-right"
    }
    
    return (
        <input 
            ref={inputRef}
            className={name}
            maxLength={1}
            readOnly={block}
            value={value || ''}
            onClick={(e) => onClick(index, e)}
            onChange={() => {}} // Prevents React warning, actual logic in onKeyDown
            onKeyDown={(e) => onChange(index, e)}
        />
    )
}

// Board Component
const Board = ({ size, block, squares, onChange }) => {
    const inputRefs = useRef([])
    const [focus, setFocus] = useState(0)
    const [orientation, setOrientation] = useState(true); // true = across, false = down
    // console.log("SQUARES",squares)
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
            setFocus(0)
        }
    }, [size])

    const move = (index) => {
        inputRefs.current[index]?.focus()
        setFocus(index)
    }
    
    const forward = (index) => {
        if (index !== size*size -1) {
            if (orientation) {
                if (block.includes(index+1)) {
                    forward(index+1)
                    return
                }
                move(index+1)
            } else {
                const row = Math.floor(index/size)
                const col = index - (row*size)
                if (row < size-1) {
                    if (block.includes((row+1)*size + col)) {
                        forward((row+1)*size + col)
                        return
                    }
                    move((row+1)*size + col)
                } else {
                    if (block.includes(col+1)) {
                        forward(col + 1)
                        return
                    }
                    move(col+1)
                }
            }
        } else {
            setOrientation(!orientation)
            if (block.includes(0)) {
                forward(0)
                return
            }
            move(0)
        }
    }

    const back = (index) => {
        if (index !== 0) {
            if (orientation) {
                if (block.includes(index-1)){
                    back(index-1)
                    return
                }
                move(index-1)
            } else {
                const row = Math.floor(index/size)
                const col = index - (row*size)
                if (row > 0) {
                    if (block.includes((row-1)*size + col)) {
                        back((row-1)*size + col)
                        return
                    }
                    move((row-1)*size + col)
                } else {
                    if (block.indcludes((size-1)*size + col-1)) {
                        back((size-1)*size + col-1)
                        return
                    }
                    move((size-1)*size + col-1)
                }
            }
        }
    }

    const handleSquareChange = (index, e) => {
        if (e.key === 'Backspace') {
            if (squares[index] === '') {
                back(index)
            } else {
                onChange(index, '')
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault()
            forward(index)
        }
        // input can only be alphabetical
        if (RegExp(/^\p{L}$/,'u').test(e.key)) {
            const value = e.key.toUpperCase()
            onChange(index, value)
            forward(index)
        }
    }

    const handleSquareClick = (index, e) => {
        // on a double click, switch orientation
        if (index === focus) {
            setOrientation(!orientation)
        } else {
            setFocus(index)
        }
    }
    
    const renderSquare = (index) => {
        const inFocus = (orientation) ? Math.floor(focus/size) === Math.floor(index/size) : focus % size === index % size;
        const isBlock = block.includes(index) ? true : false;

        // console.log(index, block, isBlock)
        return (
            <Square 
                key={index}
                size={size}
                block={isBlock}
                index={index}
                inFocus={inFocus}
                isFocus={index === focus}
                value={squares[index]}
                onChange={handleSquareChange}
                onClick={handleSquareClick}
                inputRef={(el) => (inputRefs.current[index] = el)}
            />
        )
    }

    const renderRow = (rowIndex) => {
        const row = []
        for (let col = 0; col < size; col++) {
            const squareIndex = rowIndex * size + col
            row.push(renderSquare(squareIndex))
        }
        return (
            <div key={rowIndex} className="board-row">
                {row}
            </div>
        )
    }

    const board = []
    for (let row = 0; row < size; row++) {
        board.push(renderRow(row))
    }

    return <div className="board">{board}</div>
}

// Game Component (default export)
export default function Game({ size, block, squares, onChange }) {
    return (
        <Board 
            size={size}
            block={block}
            squares={squares} 
            onChange={onChange} 
        />
    )
}