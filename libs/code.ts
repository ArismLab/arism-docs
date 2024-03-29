const languageNames = {
    js: 'JavaScript',
    ts: 'TypeScript',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    php: 'PHP',
    python: 'Python',
    ruby: 'Ruby',
    go: 'Go',
}

export const getPanelTitle = ({ title, language }) => {
    return title ?? languageNames[language] ?? 'Code'
}
