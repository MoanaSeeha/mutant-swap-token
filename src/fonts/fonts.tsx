import { createGlobalStyle } from 'styled-components'

import VT323 from './VT323.ttf'
import Roboto from './Roboto.ttf'

export default createGlobalStyle`
    @font-face {
        font-family: 'VT323';
        src: local('VT323'),
        url(${VT323}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'),
        url(${Roboto}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
`
