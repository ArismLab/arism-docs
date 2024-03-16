import shiki from 'shiki'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import rehypeMdxTitle from 'rehype-mdx-title'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { mdxAnnotations } from 'mdx-annotations'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import * as acorn from 'acorn'

const rehypeParseCodeBlocks = () => {
    return (tree) => {
        visit(tree, 'element', (node, _nodeIndex, parentNode) => {
            if (node.tagName === 'code' && node.properties.className) {
                parentNode.properties.language =
                    node.properties.className[0]?.replace(/^language-/, '')
            }
        })
    }
}

let highlighter

const rehypeShiki = () => {
    return async (tree) => {
        highlighter =
            highlighter ??
            (await shiki.getHighlighter({ theme: 'css-variables' }))

        visit(tree, 'element', (node) => {
            if (
                node.tagName === 'pre' &&
                node.children[0]?.tagName === 'code'
            ) {
                let codeNode = node.children[0]
                let textNode = codeNode.children[0]

                node.properties.code = textNode.value

                if (node.properties.language) {
                    let tokens = highlighter.codeToThemedTokens(
                        textNode.value,
                        node.properties.language
                    )

                    textNode.value = shiki.renderToHtml(tokens, {
                        elements: {
                            pre: ({ children }) => children,
                            code: ({ children }) => children,
                            line: ({ children }) => `<span>${children}</span>`,
                        },
                    })
                }
            }
        })
    }
}

const rehypeSlugify = () => {
    return (tree) => {
        let slugify = slugifyWithCounter()
        visit(tree, 'element', (node) => {
            if (node.tagName === 'h2' && !node.properties.id) {
                node.properties.id = slugify(toString(node))
            }
        })
    }
}

const rehypeAddMDXExports = (getExports) => {
    return (tree) => {
        let exports = Object.entries(getExports(tree))

        for (let [name, value] of exports) {
            for (let node of tree.children) {
                if (
                    node.type === 'mdxjsEsm' &&
                    new RegExp(`export\\s+const\\s+${name}\\s*=`).test(
                        node.value
                    )
                ) {
                    return
                }
            }

            let exportStr = `export const ${name} = ${value}`

            tree.children.push({
                type: 'mdxjsEsm',
                value: exportStr,
                data: {
                    estree: acorn.parse(exportStr, {
                        sourceType: 'module',
                        ecmaVersion: 'latest',
                    }),
                },
            })
        }
    }
}

const getSections = (node) => {
    let sections = []

    for (let child of node.children ?? []) {
        if (child.type === 'element' && child.tagName === 'h2') {
            sections.push(`{
                title: ${JSON.stringify(toString(child))},
                id: ${JSON.stringify(child.properties.id)},
                ...${child.properties.annotation}
            }`)
        } else if (child.children) {
            sections.push(...getSections(child))
        }
    }

    return sections
}

const recmaRemoveNamedExports = () => {
    return (tree) => {
        tree.body = tree.body.map((node) => {
            if (node.type === 'ExportNamedDeclaration') {
                return node.declaration
            }
            return node
        })
    }
}

export const rehypePlugins = [
    mdxAnnotations.rehype,
    rehypeParseCodeBlocks,
    rehypeShiki,
    rehypeSlugify,
    rehypeMdxTitle,
    [
        rehypeAddMDXExports,
        (tree) => ({
            sections: `[${getSections(tree).join()}]`,
        }),
    ],
]

export const recmaPlugins = [
    mdxAnnotations.recma,
    recmaRemoveNamedExports,
    recmaNextjsStaticProps,
]

export const remarkPlugins = [mdxAnnotations.remark, remarkGfm]