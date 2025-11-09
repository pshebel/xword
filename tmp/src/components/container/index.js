import './styles.css'

import Error from '../error'
import Loading from '../loading'
import Game from '../game'

export default function Container() {
    if (loading) {
        return (
            <div className="container">
                <Loading/>
            </div>
        )
    }
    if (error) {
         return (
            <div className="container">
                <Error/>
            </div>
        )
    }
    return (
        <div className="container">
            <Game/>
        </div>
    )
}

