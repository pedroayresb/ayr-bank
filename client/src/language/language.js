export const headerLanguage = (language) => {
  switch (language) {
    case 'en-US':
      return 'Welcome,'
    case 'pt-br':
      return 'Bem-vindo,'
    default:
      return 'My Title'
  }
}

export const transferLanguage = (language) => {
  switch (language) {
    case 'en-US':
      return 'Transfer'
    case 'pt-br':
      return 'Transferir'
    default:
      return 'Transfer'
  }
}

export const historyLanguage = (language) => {
  switch (language) {
    case 'en-US':
      return 'Transfer history'
    case 'pt-br':
      return 'Histórico de transferências'
    default:
      return 'History'
  }
}