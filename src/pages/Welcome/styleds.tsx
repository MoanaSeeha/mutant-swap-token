import styled from 'styled-components'

export const Bio = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  text-align: center;
  letter-spacing: 0.05em;
  font-family: VT323;
  color: #ffffff;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      font-size: 14px;
  `};
`

export const LogoContainer = styled.div`
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        img {
            width: 31.25px;
        }
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
        img {
            width: 39px;
        }
  `};
  ${({ theme }) => theme.mediaWidth.upToXLarge`
        & > * {
            width: 39.31px;
        }
  `};
`
export const LogoTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 178.9%;
  letter-spacing: 0.25em;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      font-size: 20px;
  `};
`

export const MainAssets = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img {
      width: 534px;
      height: 534px;
      left: -81px;
      top: 285px;
    }
    text-align: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToXLarge`
        & > * {
          width: 1100px;
          height: 1100px;
          margin-top: 50px;
          margin-bottom: 50px;
        }
  `};
`
export const Brand = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
        display: none;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: flex;
    flex-direction: column;
  `};
`

export const Brand1 = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: grid;
    align-items: center;
    grid-template-rows: 1fr;
    grid-template-areas: 
    "brand1  brand2  brand3 brand3";
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`
export const Brand2 = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: grid;
    align-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
    grid-template-areas: 
    "brand4   brand5 brand6   brand7";
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const BrandItem1 = styled.div`
  grid-area: brand1;
`
export const BrandItem2 = styled.div`
  display: flex;
  grid-area: brand2;
`
export const BrandItem3 = styled.div`
  display: flex;
  grid-area: brand3;
`
export const BrandItem4 = styled.div`
  display: flex;
  grid-area: brand4;
`
export const BrandItem5 = styled.div`
  display: flex;
  grid-area: brand5;
`
export const BrandItem6 = styled.div`
  display: flex;
  grid-area: brand6;
`
export const BrandItem7 = styled.div`
  display: flex;
  grid-area: brand7;
`
export const BrandImg = styled.img`
  width: 150px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 200px;
  `};
`
export const Price = styled.div`
  display: flex;
  text-align: center;
  grid-gap: 0.25rem;
  margin-top: 1em;
  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top: 0px;
        margin-right: 10px;
        margin-left: 10px;
        grid-gap: 0.15rem;
        p {
          font-size: 12px;
          line-height: 12px;
        }
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
        display: grid;  
        grid-template-rows: 0.5fr 0.5fr;
        grid-template-columns: 0.5fr 0.5fr;
        grid-template-areas: 
            "price1 price2"
            "price3 price4";
        font-size: 12px;
        p {
          font-size: 12px;
          line-height: 12px;
        }
    `};
`

export const PriceContent1 = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  grid-area: price1;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 16px;
  color: #bfbfbf;
  padding-left: 3em;
  padding-right: 3em;
  padding-bottom: 2em;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        padding-left: 1em;
        padding-right: 1em;
        margin-top: 0px;
        p {
          font-size: 13px;
          line-height: 11px;
        }
  `};
`
export const PriceContent2 = styled.div`
  display: flex;
  text-align: center;
  grid-area: price2;
  flex-direction: column;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 16px;
  color: #bfbfbf;
  padding-left: 3em;
  padding-right: 3em;
  padding-bottom: 2em;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top: 0px;
        padding-left: 1em;
        padding-right: 1em;
        p {
          font-size: 13px;
          line-height: 11px;
        }
  `};
`
export const PriceContent3 = styled.div`
  display: flex;
  text-align: center;
  grid-area: price3;
  flex-direction: column;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 16px;
  color: #bfbfbf;
  padding-left: 3em;
  padding-right: 3em;
  padding-bottom: 2em;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top: 0px;
        padding-left: 1em;
        padding-right: 1em;
        p {
          font-size: 13px;
          line-height: 11px;
        }
  `};
`
export const PriceContent4 = styled.div`
  display: flex;
  text-align: center;
  grid-area: price4;
  flex-direction: column;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 16px;
  color: #bfbfbf;
  padding-left: 3em;
  padding-right: 3em;
  padding-bottom: 2em;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top: 0px;
        padding-left: 1em;
        padding-right: 1em;
        p {
          font-size: 13px;
          line-height: 11px;
        }
  `};
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const IconImg = styled.img`
  padding: 1em;
  margin-top: 5em;
  height: 50px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     margin-top: 1em;
  `};
`
