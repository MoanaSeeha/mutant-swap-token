import { ChainId, Token } from '@mutantswap/sdk'

type Props = {
  lpAddress: string
  token0: Token
  token1: Token
}

export default function useTLP({ lpAddress, token0, token1 }: Props) {
  return new Token(ChainId.AURORA, lpAddress, 18, 'MSLP', `MSLP ${token0?.symbol}-${token1?.symbol}`)
}
