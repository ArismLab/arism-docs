import { useEffect, useRef, useState } from 'react'
import { create } from 'zustand'

export const usePreventLayoutShift = () => {
    let positionRef: any = useRef()
    let rafRef: any = useRef()

    useEffect(() => {
        return () => {
            window.cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return {
        positionRef,
        preventLayoutShift(callback) {
            let initialTop = positionRef.current.getBoundingClientRect().top

            callback()

            rafRef.current = window.requestAnimationFrame(() => {
                let newTop = positionRef.current.getBoundingClientRect().top
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
    let { preferredLanguages, addPreferredLanguage }: any =
        usePreferredLanguageStore()
    let [selectedIndex, setSelectedIndex] = useState(0)
    let activeLanguage = [...availableLanguages].sort(
        (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
    )[0]
    let languageIndex = availableLanguages.indexOf(activeLanguage)
    let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
    if (newSelectedIndex !== selectedIndex) {
        setSelectedIndex(newSelectedIndex)
    }

    let { positionRef, preventLayoutShift } = usePreventLayoutShift()

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
