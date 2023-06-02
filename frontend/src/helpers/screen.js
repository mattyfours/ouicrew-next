export const screenSizes = {
  small: '375px',
  smallMedium: '500px',
  medium: '750px',
  large: '1025px',
  xlarge: '1400px',
  xxlarge: '1800px',
  siteWidth: '2560px'
}

export const minScreen = (size = '0px') => `(min-width: ${size})`
export const maxScreen = (size = '1800px') => `(max-width: ${size})`
