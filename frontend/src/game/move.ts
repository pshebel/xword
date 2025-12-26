export const forward = (block: number[], size: number, index: number, orientation: boolean): [number, boolean] => {
    if (index !== size*size -1) {
      if (orientation) {
        if (block.includes(index+1)) {
            return forward(block, size, index+1, orientation)
            
        }
        return [index+1, orientation]
      } else {
        const row = Math.floor(index/size)
        const col = index % size

        if (row < size-1) {
            if (block.includes((row+1)*size + col)) {
                return forward(block, size, (row+1)*size + col, orientation)
            }
            return [(row+1)*size + col, orientation]
        } else {
            if (block.includes(col+1)) {
                return forward(block, size, col + 1, orientation)
                
            }
            return [col+1, orientation]
        }
      }
    } else {
      if (block.includes(0)) {
          return forward(block, size, 0, !orientation)
      }
      return [0, !orientation]
    }
}

export const back = (block: number[], size: number, index: number, orientation: boolean): [number, boolean] => {
    console.log(index, orientation, block)
    if (index !== 0) {
        if (orientation) {
            // a bit of hard coding. if the first row has a block in position 2, and the user is at 3, 
            // prevent them from backing to 2
            if (index <= 2 && block.includes(index-1)) {
                return [index, orientation]
            }
            if (block.includes(index-1)) {
                return back(block, size, index-1, orientation)
            }
            return [index-1, orientation]
        } else {
            const row = Math.floor(index/size)
            const col = index % size
            if (row > 0) {
                // a bit of hard coding. if the first row has a block in position 2, and the user is at 3, 
                // prevent them from backing to 2
                if (index == 5 && block.includes(0)) {
                    return [index, orientation]
                }
                if (index == 10 && block.includes(5)) {
                    return [index, orientation]
                }
                if (block.includes((row-1)*size + col)) {
                    return back(block, size, (row-1)*size + col, orientation)
                }
                return [(row-1)*size + col, orientation]
            } else {
                if (block.includes((size-1)*size + col-1)) {
                    return back(block, size, (size-1)*size + col-1, orientation)
                }
                return [(size-1)*size + col-1, orientation]
            }
        }
    }
    // if at the start, don't do anything
    return [index, orientation]
}