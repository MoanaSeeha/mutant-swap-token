import React, { useMemo } from 'react'
import {
  Bio,
  LogoContainer,
  LogoTitle,
  MainAssets,
  Price,
  PriceContent1,
  PriceContent2,
  PriceContent3,
  PriceContent4,
  Brand,
  Brand1,
  Brand2,
  BrandImg,
  BrandItem1,
  BrandItem2,
  BrandItem3,
  BrandItem4,
  BrandItem5,
  BrandItem6,
  BrandItem7,
  Footer,
  IconImg
} from './styleds'

import whiteLogo from '../../assets/images/welcome/logo_white.png'
import smartPadIcon from '../../assets/images/welcome/1.png'
import nearPadIcon from '../../assets/images/welcome/2.png'
import auroraIcon from '../../assets/images/welcome/3.png'
import rainbowIcon from '../../assets/images/welcome/4.png'
import nearIcon from '../../assets/images/welcome/5.png'
import awesomeNearIcon from '../../assets/images/welcome/6.png'
import bigBrainIcon from '../../assets/images/welcome/7.png'
import discordIcon from '../../assets/images/welcome/Discord.png'
import githubIcon from '../../assets/images/welcome/Github.png'
import instagramIcon from '../../assets/images/welcome/Instagram.png'
import mediumIcon from '../../assets/images/welcome/Medium.png'
import twitterIcon from '../../assets/images/welcome/twitter.png'
import mainAssets from '../../assets/images/welcome/main_page_assets.png'
import useMCOINPrice from '../../hooks/useMCOINPrice'
import { MCOIN } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { ChainId, Fraction, JSBI, TokenAmount } from '@mutantswap/sdk'
import { addCommasToNumber } from '../../utils'
import { useFarms } from '../../state/stake/apr'
import { BIG_INT_ZERO } from '../../constants'

const LOCKED_MCOIN = JSBI.BigInt(165000000)

