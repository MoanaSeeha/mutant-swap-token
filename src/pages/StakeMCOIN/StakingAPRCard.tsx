import React from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { RowBetween } from '../../components/Row'
import { TYPE } from '../../theme'
import { HighlightCard, CardSection } from '../../components/earn/styled'
import { useMCOINBarStats } from '../../state/stakeMCO/hooks'
import { useFetchMCOINBarAPR } from '../../fetchers/bar'

const Card = styled(HighlightCard)`
  background: none;
  border: none;
`

const CardBackground = styled.span`
  background-image: linear-gradient(to right, ${({ theme }) => theme.primary4}, ${({ theme }) => theme.primary1}, ${({ theme }) => theme.primary4});
  background-position: 50% 100%;
  background-repeat: no-repeat;
  background-size: cover;
  mix-blend-mode: overlay;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
`

export default function StakingAPRCard() {
  const { xmcoinToMCOINRatio: xmcoToMCORatio } = useMCOINBarStats()
  const apr = useFetchMCOINBarAPR()

  const xmcoToMCORatioFormatted = xmcoToMCORatio?.toFixed(6)
  const ratioText = xmcoToMCORatioFormatted == null ? 'Loading...' : `1 xMC = ${xmcoToMCORatioFormatted} MCOIN`

  return (
    <Card>
      <CardBackground />
      <CardSection>
        <AutoColumn gap="md">
          <RowBetween>
            <AutoColumn gap="sm" justify="start">
              <TYPE.mediumHeader color="white" fontWeight={600}>
                Staking APR
              </TYPE.mediumHeader>
              <TYPE.subHeader color="white">{ratioText}</TYPE.subHeader>
            </AutoColumn>
            <AutoColumn gap="sm" justify="end">
              <TYPE.largeHeader color="white">{apr == null ? 'Loading...' : `${apr?.toFixed(2)}%`}</TYPE.largeHeader>
              <TYPE.subHeader color="white">Yesterday's APR</TYPE.subHeader>
            </AutoColumn>
          </RowBetween>
        </AutoColumn>
      </CardSection>
    </Card>
  )
}
