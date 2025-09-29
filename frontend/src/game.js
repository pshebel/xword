import { useState, useEffect, useRef } from 'react';

// Square Component
const Square = ({ size, index, inFocus, isFocus, value, onChange, onClick, inputRef }) => {
    let name = "square";
    if (isFocus) {
        name += " is-focus";
    } else {
        if (inFocus) {
            name += " in-focus"
        }
    }
    if (index === 0) {
        name = name + " top-left";
    } else if (index === size - 1) {
        name = name + " top-right";
    } else if (index === size * (size - 1)) {
        name = name + " bottom-left";
    } else if (index === (size * size) - 1) {
        name = name + " bottom-right";
    }
    
    return (
        <input 
            ref={inputRef}
            className={name}
            maxLength={1}
            value={value || ''}
            onClick={(e) => onClick(index, e)}
            onChange={() => {}} // Prevents React warning, actual logic in onKeyDown
            onKeyDown={(e) => onChange(index, e)}
        />
    );
};

// Board Component
const Board = ({ size, squares, onChange }) => {
    const inputRefs = useRef([]);
    const [focus, setFocus] = useState(0);
    const [orientation, setOrientation] = useState(true); // true = across, false = down

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
            setFocus(0);
        }
    }, [size]);

    
    const move = (index) => {
        console.log('move to ',index)
        inputRefs.current[index]?.focus();
        setFocus(index);
    }
    
    const forward = (index) => {
        console.log('move forward');
        if (index !== size*size -1) {
            if (orientation) {
                move(index+1);
            } else {
                const row = Math.floor(index/size)
                const col = index - (row*size);
                if (row < size-1) {
                    move((row+1)*size + col);
                } else {
                    move(col+1);
                }
            }
        }
    }

    const back = (index) => {
        console.log('move back');
        if (index !== 0) {
            if (orientation) {
                move(index-1);
            } else {
                const row = Math.floor(index/size)
                const col = index - (row*size);
                if (row > 0) {
                    move((row-1)*size + col);
                } else {
                    move((size-1)*size + col-1);
                }
            }
        }
    }

    const handleSquareChange = (index, e) => {
        console.log(e)

        if (e.key === 'Backspace') {
            if (squares[index] === '') {
                back(index)
            } else {
                onChange(index, '');
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault()
            forward(index);
        }
        // input can only be alphabetical
        if (RegExp(/^\p{L}$/,'u').test(e.key)) {
            const value = e.key.toUpperCase()
            onChange(index, value);
            forward(index);
        }
    };

    const handleSquareClick = (index, e) => {
        console.log(e)
        console.log('switching ', orientation)
        // on a double click, switch orientation
        if (index === focus) {
            setOrientation(!orientation);
        } else {
            setFocus(index);
        }
    };
    
    const renderSquare = (index) => {
        const inFocus = (orientation) ? Math.floor(focus/size) === Math.floor(index/size) : focus % size === index % size;  
        return (
            <Square 
                key={index}
                size={size}
                index={index}
                inFocus={inFocus}
                isFocus={index === focus}
                value={squares[index]}
                onChange={handleSquareChange}
                onClick={handleSquareClick}
                inputRef={(el) => (inputRefs.current[index] = el)}
            />
        )
    };

    const renderRow = (rowIndex) => {
        const row = [];
        for (let col = 0; col < size; col++) {
            const squareIndex = rowIndex * size + col;
            row.push(renderSquare(squareIndex));
        }
        return (
            <div key={rowIndex} className="board-row">
                {row}
            </div>
        );
    };

    const board = [];
    for (let row = 0; row < size; row++) {
        board.push(renderRow(row));
    }

    return <div className="board">{board}</div>;
};

// Game Component (default export)
export default function Game({ size, squares, onChange }) {
    return (
        <Board 
            size={size} 
            squares={squares} 
            onChange={onChange} 
        />
    );
}