export default function Welcome() {
  const { getMCOINPrice: getMCOINPrice, mcoinPriceFriendly: mcoPriceFriendly } = useMCOINPrice()
  const totalMCOIN = useTotalSupply(MCOIN[ChainId.AURORA])
  const isLoading = totalMCOIN == null || getMCOINPrice == null
  const circulating = useMemo(() => (isLoading ? null : JSBI.subtract(JSBI.BigInt(totalMCOIN!.toFixed(0)), LOCKED_MCOIN)), [
    isLoading,
    totalMCOIN
  ])

  const marketCap = useMemo(
    () => (isLoading ? null : new Fraction(circulating!, '1').multiply(getMCOINPrice()!).toFixed(0)),
    [isLoading, circulating, getMCOINPrice]
  )
  const circulatingFriendly = addCommasToNumber(isLoading ? '0.00' : circulating?.toString() ?? '0.00')
  const marketCapFriendly = isLoading ? '$0.00' : `$${addCommasToNumber(marketCap!)}`

  const farmTVL = useFarms().reduce((acc, farm) => JSBI.add(acc, JSBI.BigInt(farm.totalStakedInUSD)), BIG_INT_ZERO)
  const farmTVLFriendly = JSBI.GE(farmTVL, BIG_INT_ZERO) ? `$${addCommasToNumber(farmTVL.toString())}` : '-'

  return (
    <>
      <Bio>
        <LogoContainer>
          <img src={whiteLogo} />
        </LogoContainer>
        <LogoTitle>Mutant Swap</LogoTitle>
        <div>Trade, borrow, lend and earn with your crypto assets</div>
      </Bio>
      <MainAssets>
        <img src={mainAssets} />
      </MainAssets>
      <Price>
        <PriceContent1>
          <div>{farmTVLFriendly}</div>
          <p>Total Value Locked</p>
        </PriceContent1>
        <PriceContent2>
          <div>{mcoPriceFriendly != null ? `$${mcoPriceFriendly}` : '$0.00'}</div>
          <p>MutantCoin Price</p>
        </PriceContent2>

        <PriceContent3>
          <div>{marketCapFriendly}</div>
          <p>Market Cap</p>
        </PriceContent3>
        <PriceContent4>
          <div>{circulatingFriendly}</div>
          <p>Circulating Supply</p>
        </PriceContent4>
      </Price>
      <Brand>
        <a href="https://rainbowbridge.app/transfer" target="_blank" rel="noreferrer">
          <BrandImg src={rainbowIcon} alt="" />
        </a>
        <a href="https://smartpad.network/" target="_blank" rel="noreferrer">
          <BrandImg src={smartPadIcon} alt="" />
        </a>
        <a href="https://near.org/" target="_blank" rel="noreferrer">
          <BrandImg src={nearIcon} alt="" />
        </a>
        <a href="https://aurora.dev/" target="_blank" rel="noreferrer">
          <BrandImg src={auroraIcon} alt="" />
        </a>
        {/* <a href="https://www.bigbrain.holdings/" target="_blank" rel="noreferrer">
          <BrandImg src={bigBrainIcon} alt="" />
        </a> */}
        {/* <a href="https://nearpad.io/" target="_blank" rel="noreferrer">
          <BrandImg src={nearPadIcon} alt="" />
        </a> */}
        <a href="https://awesomenear.com/mutantswap" target="_blank" rel="noreferrer">
          <BrandImg src={awesomeNearIcon} alt="" />
        </a>
      </Brand>
      <Brand1>
        <BrandItem1>
          <a href="https://rainbowbridge.app/transfer" target="_blank" rel="noreferrer">
            <BrandImg src={rainbowIcon} alt="" />
          </a>
        </BrandItem1>
        <BrandItem2>
          <a href="https://smartpad.network/" target="_blank" rel="noreferrer">
            <BrandImg src={smartPadIcon} alt="" />
          </a>
        </BrandItem2>
        <BrandItem3>
          <a href="https://near.org/" target="_blank" rel="noreferrer">
            <BrandImg src={nearIcon} alt="" />
          </a>
        </BrandItem3>
      </Brand1>
      <Brand2>
        <BrandItem4>
          <a href="https://aurora.dev/" target="_blank" rel="noreferrer">
            <BrandImg src={auroraIcon} alt="" />
          </a>
        </BrandItem4>
        {/* <BrandItem5>
          <a href="https://www.bigbrain.holdings/" target="_blank" rel="noreferrer">
            <BrandImg src={bigBrainIcon} alt="" />
          </a>
        </BrandItem5> */}
        {/* <BrandItem6>
          <a href="https://nearpad.io/" target="_blank" rel="noreferrer">
            <BrandImg src={nearPadIcon} alt="" />
          </a>
        </BrandItem6> */}
        <BrandItem7>
          <a href="https://awesomenear.com/mutantswap">
            <BrandImg src={awesomeNearIcon} alt="" />
          </a>
        </BrandItem7>
      </Brand2>
      <Footer>
        <a href="https://twitter.com/MutantPunksNFT" target="_blank" rel="noreferrer">
          <IconImg src={twitterIcon} alt="" className="cursor-pointer" />
        </a>
        <a href="https://instagram.com/MutantPunksNFT" target="_blank" rel="noreferrer">
          <IconImg src={instagramIcon} alt="" className="cursor-pointer" />
        </a>
        <a href="https://mutantlabs.medium.com/" target="_blank" rel="noreferrer">
          <IconImg src={mediumIcon} alt="" className="cursor-pointer" />
        </a>
        <a href="https://discord.gg/4qCj7CWgT6" target="_blank" rel="noreferrer">
          <IconImg src={discordIcon} alt="" className="cursor-pointer" />
        </a>
        <a href="https://github.com/Mutant-Labs" target="_blank" rel="noreferrer">
          <IconImg src={githubIcon} alt="" className="cursor-pointer" />
        </a>
      </Footer>
    </>
  )
}
