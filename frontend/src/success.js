



export default function Success({onReset}) {
    return (
        <div className={"success-container"}>
            <h1 className={"success-header"}>Success!</h1>
            <div className={"success-button-container"}>
                <button onClick={onReset}>
                    Next
                </button>
            </div>
        </div>
    )
}