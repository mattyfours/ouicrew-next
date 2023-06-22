import English from './english'

const languages = [
  { en: English }
]

export const t = (stringOfKeys) => {
  const [defaultLanguage] = languages
  const [languageObject] = Object.values(defaultLanguage)

  const langValue = !stringOfKeys
    ? null
    : stringOfKeys
      .split('.')
      .reduce((nestedObject, currentKey) => nestedObject?.[currentKey], languageObject)

  return (typeof langValue === 'undefined' || !langValue)
    ? `Missing Translation: ${stringOfKeys}`
    : langValue
}
