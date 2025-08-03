'use client'


import { ChildrenProps, CustomDateRange } from "@/app/_types";
import { createContext,  useContext, useState } from "react";


const initialState: CustomDateRange = {
    from: undefined,
    to: undefined,
}

const ReservationContext = createContext({
    range: initialState,
    isOpen: false,
    setIsOpen: (isOpen: boolean) => {},
    setRange: (range: typeof initialState) => {},
    resetRange: () => {}
});



export const ReservationProvider = ({ children }:ChildrenProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [range, setRange] = useState<CustomDateRange>({
        from: initialState.from,
        to: initialState.to,
    })

    const resetRange = () => {
        setRange(initialState)
    }

    return (
        <ReservationContext.Provider value={{ range, isOpen, setIsOpen,  setRange, resetRange,  }}>
            {children}
        </ReservationContext.Provider>
    )
}

export const useReservationContext = () => {
    const context = useContext(ReservationContext)
    if (!context) {
        throw new Error("useReservationContext must be used within a ReservationProvider")
    }
    return context
}