import ReactGA from 'react-ga'

export const initGA = () => {
  if (typeof window !== 'undefined') {
    // TODO: Add Google Analytics
    ReactGA.initialize('UA-XXXXXXXXX-X')
  }
}

export const logPageView = () => {
  if (typeof window !== 'undefined') {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}

export const logEvent = (category = '', action = '') => {
  if (typeof window !== 'undefined') {
    if (category && action) {
      ReactGA.event({ category, action })
    }
  }
}

export const logException = (description = '', fatal = false) => {
  if (typeof window !== 'undefined') {
    if (description) {
      ReactGA.exception({ description, fatal })
    }
  }
}
