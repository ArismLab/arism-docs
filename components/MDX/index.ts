import { MDXComponents } from 'mdx/types'

import Button from '@components/Button'
import Code from '@components/MDX/Code'
import Col from '@components/MDX/Col'
import H2 from '@components/MDX/H2'
import Note from '@components/MDX/Note'
import Pre from '@components/MDX/Pre'
import Properties from '@components/MDX/Properties'
import Property from '@components/MDX/Property'
import Row from '@components/MDX/Row'

const mdxComponents: MDXComponents = {
    Note,
    Row,
    Col,
    Properties,
    Property,
    // a: Link as any,
    h2: H2 as any,
    Button,
    Pre,
    code: Code as any,
    pre: Pre as any,
}

export default mdxComponents
