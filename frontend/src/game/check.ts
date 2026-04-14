import { Puzzle } from "@/types/api"
import {getState, setFinish} from '@/store/local';


type CheckProps = {
  // squares: string[];
  // puzzle: Puzzle;
  onSuccess: () => void;
}
export const check = ({onSuccess}: CheckProps) => {
    const state = getState()
    const squares = state.squares
    const size = state.puzzle.size
    const cert = state.puzzle.cert
    let words = []
    for (let i=0;i<size;i++){
      words.push(squares.slice(i*size, (i+1)*size).join("").toLowerCase())
    }
    if (words.join(",") === cert) {
      setFinish()
      onSuccess()
    } else {
        window.confirm("Not quite right. Keep Trying!")
    }
}