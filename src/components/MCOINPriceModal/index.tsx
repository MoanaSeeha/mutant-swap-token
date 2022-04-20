import styled, { css } from 'styled-components'
import { ChainId } from '@mutantswap/sdk'
import { MCOIN } from '../../constants'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleMCOINPriceModal } from '../../state/application/hooks'
import Modal from '../Modal'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { ExternalLink, TYPE } from '../../theme'
import { isMobile } from 'react-device-detect'
import React from 'react'
import { AutoRow } from '../Row'
import { AutoColumn } from '../Column'
import useMCOINPrice from '../../hooks/useMCOINPrice'
import CirculatingSupplyMarketCap from './CirculatingSupplyMarketCap'
import { useTotalSupply } from '../../data/TotalSupply'
import LogoDark from '../../assets/images/mutant-coin-logo.png'


const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div<{ mobile: boolean }>`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};

  ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
      width:  85vw;
      ${mobile &&
        css`
          width: 100vw;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `}
    `}
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const Link = styled(ExternalLink)`
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }
`

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

export default function MCOINPriceModal() {
  const isModalOpen = useModalOpen(ApplicationModal.MCOIN_PRICE)
  const toggleWalletModal = useToggleMCOINPriceModal()
  const { getMCOINPrice: getMCOINPrice, mcoinPriceFriendly: mcoinPriceFriendly } = useMCOINPrice()
  const totalMCOIN = useTotalSupply(MCOIN[ChainId.AURORA])

  return (
    <Modal isOpen={isModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow color="blue">MutantCoin Token</HeaderRow>
          <ContentWrapper mobile={isMobile}>
            <AutoRow>
              <AutoColumn>
                <IconWrapper size={32}>
                  <img
                    src={
                      LogoDark
                    }
                  />
                </IconWrapper>
              </AutoColumn>
              <AutoColumn style={{ padding: '0 .75em', flex: '1 1 0%' }}>
                <AutoRow>
                  <TYPE.largeHeader>MCOIN</TYPE.largeHeader>
                </AutoRow>
              </AutoColumn>
              <AutoColumn>
                <TYPE.mediumHeader fontWeight={500}>
                  {mcoinPriceFriendly != null ? `$${mcoinPriceFriendly}` : '-'}
                </TYPE.mediumHeader>
              </AutoColumn>
            </AutoRow>
            <CirculatingSupplyMarketCap totalMCOIN={totalMCOIN} mcoinPrice={getMCOINPrice()} />
            <AutoRow align="center" justify="space-around" padding="1rem 0 0 0">
              <Link href="https://explorer.mainnet.aurora.dev/token/0x00a4d2C1754A0d276dCc26EC4B6d7052fb0DBd73"> {/* TODO: Change MS token */}
                Contract
              </Link>
              <Link href="https://dexscreener.com/aurora/0x00a4d2C1754A0d276dCc26EC4B6d7052fb0DBd73">DEX Screener</Link> {/* TODO: Change MS LP token */}
              <Link href="https://geckoterminal.com/aurora/pools/0x00a4d2C1754A0d276dCc26EC4B6d7052fb0DBd73"> {/* TODO: Change MS LP token */}
                Gecko Terminal
              </Link>
            </AutoRow>
          </ContentWrapper>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
