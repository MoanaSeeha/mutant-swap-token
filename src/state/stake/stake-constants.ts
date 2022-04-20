import { ChainId, Token, TokenAmount, WETH, JSBI } from '@mutantswap/sdk'
import {
  USDC,
  AAVE,
  DAI,
  ZERO_ADDRESS,
  WNEAR,
  fNEAR,
  fUSDC,
  USDT,
  WBTC,
  MCOIN,
  AURORA,
  LUNA,
  UST,
  BNB,
  AVAX,
  MATIC,
  FLX,
  MECHA
} from '../../constants'
import { useMasterChefContract, MASTERCHEF_ADDRESS_V1, MASTERCHEF_ADDRESS_V2 } from './hooks-sushi'

export enum ChefVersions {
  V1,
  V2
}

export type StakingMCOIN = StakingMCOINStakedAmounts & StakingMCOINFarms

export type StakingMCOINStakedAmounts = {
  ID: number
  stakedAmount: TokenAmount | null
}
export type StakingMCOINFarms = {
  ID: number
  poolId: number
  tokens: [Token, Token]
  stakingRewardAddress: string
  lpAddress: string
  rewarderAddress: string
  isPeriodFinished: boolean
  earnedAmount: TokenAmount
  doubleRewardAmount: TokenAmount
  totalStakedAmount: TokenAmount
  totalStakedInUSD: number
  allocPoint: number
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: number
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  apr: number
  apr2: number
  chefVersion: ChefVersions
  doubleRewards: boolean
  inStaging: boolean
  noMCOINRewards: boolean
  doubleRewardToken: Token
}

export interface ExternalInfo {
  id: number
  lpAddress: string
  totalSupply: number
  totalStaked: number
  totalStakedInUSD: number
  totalRewardRate: number
  allocPoint: number
  apr: number
  apr2: number
}

const dummyToken = new Token(ChainId.AURORA, ZERO_ADDRESS, 18, 'ZERO', 'ZERO')

const dummyAmount = new TokenAmount(dummyToken, '0')

export const rewardsPerSecond = JSBI.BigInt('10000000000000000000')
export const totalAllocPoints = JSBI.BigInt('5')
export const tokenAmount = new TokenAmount(dummyToken, '99')

const POLYGON_POOLS: StakingMCOIN[] = [
  {
    ID: 0,
    poolId: 0,
    tokens: [DAI[ChainId.POLYGON], USDC[ChainId.POLYGON]],
    stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.POLYGON],
    lpAddress: '0xd6f922f6eB4dfa47f53C038c7dE9bE614a49257f',
    rewarderAddress: '',
    isPeriodFinished: false,
    stakedAmount: dummyAmount,
    earnedAmount: dummyAmount,
    doubleRewardAmount: dummyAmount,
    totalStakedAmount: dummyAmount,
    totalStakedInUSD: 0,
    allocPoint: 1,
    totalRewardRate: 1,
    rewardRate: dummyAmount,
    apr: 0,
    apr2: 0,
    chefVersion: ChefVersions.V1,
    doubleRewards: false,
    inStaging: false,
    noMCOINRewards: false,
    doubleRewardToken: dummyToken
  },
  {
    ID: 1,
    poolId: 1,
    tokens: [AAVE[ChainId.POLYGON], DAI[ChainId.POLYGON]],
    stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.POLYGON],
    lpAddress: '0x76F4128B11f429289499BA29518Ef7E5b26025B6',
    rewarderAddress: '',
    isPeriodFinished: false,
    stakedAmount: dummyAmount,
    earnedAmount: dummyAmount,
    doubleRewardAmount: dummyAmount,
    totalStakedAmount: dummyAmount,
    totalStakedInUSD: 0,
    allocPoint: 1,
    totalRewardRate: 1,
    rewardRate: dummyAmount,
    apr: 0,
    apr2: 0,
    chefVersion: ChefVersions.V1,
    doubleRewards: false,
    inStaging: false,
    noMCOINRewards: false,
    doubleRewardToken: dummyToken
  }
]

