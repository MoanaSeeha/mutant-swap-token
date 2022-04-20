import React from 'react'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import Card from '../Card'
import { AutoRow } from '../Row'
import rocket from '../../assets/images/rocket.png'
import bouncingMutantCoin from '../../assets/images/bouncing-mutant-coin.gif'
import { AutoColumn } from '../Column'
import { useFarms } from '../../state/stake/apr'
import { addCommasToNumber } from '../../utils'
import { JSBI } from '@mutantswap/sdk'

import { BIG_INT_ZERO } from '../../constants'

const StyledCard = styled(Card)`
  background: ${({ theme }) => `radial-gradient(farthest-corner at 0% 0%, ${theme.primary1} 0%, transparent 70%)`};
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
`

const IconContainer = styled.div`
  max-height: 131px;
  max-width: 222px;
  overflow: hidden;
  position: relative;
  & > * {
    padding-top: 16px;
    padding-right: 16px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        max-height: 90px;
        & > * {
            height: 65.5px;
            width: 111px;
            padding-top: 20px;
            padding-right: 20px;
        }
  `};
`

const IconContainerInside = styled.div`
  max-height: 86px;
  max-width: 88.5px;
  position: relative;
  left: 65px;
  bottom: 145px;
  & > * {
    padding-top: 0px;
    padding-right: 0px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        max-height: 60px;
        position: relative;
        left: 28px;
        bottom: 82px;
        & > * {
          height: 43px;
          width: 44.25px;
          padding-top: 0px;
          padding-right: 0px;
        }
  `};
`

export default function FarmBanner() {
  const farmTVL = useFarms().reduce((acc, farm) => JSBI.add(acc, JSBI.BigInt(farm.totalStakedInUSD)), BIG_INT_ZERO)
  const farmTVLFriendly = JSBI.GE(farmTVL, BIG_INT_ZERO) ? `$${addCommasToNumber(farmTVL.toString())}` : '-'

  return (
    <StyledCard>
      <AutoRow justifyContent="space-between" style={{ alignItems: 'flex-start' }}>
        <AutoColumn style={{ paddingTop: '1rem' }}>
          <TYPE.largeHeader>Farm</TYPE.largeHeader>
          <TYPE.subHeader marginTop="1rem">TVL: {farmTVLFriendly}</TYPE.subHeader>
        </AutoColumn>
        <IconContainer>
          <img height="131px" src={rocket} />
          <IconContainerInside>
          <img height="86px" src={bouncingMutantCoin} />
          </IconContainerInside>
        </IconContainer>

      </AutoRow>
    </StyledCard>
  )
}
