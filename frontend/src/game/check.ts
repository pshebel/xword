import { Puzzle } from "@/types/api"



type CheckProps = {
  squares: string[];
  puzzle: Puzzle;
  setSuccess: (value: boolean) => void;
}
export const check = ({squares, puzzle, setSuccess}: CheckProps) => {
    let words = []
    for (let i=0;i<puzzle.size;i++){
      words.push(squares.slice(i*puzzle.size, (i+1)*puzzle.size).join("").toLowerCase())
    }
    if (words.join(",") === puzzle.cert) {
        setSuccess(true)
    } else {
        window.confirm("Not quite right. Keep Trying!")
    }
}