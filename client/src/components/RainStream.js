import React, {useState, useEffect} from "react"
import useInterval from 'react-useinterval';

const VALID_CHARS = "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const STREAM_MUT = 0.02;

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 50;

const MIN_INTERVAL_DELAY = 50;
const MAX_INTERVAL_DELAY = 100;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 8000;

const getRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomChar = () => VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const randomStream = () => new Array(getRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
    .fill()
    .map(_ => getRandomChar());

const GetMut = stream => {
    const newStream= [];
    for (let i=1; i<stream.length; i++){
        if(Math.random()< STREAM_MUT){
            newStream.push(getRandomChar())
        } else {
            newStream.push(stream[i])
        }
    }
    newStream.push(getRandomChar());
    return newStream;

}
const getRandInRange = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;

const RainStream = () => {
    const [stream, setStream] = useState(randomStream());
    const [topPadding, setTopPadding] = useState(stream.length);
    const [intervalDelay, setIntervalDelay] = useState(null);

    useEffect(() => {
		setTimeout(() => {
			setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
		}, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
	}, []);
    

    useInterval((props) => {

		if (!intervalDelay) return;
        if(topPadding > window.innerWidth){
            setStream([]);
			const newStream = randomStream();
			setStream(newStream);
			setTopPadding(newStream.length * -44);
			setIntervalDelay(null);
			setTimeout(
				() =>
					setIntervalDelay(
						getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY),
					),
				getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS),
			);
        }
        else{
        setTopPadding(topPadding + 44);
        setStream(GetMut(stream));
        }
    }, 100);

    return(
        <div style={{
            marginLeft: topPadding,
            fontFamily: "Dogica",
            color: "#ffffff",
            writingMode: 'horizontal-rl',
            // textOrientation: 'upright',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            testShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
            fontSize: 30
        }}>{stream.map((char, index) => (<a href key={index} style={{marginTop: 6, 
        color: index === stream.length - 1 ? '#ffffff' : undefined,
        opacity: index < 6 ? 0.1 + index * 0.15 :1,
        textShadow: index === stream.length -1
        ? '0px 0px 20px rgba(255, 255, 255, 255, 1)'
        : undefined
        }}>{char}</a>))} 
        </div>
    )
};

export default RainStream;