const AURORA_POOLS: StakingMCOIN[] = [
  {
    ID: 0,
    poolId: 0,
    tokens: [MCOIN[ChainId.AURORA], fNEAR[ChainId.AURORA]],
    stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
    lpAddress: '0x00dbf792f23D162Bcf84F9BC979CAc15025D9F8c',
    rewarderAddress: '',
    isPeriodFinished: false,
    stakedAmount: dummyAmount,
    earnedAmount: dummyAmount,
    doubleRewardAmount: dummyAmount,
    totalStakedAmount: dummyAmount,
    totalStakedInUSD: 0,
    allocPoint: 1,
    totalRewardRate: 1,
    rewardRate: dummyAmount,
    apr: 0,
    apr2: 0,
    chefVersion: ChefVersions.V1,
    doubleRewards: false,
    inStaging: false,
    noMCOINRewards: false,
    doubleRewardToken: dummyToken
  },
  {
    ID: 1,
    poolId: 1,
    tokens: [fUSDC[ChainId.AURORA], fNEAR[ChainId.AURORA]],
    stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
    lpAddress: '0x433FCcF7df0A8b8c31A31C74A6EA917aAB520d70',
    rewarderAddress: '',
    isPeriodFinished: false,
    stakedAmount: dummyAmount,
    earnedAmount: dummyAmount,
    doubleRewardAmount: dummyAmount,
    totalStakedAmount: dummyAmount,
    totalStakedInUSD: 0,
    allocPoint: 1,
    totalRewardRate: 1,
    rewardRate: dummyAmount,
    apr: 0,
    apr2: 0,
    chefVersion: ChefVersions.V1,
    doubleRewards: false,
    inStaging: false,
    noMCOINRewards: false,
    doubleRewardToken: dummyToken
  },
  {
    ID: 2,
    poolId: 2,
    tokens: [fUSDC[ChainId.AURORA], MCOIN[ChainId.AURORA]],
    stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
    lpAddress: '0xd2D3EB8Ee7341B8a6AF8C499CF3DeC6c0a45fF27',
    rewarderAddress: '',
    isPeriodFinished: false,
    stakedAmount: dummyAmount,
    earnedAmount: dummyAmount,
    doubleRewardAmount: dummyAmount,
    totalStakedAmount: dummyAmount,
    totalStakedInUSD: 0,
    allocPoint: 1,
    totalRewardRate: 1,
    rewardRate: dummyAmount,
    apr: 0,
    apr2: 0,
    chefVersion: ChefVersions.V1,
    doubleRewards: false,
    inStaging: false,
    noMCOINRewards: false,
    doubleRewardToken: dummyToken
  }
]

