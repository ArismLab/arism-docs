import {
    Context,
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react'
import { create, useStore } from 'zustand'

import { remToPx } from '@libs/remToPx'

export const IsInsideMobileNavigationContext = createContext<boolean>(false)
export const useIsInsideMobileNavigation = () => {
    return {
        Context: useContext(IsInsideMobileNavigationContext),
        Value: IsInsideMobileNavigationContext,
    }
}

export const SectionStoreContext = createContext(null)
export const useSectionStore = (selector) => {
    const store: any = useContext(SectionStoreContext)
    return useStore(store, selector)
}

export const useInitialValue = (value, condition = true) => {
    const initialValue = useRef(value).current
    return condition ? initialValue : value
}

export const useIsomorphicLayoutEffect =
    typeof window === 'undefined' ? useEffect : useLayoutEffect

export const useMobileNavigationStore = create(
    (
        set
    ): {
        isOpen: boolean
        open: () => void
        close: () => void
        toggle: () => void
    } => ({
        isOpen: false,
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    })
)

export const useVisibleSections = (sectionStore) => {
    const setVisibleSections = useStore(
        sectionStore,
        (s: any) => s.setVisibleSections
    )
    const sections = useStore(sectionStore, (s: any) => s.sections)

    useEffect(() => {
        const checkVisibleSections = () => {
            const { innerHeight, scrollY } = window
            const newVisibleSections: string[] = []

            for (
                let sectionIndex = 0;
                sectionIndex < sections.length;
                sectionIndex++
            ) {
                const { id, headingRef, offsetRem } = sections[sectionIndex]
                const offset = remToPx(offsetRem)
                const top =
                    headingRef.current.getBoundingClientRect().top + scrollY

                if (sectionIndex === 0 && top - offset > scrollY) {
                    newVisibleSections.push('_top')
                }

                const nextSection = sections[sectionIndex + 1]
                const bottom =
                    (nextSection?.headingRef.current.getBoundingClientRect()
                        .top ?? Infinity) +
                    scrollY -
                    remToPx(nextSection?.offsetRem ?? 0)

                if (
                    (top > scrollY && top < scrollY + innerHeight) ||
                    (bottom > scrollY && bottom < scrollY + innerHeight) ||
                    (top <= scrollY && bottom >= scrollY + innerHeight)
                ) {
                    newVisibleSections.push(id)
                }
            }

            setVisibleSections(newVisibleSections)
        }

        const raf = window.requestAnimationFrame(() => checkVisibleSections())
        window.addEventListener('scroll', checkVisibleSections, {
            passive: true,
        })
        window.addEventListener('resize', checkVisibleSections)

        return () => {
            window.cancelAnimationFrame(raf)
            window.removeEventListener('scroll', checkVisibleSections)
            window.removeEventListener('resize', checkVisibleSections)
        }
    }, [setVisibleSections, sections])
}
