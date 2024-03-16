import { remToPx } from '@libs/remToPx'
import {
    Context,
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react'
import { create, useStore } from 'zustand'

const isInsideMobileNavigationContext = createContext(false)

export const useIsInsideMobileNavigation = () => {
    return {
        Context: useContext(isInsideMobileNavigationContext),
        Value: isInsideMobileNavigationContext
    }
}

export const useInitialValue = (value, condition = true) => {
    let initialValue = useRef(value).current
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

export function useSectionStore(selector) {
    let store = useContext(SectionStoreContext)
    return useStore(store, selector)
}

export const useVisibleSections = (sectionStore) => {
    let setVisibleSections = useStore(
        sectionStore,
        (s: any) => s.setVisibleSections
    )
    let sections = useStore(sectionStore, (s: any) => s.sections)

    useEffect(() => {
        function checkVisibleSections() {
            let { innerHeight, scrollY } = window
            let newVisibleSections: string[] = []

            for (
                let sectionIndex = 0;
                sectionIndex < sections.length;
                sectionIndex++
            ) {
                let { id, headingRef, offsetRem } = sections[sectionIndex]
                let offset = remToPx(offsetRem)
                let top =
                    headingRef.current.getBoundingClientRect().top + scrollY

                if (sectionIndex === 0 && top - offset > scrollY) {
                    newVisibleSections.push('_top')
                }

                let nextSection = sections[sectionIndex + 1]
                let bottom =
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

        let raf = window.requestAnimationFrame(() => checkVisibleSections())
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
