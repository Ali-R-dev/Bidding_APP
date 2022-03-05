import { useState } from "react"
import { Stack } from "react-bootstrap";


export const CountDownTimer = ({ EndTime }) => {

    const [timer, setTimer] = useState({
        days: 0, hours: 0, minits: 0, sec: 0
    })

    let interval = setInterval(() => {
        const now = new Date().getTime()
        const gap = new Date(EndTime).getTime() - now

        if (gap < 0) {
            return
        }

        let days = Math.floor(gap / (1000 * 60 * 60 * 24))
        let hours = Math.floor((gap % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
        let minits = Math.floor((gap % (1000 * 60 * 60) / (1000 * 60)))
        let sec = Math.floor((gap % (1000 * 60) / 1000))
        setTimer({ days, hours, minits, sec })
    }, 1000);




    return (
        <>
            <Stack direction="horizontal" gap={2} className="text-muted">
                <div>days:{timer.days}</div>
                <div>hours:{timer.hours}</div>
                <div>minits:{timer.minits}</div>
                <div>seconds:{timer.sec}</div>
            </Stack>
        </>
    )
}
