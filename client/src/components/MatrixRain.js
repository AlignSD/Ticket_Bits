import React from "react"
import RainStream from "./RainStream"
import "./Dogica.css"

const MatrixRain = () => {
    const streamCount = Math.floor(window.innerWidth/26)
    return(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#000000",
            opacity: "40%"
        }}>
            {new Array(streamCount).fill().map(_ =>(<RainStream/>))}
        </div>
    )
};

export default MatrixRain;