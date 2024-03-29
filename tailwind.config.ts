import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './libs/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['Sarabun', 'sans-serif'],
            serif: ['Lora', 'serif'],
        },
        fontSize: {
            '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
            xs: ['0.8125rem', { lineHeight: '1.5rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '1.75rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['2rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '3rem' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
        },
        extend: {
            colors: {
                primary: {
                    50: 'rgb(var(--primary-50) / <alpha-value>)',
                    100: 'rgb(var(--primary-100) / <alpha-value>)',
                    200: 'rgb(var(--primary-200) / <alpha-value>)',
                    300: 'rgb(var(--primary-300) / <alpha-value>)',
                    400: 'rgb(var(--primary-400) / <alpha-value>)',
                    500: 'rgb(var(--primary-500) / <alpha-value>)',
                    600: 'rgb(var(--primary-600) / <alpha-value>)',
                    700: 'rgb(var(--primary-700) / <alpha-value>)',
                    800: 'rgb(var(--primary-800) / <alpha-value>)',
                    900: 'rgb(var(--primary-900) / <alpha-value>)',
                    950: 'rgb(var(--primary-950) / <alpha-value>)',
                },
                secondary: {
                    50: 'rgb(var(--secondary-50) / <alpha-value>)',
                    100: 'rgb(var(--secondary-100) / <alpha-value>)',
                    200: 'rgb(var(--secondary-200) / <alpha-value>)',
                    300: 'rgb(var(--secondary-300) / <alpha-value>)',
                    400: 'rgb(var(--secondary-400) / <alpha-value>)',
                    500: 'rgb(var(--secondary-500) / <alpha-value>)',
                    600: 'rgb(var(--secondary-600) / <alpha-value>)',
                    700: 'rgb(var(--secondary-700) / <alpha-value>)',
                    800: 'rgb(var(--secondary-800) / <alpha-value>)',
                    900: 'rgb(var(--secondary-900) / <alpha-value>)',
                    950: 'rgb(var(--secondary-950) / <alpha-value>)',
                },
                tertiary: {
                    50: 'rgb(var(--tertiary-50) / <alpha-value>)',
                    100: 'rgb(var(--tertiary-100) / <alpha-value>)',
                    200: 'rgb(var(--tertiary-200) / <alpha-value>)',
                    300: 'rgb(var(--tertiary-300) / <alpha-value>)',
                    400: 'rgb(var(--tertiary-400) / <alpha-value>)',
                    500: 'rgb(var(--tertiary-500) / <alpha-value>)',
                    600: 'rgb(var(--tertiary-600) / <alpha-value>)',
                    700: 'rgb(var(--tertiary-700) / <alpha-value>)',
                    800: 'rgb(var(--tertiary-800) / <alpha-value>)',
                    900: 'rgb(var(--tertiary-900) / <alpha-value>)',
                    950: 'rgb(var(--tertiary-950) / <alpha-value>)',
                },
            },
            backgroundImage: {
                radial: 'radial-gradient(, var(--tw-gradient-stops))',
                conic: 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        typography: ({ theme }) => ({
            DEFAULT: {
                css: {
                    '--tw-prose-body': theme('colors.zinc.700'),
                    '--tw-prose-headings': theme('colors.zinc.900'),
                    '--tw-prose-links': theme('colors.primary.600'),
                    '--tw-prose-links-hover': theme('colors.primary.800'),
                    '--tw-prose-links-underline': theme(
                        'colors.primary.800 / 0.3'
                    ),
                    '--tw-prose-bold': theme('colors.zinc.800'),
                    '--tw-prose-counters': theme('colors.zinc.500'),
                    '--tw-prose-bullets': theme('colors.zinc.300'),
                    '--tw-prose-hr': theme('colors.zinc.800 / 0.05'),
                    '--tw-prose-quotes': theme('colors.zinc.800'),
                    '--tw-prose-quote-borders': theme('colors.zinc.200'),
                    '--tw-prose-captions': theme('colors.zinc.500'),
                    '--tw-prose-code': theme('colors.zinc.800'),
                    '--tw-prose-code-bg': theme('colors.zinc.100'),
                    '--tw-prose-code-ring': theme('colors.zinc.300'),
                    '--tw-prose-th-borders': theme('colors.zinc.300'),
                    '--tw-prose-td-borders': theme('colors.zinc.200'),

                    '--tw-prose-invert-body': theme('colors.zinc.400'),
                    '--tw-prose-invert-headings': theme('colors.white'),
                    '--tw-prose-invert-links': theme('colors.primary.400'),
                    '--tw-prose-invert-links-hover':
                        theme('colors.primary.500'),
                    '--tw-prose-invert-links-underline': theme(
                        'colors.primary.500 / 0.3'
                    ),
                    '--tw-prose-invert-bold': theme('colors.zinc.300'),
                    '--tw-prose-invert-counters': theme('colors.zinc.400'),
                    '--tw-prose-invert-bullets': theme('colors.zinc.600'),
                    '--tw-prose-invert-hr': theme('colors.zinc.300 / 0.05'),
                    '--tw-prose-invert-quotes': theme('colors.zinc.100'),
                    '--tw-prose-invert-quote-borders': theme('colors.zinc.700'),
                    '--tw-prose-invert-captions': theme('colors.zinc.400'),
                    '--tw-prose-invert-code': theme('colors.zinc.300'),
                    '--tw-prose-invert-code-bg': theme(
                        'colors.zinc.700 / 0.15'
                    ),
                    '--tw-prose-invert-code-ring': theme(
                        'colors.zinc.300 / 0.1'
                    ),
                    '--tw-prose-invert-th-borders': theme('colors.zinc.600'),
                    '--tw-prose-invert-td-borders': theme('colors.zinc.700'),

                    // Base
                    color: 'var(--tw-prose-body)',
                    fontSize: theme('fontSize.base')[0],
                    lineHeight: theme('lineHeight.8'),
                    fontFamily: theme('fontFamily.serif').join(', '),

                    // Layout
                    '> *': {
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        '@screen lg': {
                            marginLeft: `calc(55% - min(50%, ${theme('maxWidth.lg')}))`,
                            marginRight: `calc(55% - min(50%, ${theme('maxWidth.lg')}))`,
                        },
                    },

                    // Text
                    p: {
                        marginTop: theme('spacing.4'),
                        marginBottom: theme('spacing.4'),
                    },
                    '[class~="katex"]': {
                        fontSize: theme('fontSize.xl')[0],
                        color: 'var(--tw-prose-bold)',
                        ...theme('fontSize.xl')[1],
                    },

                    // Lists
                    ol: {
                        listStyleType: 'decimal',
                        marginTop: theme('spacing.5'),
                        marginBottom: theme('spacing.5'),
                        paddingLeft: '1.625rem',
                    },
                    'ol[type="A"]': {
                        listStyleType: 'upper-alpha',
                    },
                    'ol[type="a"]': {
                        listStyleType: 'lower-alpha',
                    },
                    'ol[type="A" s]': {
                        listStyleType: 'upper-alpha',
                    },
                    'ol[type="a" s]': {
                        listStyleType: 'lower-alpha',
                    },
                    'ol[type="I"]': {
                        listStyleType: 'upper-roman',
                    },
                    'ol[type="i"]': {
                        listStyleType: 'lower-roman',
                    },
                    'ol[type="I" s]': {
                        listStyleType: 'upper-roman',
                    },
                    'ol[type="i" s]': {
                        listStyleType: 'lower-roman',
                    },
                    'ol[type="1"]': {
                        listStyleType: 'decimal',
                    },
                    ul: {
                        listStyleType: 'disc',
                        marginTop: theme('spacing.5'),
                        marginBottom: theme('spacing.5'),
                        paddingLeft: '1.625rem',
                    },
                    li: {
                        marginTop: theme('spacing.2'),
                        marginBottom: theme('spacing.2'),
                    },
                    ':is(ol, ul) > li': {
                        paddingLeft: theme('spacing[1.5]'),
                    },
                    'ol > li::marker': {
                        fontWeight: '400',
                        color: 'var(--tw-prose-counters)',
                    },
                    'ul > li::marker': {
                        color: 'var(--tw-prose-bullets)',
                    },
                    '> ul > li p': {
                        marginTop: theme('spacing.3'),
                        marginBottom: theme('spacing.3'),
                    },
                    '> ul > li > *:first-child': {
                        marginTop: theme('spacing.5'),
                    },
                    '> ul > li > *:last-child': {
                        marginBottom: theme('spacing.5'),
                    },
                    '> ol > li > *:first-child': {
                        marginTop: theme('spacing.5'),
                    },
                    '> ol > li > *:last-child': {
                        marginBottom: theme('spacing.5'),
                    },
                    'ul ul, ul ol, ol ul, ol ol': {
                        marginTop: theme('spacing.3'),
                        marginBottom: theme('spacing.3'),
                    },

                    // Horizontal rules
                    hr: {
                        borderColor: 'var(--tw-prose-hr)',
                        borderTopWidth: 1,
                        marginTop: theme('spacing.16'),
                        marginBottom: theme('spacing.16'),
                        maxWidth: 'none',
                        marginLeft: `calc(-1 * ${theme('spacing.4')})`,
                        marginRight: `calc(-1 * ${theme('spacing.4')})`,
                        '@screen sm': {
                            marginLeft: `calc(-1 * ${theme('spacing.6')})`,
                            marginRight: `calc(-1 * ${theme('spacing.6')})`,
                        },
                        '@screen lg': {
                            marginLeft: `calc(-1 * ${theme('spacing.8')})`,
                            marginRight: `calc(-1 * ${theme('spacing.8')})`,
                        },
                    },

                    // Quotes
                    blockquote: {
                        fontWeight: '500',
                        fontStyle: 'italic',
                        color: 'var(--tw-prose-quotes)',
                        borderLeftWidth: '0.25rem',
                        borderLeftColor: 'var(--tw-prose-quote-borders)',
                        quotes: '"\\201C""\\201D""\\2018""\\2019"',
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.8'),
                        paddingLeft: theme('spacing.5'),
                    },
                    'blockquote p:first-of-type::before': {
                        content: 'open-quote',
                    },
                    'blockquote p:last-of-type::after': {
                        content: 'close-quote',
                    },

                    // Headings
                    h1: {
                        color: 'var(--tw-prose-headings)',
                        fontWeight: '700',
                        fontSize: theme('fontSize.5xl')[0],
                        ...theme('fontSize.5xl')[1],
                        marginBottom: theme('spacing.16'),
                    },
                    h2: {
                        color: 'var(--tw-prose-headings)',
                        fontWeight: '600',
                        fontSize: theme('fontSize.3xl')[0],
                        ...theme('fontSize.3xl')[1],
                        marginTop: theme('spacing.12'),
                        marginBottom: theme('spacing.6'),
                    },
                    h3: {
                        color: 'var(--tw-prose-headings)',
                        fontSize: theme('fontSize.2xl')[0],
                        ...theme('fontSize.2xl')[1],
                        fontWeight: '600',
                        marginTop: theme('spacing.10'),
                        marginBottom: theme('spacing.4'),
                    },

                    // Media
                    'img, video, figure': {
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.8'),
                    },
                    'figure > *': {
                        marginTop: '0',
                        marginBottom: '0',
                    },
                    figcaption: {
                        color: 'var(--tw-prose-captions)',
                        fontSize: theme('fontSize.base')[0],
                        letterSpacing: '0.01em',
                        textAlign: 'center',
                        fontFamily: theme('fontFamily.sans').join(', '),
                        ...theme('fontSize.base')[1],
                        marginTop: theme('spacing.2'),
                    },

                    // Tables
                    table: {
                        width: '100%',
                        tableLayout: 'auto',
                        textAlign: 'left',
                        marginTop: theme('spacing.8'),
                        marginBottom: theme('spacing.8'),
                        lineHeight: theme('lineHeight.6'),
                    },
                    thead: {
                        borderBottomWidth: '1px',
                        borderBottomColor: 'var(--tw-prose-th-borders)',
                    },
                    'thead th': {
                        color: 'var(--tw-prose-headings)',
                        fontWeight: '600',
                        verticalAlign: 'bottom',
                        paddingRight: theme('spacing.2'),
                        paddingBottom: theme('spacing.2'),
                        paddingLeft: theme('spacing.2'),
                    },
                    'thead th:first-child': {
                        paddingLeft: '0',
                    },
                    'thead th:last-child': {
                        paddingRight: '0',
                    },
                    'tbody tr': {
                        borderBottomWidth: '1px',
                        borderBottomColor: 'var(--tw-prose-td-borders)',
                    },
                    'tbody tr:last-child': {
                        borderBottomWidth: '0',
                    },
                    'tbody td': {
                        verticalAlign: 'baseline',
                    },
                    tfoot: {
                        borderTopWidth: '1px',
                        borderTopColor: 'var(--tw-prose-th-borders)',
                    },
                    'tfoot td': {
                        verticalAlign: 'top',
                    },
                    ':is(tbody, tfoot) td': {
                        paddingTop: theme('spacing.2'),
                        paddingRight: theme('spacing.2'),
                        paddingBottom: theme('spacing.2'),
                        paddingLeft: theme('spacing.2'),
                    },
                    ':is(tbody, tfoot) td:first-child': {
                        paddingLeft: '0',
                    },
                    ':is(tbody, tfoot) td:last-child': {
                        paddingRight: '0',
                    },

                    // Inline elements
                    a: {
                        color: 'var(--tw-prose-links)',
                        textDecoration: 'underline transparent',
                        fontWeight: '500',
                        transitionProperty: 'color, text-decoration-color',
                        transitionDuration: theme('transitionDuration.DEFAULT'),
                        transitionTimingFunction: theme(
                            'transitionTimingFunction.DEFAULT'
                        ),
                        '&:hover': {
                            color: 'var(--tw-prose-links-hover)',
                            textDecorationColor:
                                'var(--tw-prose-links-underline)',
                            textUnderlineOffset: '0.2em',
                        },
                    },
                    ':is(h1, h2, h3) a': {
                        fontWeight: 'inherit',
                    },
                    strong: {
                        color: 'var(--tw-prose-bold)',
                        fontWeight: '600',
                    },
                    ':is(a, blockquote, thead th) strong': {
                        color: 'inherit',
                    },
                    code: {
                        color: 'var(--tw-prose-code)',
                        borderRadius: theme('borderRadius.lg'),
                        paddingTop: theme('padding.1'),
                        paddingRight: theme('padding[1.5]'),
                        paddingBottom: theme('padding.1'),
                        paddingLeft: theme('padding[1.5]'),
                        boxShadow: 'inset 0 0 0 1px var(--tw-prose-code-ring)',
                        backgroundColor: 'var(--tw-prose-code-bg)',
                        fontSize: theme('fontSize.2xs'),
                    },
                    ':is(a, h1, h2, h3, blockquote, thead th) code': {
                        color: 'inherit',
                    },
                    'h2 code': {
                        fontSize: theme('fontSize.base')[0],
                        fontWeight: 'inherit',
                    },
                    'h3 code': {
                        fontSize: theme('fontSize.sm')[0],
                        fontWeight: 'inherit',
                    },

                    // Overrides
                    ':is(h1, h2, h3) + *': {
                        marginTop: '0',
                    },
                    '> :first-child': {
                        marginTop: '0 !important',
                    },
                    '> :last-child': {
                        marginBottom: '0 !important',
                    },
                },
            },
            invert: {
                css: {
                    '--tw-prose-body': 'var(--tw-prose-invert-body)',
                    '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
                    '--tw-prose-links': 'var(--tw-prose-invert-links)',
                    '--tw-prose-links-hover':
                        'var(--tw-prose-invert-links-hover)',
                    '--tw-prose-links-underline':
                        'var(--tw-prose-invert-links-underline)',
                    '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
                    '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
                    '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
                    '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
                    '--tw-prose-quotes': 'var(--tw-prose-invert-quotes)',
                    '--tw-prose-quote-borders':
                        'var(--tw-prose-invert-quote-borders)',
                    '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
                    '--tw-prose-code': 'var(--tw-prose-invert-code)',
                    '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
                    '--tw-prose-code-ring': 'var(--tw-prose-invert-code-ring)',
                    '--tw-prose-th-borders':
                        'var(--tw-prose-invert-th-borders)',
                    '--tw-prose-td-borders':
                        'var(--tw-prose-invert-td-borders)',
                },
            },
        }),
    },
    plugins: [
        require('tailwindcss/nesting'),
        require('postcss-nesting'),
        require('@tailwindcss/typography'),
    ],
}
export default config
