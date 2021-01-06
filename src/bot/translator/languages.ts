export enum Languages {
  ENG,
  RU,
  UA,
  SK
}


const fromLanguageCode = (code: string) => {
  switch (code) {
    case 'en':
      return Languages.ENG

    case 'ru':
      return Languages.RU

    case 'sk':
      return Languages.SK

    case 'ua':
      return Languages.UA

    default:
      return Languages.ENG
  }
}


export {fromLanguageCode}
