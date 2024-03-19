import { slug } from 'github-slugger'

const kebabCase = (str: string): string => {
    const s = slug(str)
    return s ? s : str
}

export default kebabCase