// const AURORA_POOLS: StakingMCO[] = [
//   {
//     ID: 0,
//     poolId: 0,
//     tokens: [WETH[ChainId.AURORA], WNEAR[ChainId.AURORA]],
//     stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
//     lpAddress: '0x63da4DB6Ef4e7C62168aB03982399F9588fCd198',
//     rewarderAddress: '',
//     isPeriodFinished: false,
//     stakedAmount: dummyAmount,
//     earnedAmount: dummyAmount,
//     doubleRewardAmount: dummyAmount,
//     totalStakedAmount: dummyAmount,
//     totalStakedInUSD: 0,
//     allocPoint: 1,
//     totalRewardRate: 1,
//     rewardRate: dummyAmount,
//     apr: 0,
//     apr2: 0,
//     chefVersion: ChefVersions.V1,
//     doubleRewards: false,
//     inStaging: false,
//     noMCOINRewards: false,
//     doubleRewardToken: dummyToken
//   },
//   {
//     ID: 1,
//     poolId: 1,
//     tokens: [MCOIN[ChainId.AURORA], WNEAR[ChainId.AURORA]],
//     stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
//     lpAddress: '0x43413cAB62F19e2B347dC50504bf21fE0DCE3790',
//     rewarderAddress: '',
//     isPeriodFinished: false,
//     stakedAmount: dummyAmount,
//     earnedAmount: dummyAmount,
//     doubleRewardAmount: dummyAmount,
//     totalStakedAmount: dummyAmount,
//     totalStakedInUSD: 0,
//     allocPoint: 1,
//     totalRewardRate: 1,
//     rewardRate: dummyAmount,
//     apr: 0,
//     apr2: 0,
//     chefVersion: ChefVersions.V1,
//     doubleRewards: false,
//     inStaging: false,
//     noMCOINRewards: false,
//     doubleRewardToken: dummyToken
//   },
//   {
//     ID: 2,
//     poolId: 2,
//     tokens: [USDC[ChainId.AURORA], WNEAR[ChainId.AURORA]],
//     stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
//     lpAddress: '0x62c1e1dadEbDEDa9FF397a48239D2D0a1E4E71C8',
//     rewarderAddress: '',
//     isPeriodFinished: false,
//     stakedAmount: dummyAmount,
//     earnedAmount: dummyAmount,
//     doubleRewardAmount: dummyAmount,
//     totalStakedAmount: dummyAmount,
//     totalStakedInUSD: 0,
//     allocPoint: 1,
//     totalRewardRate: 1,
//     rewardRate: dummyAmount,
//     apr: 0,
//     apr2: 0,
//     chefVersion: ChefVersions.V1,
//     doubleRewards: false,
//     inStaging: false,
//     noMCOINRewards: false,
//     doubleRewardToken: dummyToken
//   },
//   {
//     ID: 3,
//     poolId: 3,
//     tokens: [MCOIN[ChainId.AURORA], fNEAR[ChainId.AURORA]],
//     stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
//     lpAddress: '0x0348fA0B2289beFa36956F3C95135572C2bc61B3',
//     rewarderAddress: '',
//     isPeriodFinished: false,
//     stakedAmount: dummyAmount,
//     earnedAmount: dummyAmount,
//     doubleRewardAmount: dummyAmount,
//     totalStakedAmount: dummyAmount,
//     totalStakedInUSD: 0,
//     allocPoint: 1,
//     totalRewardRate: 1,
//     rewardRate: dummyAmount,
//     apr: 0,
//     apr2: 0,
//     chefVersion: ChefVersions.V1,
//     doubleRewards: false,
//     inStaging: false,
//     noMCOINRewards: false,
//     doubleRewardToken: dummyToken
//   },
//   {
//     ID: 4,
//     poolId: 4,
//     tokens: [fUSDC[ChainId.AURORA], fNEAR[ChainId.AURORA]],
//     stakingRewardAddress: MASTERCHEF_ADDRESS_V1[ChainId.AURORA],
//     lpAddress: '0xA6335CCdAa874bb9E0cffDdA4e49F3186435B320',
//     rewarderAddress: '',
//     isPeriodFinished: false,
//     stakedAmount: dummyAmount,
//     earnedAmount: dummyAmount,
//     doubleRewardAmount: dummyAmount,
//     totalStakedAmount: dummyAmount,
//     totalStakedInUSD: 0,
//     allocPoint: 1,
//     totalRewardRate: 1,
//     rewardRate: dummyAmount,
//     apr: 0,
//     apr2: 0,
//     chefVersion: ChefVersions.V1,
//     doubleRewards: false,
//     inStaging: false,
//     noMCOINRewards: false,
//     doubleRewardToken: dummyToken
//   }
// ]

const NULL_POOLS: StakingMCOIN[] = [
  {
    ID: 0,
    poolId: 0,
    tokens: [
      new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'ZERO', 'ZERO'),
      new Token(ChainId.FUJI, ZERO_ADDRESS, 18, 'ZERO', 'ZERO')
    ],
    stakingRewardAddress: ZERO_ADDRESS,
    lpAddress: ZERO_ADDRESS,
    rewarderAddress: '',
    isPeriodFinished: false,
    stakedAmount: dummyAmount,
    earnedAmount: dummyAmount,
    doubleRewardAmount: dummyAmount,
    totalStakedAmount: dummyAmount,
    totalStakedInUSD: 0,
    allocPoint: 0,
    totalRewardRate: 1,
    rewardRate: dummyAmount,
    apr: 0,
    apr2: 0,
    chefVersion: ChefVersions.V1,
    doubleRewards: false,
    inStaging: false,
    noMCOINRewards: false,
    doubleRewardToken: dummyToken
  }
]

export const STAKING: {
  [chainid in ChainId]: StakingMCOIN[]
} = {
  [ChainId.FUJI]: NULL_POOLS,
  [ChainId.AVALANCHE]: NULL_POOLS,
  [ChainId.POLYGON]: POLYGON_POOLS,
  [ChainId.AURORA]: AURORA_POOLS
}

export const ADDRESS_PRICE_MAP: { [key: string]: string } = {
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': 'dai',
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': 'usd-coin',
  '0xD6DF932A45C0f255f85145f286eA0b292B21C90B': 'aave'
}
