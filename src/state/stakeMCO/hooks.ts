import { ChainId, CurrencyAmount } from '@mutantswap/sdk'

import { useCallback } from 'react'
import { useTransactionAdder } from '../transactions/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useContract } from '../stake/hooks-sushi'
import { Contract } from '@ethersproject/contracts'
import { abi as MCBAR_ABI } from '../../constants/abis/MCBar.json'
import { MCOIN, XMCOIN } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useTokenBalance } from '../wallet/hooks'

export function useMCOINBar() {
  const addTransaction = useTransactionAdder()
  const barContract = useMCOINBarContract()

  const enter = useCallback(
    async (amount: CurrencyAmount | undefined) => {
      if (amount?.raw) {
        const tx = await barContract?.enter(amount?.raw.toString())
        return addTransaction(tx, { summary: 'Enter MCBar' })
      }
    },
    [addTransaction, barContract]
  )

  const leave = useCallback(
    async (amount: CurrencyAmount | undefined) => {
      if (amount?.raw) {
        const tx = await barContract?.leave(amount?.raw.toString())
        return addTransaction(tx, { summary: 'Leave MCBars' })
      }
    },
    [addTransaction, barContract]
  )

  return { enter, leave }
}

export function useMCOINBarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && XMCOIN[chainId].address, MCBAR_ABI, withSignerIfPossible)
}

export function useMCOINBarStats() {
  const chainId = ChainId.AURORA
  const totalXMCOIN = useTotalSupply(XMCOIN[chainId])
  const totalMCOINStaked = useTokenBalance(XMCOIN[chainId].address, MCOIN[chainId])

  const xmcoinToMCOINRatio = totalMCOINStaked != null && totalXMCOIN != null && parseInt(totalXMCOIN?.toExact()) > 0 ? totalMCOINStaked.divide(totalXMCOIN) : null
  const mcoinToXMCOINRatio = totalMCOINStaked != null && totalXMCOIN != null && parseInt(totalMCOINStaked?.toExact()) > 0 ? totalXMCOIN.divide(totalMCOINStaked) : null

  return {
    totalMCOINStaked: totalMCOINStaked,
    totalXMCOIN: totalXMCOIN,
    mcoinToXMCOINRatio: mcoinToXMCOINRatio,
    xmcoinToMCOINRatio: xmcoinToMCOINRatio
  }
}
