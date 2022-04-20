import React from 'react'
import {
  Container,
  LeftContainer,
  Content,
  BackImg,
  TitleSection,
  RightContainer,
  StatusAlert,
  ConnectWallet,
  ApproveButton,
  ClaimButton
} from './styleds'

import back from '../../assets/images/claim_back.png'
import lightCoinImg from '../../assets/images/light_coin.png'
import darkCoinImg from '../../assets/images/dark_coin.png'
import Web3Status from '../../components/Web3Status'
import { useWeb3React } from '@web3-react/core'
import { useTokenBalance } from '../../state/wallet/hooks'
import { rMC, CLAIM_ADDRESS } from '../../constants'
import { ApprovalState, ClaimState, useApproveCallback, useClaimCallback } from '../../hooks/useApproveCallback'
import { ChainId } from '@mutantswap/sdk'

export default function Claim() {
  const { account } = useWeb3React()
  const chainId = ChainId.AURORA
  const rMCBalance = useTokenBalance(account ?? undefined, rMC[chainId])
  const balance = rMCBalance?.toExact() ?? 0
  const [approvalRMC, approveRMCCallback] = useApproveCallback(rMCBalance, CLAIM_ADDRESS[chainId])
  const [claimRMC, claimRMCCallback] = useClaimCallback(rMCBalance, CLAIM_ADDRESS[chainId])
  return (
    <>
      <Container>
        <LeftContainer>
          <img src={darkCoinImg} />
        </LeftContainer>
        <Content>
          <BackImg>
            <img src={back} />
          </BackImg>

          <TitleSection>
            <h1>Claim $MCOIN</h1>
            Claim your MCOIN by burning rMC at a 1:1 ratio.
          </TitleSection>
          <StatusAlert>
            {balance == '0' && account ? (
              <p>⚠️ Sorry, you do not own any rMC</p>
            ) : !account ? (
              <ConnectWallet>
                <Web3Status />
              </ConnectWallet>
            ) : approvalRMC !== ApprovalState.APPROVED ? (
              <ApproveButton onClick={approveRMCCallback}>Approve</ApproveButton>
            ) : claimRMC === ClaimState.CLAIMED ? (
              <p>✅️ Claim success</p>
            ) : claimRMC === ClaimState.NOT_CLAIMED ? (
              <>
                <p>❌️ Your transaction did not go through, please try again or contact mods in Discord</p>
                <ClaimButton onClick={claimRMCCallback}>Claim</ClaimButton>
              </>
            ) : (
              <ClaimButton onClick={claimRMCCallback}>Claim</ClaimButton>
            )}
          </StatusAlert>
        </Content>
        <RightContainer>
          <img src={lightCoinImg} />
        </RightContainer>
      </Container>
    </>
  )
}
