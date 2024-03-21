import { useEffect, useRef, useState } from 'react'
import { create } from 'zustand'

export const usePreventLayoutShift = () => {
    const positionRef: any = useRef()
    const rafRef: any = useRef()

    useEffect(() => {
        return () => {
            window.cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return {
        positionRef,
        preventLayoutShift(callback) {
            const initialTop = positionRef.current.getBoundingClientRect().top

            callback()

            rafRef.current = window.requestAnimationFrame(() => {
                const newTop = positionRef.current.getBoundingClientRect().top
                window.scrollBy(0, newTop - initialTop)
            })
        },
    }
}

export const usePreferredLanguageStore = create((set) => ({
    preferredLanguages: [],
    addPreferredLanguage: (language) =>
        set((state) => ({
            preferredLanguages: [
                ...state.preferredLanguages.filter(
                    (preferredLanguage) => preferredLanguage !== language
                ),
                language,
            ],
        })),
}))

export const useTabGroupProps = (availableLanguages) => {
    const { preferredLanguages, addPreferredLanguage }: any =
        usePreferredLanguageStore()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const activeLanguage = [...availableLanguages].sort(
        (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
    )[0]
    const languageIndex = availableLanguages.indexOf(activeLanguage)
    const newSelectedIndex =
        languageIndex === -1 ? selectedIndex : languageIndex
    if (newSelectedIndex !== selectedIndex) {
        setSelectedIndex(newSelectedIndex)
    }

    const { positionRef, preventLayoutShift } = usePreventLayoutShift()

    return {
        as: 'div',
        ref: positionRef,
        selectedIndex,
        onChange: (newSelectedIndex) => {
            preventLayoutShift(() =>
                addPreferredLanguage(availableLanguages[newSelectedIndex])
            )
        },
    }
}
