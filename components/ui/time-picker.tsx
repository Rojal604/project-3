"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface TimePickerProps {
    time?: string
    setTime: (time: string) => void
    className?: string
}

export function TimePicker({ time, setTime, className }: TimePickerProps) {
    // Generate time slots from 17:00 to 22:00 every 30 minutes
    const timeSlots = []
    for (let i = 17; i <= 22; i++) {
        timeSlots.push(`${i}:00`)
        if (i !== 22) timeSlots.push(`${i}:30`)
    }

    return (
        <Select value={time} onValueChange={setTime}>
            <SelectTrigger
                className={cn(
                    "w-full !h-14 bg-background border-primary/20 hover:bg-primary/5 focus:ring-primary",
                    className
                )}
            >
                <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Select time" />
                </div>
            </SelectTrigger>
            <SelectContent>
                {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                        {slot}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
