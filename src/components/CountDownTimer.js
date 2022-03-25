import { useState, useEffect, useCallback } from "react"
import { Stack } from "react-bootstrap";


export const CountDownTimer = ({ EndTime }) => {

    const [timer, setTimer] = useState({
        days: 0, hours: 0, minits: 0, sec: 0
    })

    const countFunction = () => {

        const now = new Date().getTime()
        const gap = new Date(EndTime).getTime() - now

        if (gap < 0) {
            return;
        }
        let days = Math.floor(gap / (1000 * 60 * 60 * 24))
        let hours = Math.floor((gap % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
        let minits = Math.floor((gap % (1000 * 60 * 60) / (1000 * 60)))
        let sec = Math.floor((gap % (1000 * 60) / 1000))
        setTimer({ days, hours, minits, sec })
    }

    useEffect(() => {

        let intervalId = setInterval(countFunction, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <>
            {(timer.days > 0 || timer.hours > 0 || timer.minits > 0 || timer.sec > 0) && <Stack direction="horizontal" gap={1} className="text-muted">
                <span>{timer.days || '00'}</span>
                <span>: {timer.hours || '00'}</span>
                <span>: {timer.minits || '00'}</span>
                <span>: {timer.sec || '00'}</span>
            </Stack>}
        </>
    )
}
