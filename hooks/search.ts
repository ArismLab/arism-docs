import { createAutocomplete } from '@algolia/autocomplete-core'
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia'
import algoliasearch from 'algoliasearch'
import { useRouter } from 'next/router'
import { useId, useRef, useState } from 'react'

export const useAutocomplete = () => {
    const id = useId()
    const router = useRouter()
    const [autocompleteState, setAutocompleteState] = useState({})

    const [autocomplete] = useState(() =>
        createAutocomplete({
            id,
            placeholder: 'Find something...',
            defaultActiveItemId: 0,
            onStateChange: ({ state }) => setAutocompleteState(state),
            shouldPanelOpen: ({ state }) => state.query !== '',
            navigator: {
                navigate({ itemUrl }) {
                    autocomplete.setIsOpen(true)
                    router.push(itemUrl)
                },
            },
            getSources: (): any => [
                {
                    sourceId: 'documentation',
                    getItemInputValue: ({ item }) => item.query,
                    getItemUrl: ({ item }) => {
                        const url = new URL(item.url as any)
                        return `${url.pathname}${url.hash}`
                    },
                    onSelect: ({ itemUrl }) => router.push(itemUrl as any),
                    getItems: ({ query }) =>
                        getAlgoliaResults({
                            searchClient: algoliasearch(
                                process.env
                                    .NEXT_PUBLIC_DOCSEARCH_APP_ID as string,
                                process.env
                                    .NEXT_PUBLIC_DOCSEARCH_API_KEY as string
                            ),
                            queries: [
                                {
                                    query,
                                    indexName: process.env
                                        .NEXT_PUBLIC_DOCSEARCH_INDEX_NAME as string,
                                    params: {
                                        hitsPerPage: 5,
                                        highlightPreTag:
                                            '<mark class="underline bg-transparent text-primary-500">',
                                        highlightPostTag: '</mark>',
                                    },
                                },
                            ],
                        }),
                },
            ],
        })
    )

    return { autocomplete, autocompleteState }
}

export const useSearchProps = () => {
    const buttonRef: any = useRef()
    const [open, setOpen] = useState(false)

    return {
        buttonProps: {
            ref: buttonRef,
            onClick: () => setOpen(true),
        },
        dialogProps: {
            open,
            setOpen: (open) => {
                const { width, height } =
                    buttonRef.current.getBoundingClientRect()
                if (!open || (width !== 0 && height !== 0)) {
                    setOpen(open)
                }
            },
        },
    }
}
