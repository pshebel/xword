import './container.css'

import Error from '../error'
import Loading from '../loading'
import Game from '../game'

export default function Container() {
    if (loading) {
        return (
            <>
                <Loading/>
            </>
        )
    }
    if (error) {
         return (
            <>
                <Error/>
            </>
        )
    }
    return (
        <>
            <Game/>
        </>
    )
}

