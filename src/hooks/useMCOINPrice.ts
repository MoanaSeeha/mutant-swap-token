import { ChainId, Fraction, JSBI } from '@mutantswap/sdk'
import { MCOIN, USDC, fUSDC } from '../constants'
import { useCallback, useMemo } from 'react'
import IUniswapV2Pair_ABI from '../constants/abis/polygon/IUniswapV2Pair.json'
import { useBlockNumber } from '../state/application/hooks'
import { useMCOINWNEARPoolContract as useMCOINWNEARPoolContract, useUSDCWNEARPoolContract } from './useContract'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { Interface } from '@ethersproject/abi'
import { BigNumber } from 'ethers'

type Result = {
  getMCOINPrice: () => Fraction | null
  mcoinPriceFriendly: string | null
}

export default function useMCOINPrice(): Result {
  const wnearMCOINContract = useMCOINWNEARPoolContract() // Token0: WNEAR; Token1: MCOIN
  const wnearUsdcContract = useUSDCWNEARPoolContract() // Token0: MCOIN; Token1: WNEAR
  const [wnearMCOINContractCall, wnearUsdcContractCall] = useMultipleContractSingleData(
    [wnearMCOINContract?.address ?? undefined, wnearUsdcContract?.address ?? undefined],
    new Interface(IUniswapV2Pair_ABI),
    'getReserves'
  )
  const latestBlock = useBlockNumber()

  const [wnearUsdcContractReserves, wnearMCOINContractReserves] = [
    wnearUsdcContractCall.result,
    wnearMCOINContractCall.result
  ]

  const wnearUSDCPairReserves__usdc: BigNumber = wnearUsdcContractReserves?.[0] ?? null
  const wnearUSDCPairReserves__wnear: BigNumber = wnearUsdcContractReserves?.[1] ?? null
  const wnearMCOINPairReserves__wnear: BigNumber = wnearMCOINContractReserves?.[1] ?? null
  const wnearMCOINPairReserves__mcoin: BigNumber = wnearMCOINContractReserves?.[0] ?? null

  const isLoading = [
    wnearUSDCPairReserves__usdc,
    wnearUSDCPairReserves__wnear,
    wnearMCOINPairReserves__wnear,
    wnearMCOINPairReserves__mcoin
  ].some(v => v == null)

  const getMCOINPrice = useCallback(() => {
    if (isLoading) {
      return null
    }

    // USDC contract uses 6 decimals
    // MCOIN and wNEAR use 18 decimals
    // Multiply USDC balance by 10^(18-6) to normalize
    const normalizedUSDCRatio = JSBI.multiply(
      JSBI.BigInt(wnearUSDCPairReserves__usdc),
      JSBI.BigInt(10 ** (MCOIN[ChainId.AURORA].decimals - fUSDC[ChainId.AURORA].decimals))
    )

    // USDC/NEAR
    const usdcToWnearRatio = new Fraction(normalizedUSDCRatio, wnearUSDCPairReserves__wnear.toString())

    // MCOIN/NEAR
    const WnearToMCOINRatio = new Fraction(wnearMCOINPairReserves__mcoin.toString(), wnearMCOINPairReserves__wnear.toString())

    // USDC/NEAR / MCOIN/NEAR => USDC/MCOIN
    // Price is USDC/MCOIN (where MCOIN = 1)
    const result = usdcToWnearRatio.divide(WnearToMCOINRatio)

    return result
  }, [
    isLoading,
    wnearUSDCPairReserves__usdc,
    wnearUSDCPairReserves__wnear,
    wnearMCOINPairReserves__wnear,
    wnearMCOINPairReserves__mcoin,
    latestBlock
  ])

  const mcoinPriceFriendly = useMemo(() => getMCOINPrice()?.toFixed(2) ?? null, [getMCOINPrice, latestBlock])

  return { getMCOINPrice: getMCOINPrice, mcoinPriceFriendly: mcoinPriceFriendly }
}
