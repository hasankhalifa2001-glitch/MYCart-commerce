'use client'
// components/TimeAgo.js

import React, { useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'

interface Props {
    timestamp: string
}

const TimeAgo = ({ timestamp }: Props) => {
    const [timeAgo, setTimeAgo] = useState('')

    useEffect(() => {
        if (!timestamp) return

        const date = parseISO(timestamp)

        const updateTime = () => {
            const timePeriod = formatDistanceToNow(date, { addSuffix: true })
            setTimeAgo(timePeriod)
        }

        updateTime() // أول مرة

        const intervalId = setInterval(updateTime, 60 * 1000) // كل دقيقة

        return () => clearInterval(intervalId) // تنظيف عند الخروج
    }, [timestamp])

    if (!timestamp) return null

    return (
        <span title={new Date(timestamp).toLocaleString()}>
            &nbsp;<i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo
