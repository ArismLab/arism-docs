export {}

declare global {
    type PageSEOProps = {
        title: string | undefined
        description: string | undefined
    }

    type Wrapper = {
        children: React.ReactNode
        className?: string
    }
}
