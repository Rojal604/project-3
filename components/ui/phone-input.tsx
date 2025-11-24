"use client"

import * as React from "react"
import { Phone } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    className?: string
}

const countryCodes = [
    { code: "+1", country: "US", iso: "us" },
    { code: "+44", country: "UK", iso: "gb" },
    { code: "+91", country: "IN", iso: "in" },
    { code: "+977", country: "NP", iso: "np" },
    { code: "+61", country: "AU", iso: "au" },
    { code: "+81", country: "JP", iso: "jp" },
    { code: "+86", country: "CN", iso: "cn" },
    { code: "+49", country: "DE", iso: "de" },
    { code: "+33", country: "FR", iso: "fr" },
]

export function PhoneInput({ value, onChange, className }: PhoneInputProps) {
    const [countryCode, setCountryCode] = React.useState("+1")
    const [phoneNumber, setPhoneNumber] = React.useState("")

    // Parse initial value if present
    React.useEffect(() => {
        if (value) {
            const foundCode = countryCodes.find((c) => value.startsWith(c.code))
            if (foundCode) {
                setCountryCode(foundCode.code)
                setPhoneNumber(value.replace(foundCode.code, "").trim())
            } else {
                setPhoneNumber(value)
            }
        }
    }, [])

    const handleCodeChange = (code: string) => {
        setCountryCode(code)
        onChange(`${code} ${phoneNumber}`)
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value
        setPhoneNumber(number)
        onChange(`${countryCode} ${number}`)
    }

    const selectedCountry = countryCodes.find((c) => c.code === countryCode)

    return (
        <div className={cn("flex gap-2", className)}>
            <Select value={countryCode} onValueChange={handleCodeChange}>
                <SelectTrigger className="w-[140px] !h-14 bg-background border-primary/20 hover:bg-primary/5 focus:ring-primary">
                    <SelectValue placeholder="Code">
                        {selectedCountry && (
                            <div className="flex items-center gap-2">
                                <img
                                    src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                                    srcSet={`https://flagcdn.com/w80/${selectedCountry.iso}.png 2x`}
                                    width="24"
                                    alt={selectedCountry.country}
                                    className="rounded-sm"
                                />
                                <span className="text-muted-foreground text-sm">{selectedCountry.code}</span>
                            </div>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {countryCodes.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                            <span className="flex items-center gap-3">
                                <img
                                    src={`https://flagcdn.com/w40/${c.iso}.png`}
                                    srcSet={`https://flagcdn.com/w80/${c.iso}.png 2x`}
                                    width="24"
                                    alt={c.country}
                                    className="rounded-sm"
                                />
                                <span className="text-muted-foreground text-sm">{c.code}</span>
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="relative w-full">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handleNumberChange}
                    placeholder="Phone number"
                    className="pl-12 h-14 bg-background border-primary/20 hover:bg-primary/5 focus-visible:ring-primary text-base"
                />
            </div>
        </div>
    )
}
