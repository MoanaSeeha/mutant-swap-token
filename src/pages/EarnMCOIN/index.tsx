import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'lodash'
import { Text } from 'rebass'
import { ChevronDown, ChevronUp } from 'react-feather'

import { AutoColumn } from '../../components/Column'

import { PageWrapper } from '../../components/Page'
import PoolCardMCOIN from '../../components/earn/PoolCardMCOIN'
import FarmBanner from '../../components/earn/FarmBanner'
import Toggle from '../../components/Toggle'

import { useFarms } from '../../state/stake/apr'
import { StakingMCOIN } from '../../state/stake/stake-constants'
import { useIsFilterActiveFarms, useToggleFilterActiveFarms } from '../../state/user/hooks'

import { TYPE } from '../../theme'
import { isTokenAmountPositive } from '../../utils/pools'

import {
  PoolSection,
  DataRow,
  StyledSearchInput,
  StyledFiltersContainer,
  StyledToggleContainer,
  StyledSortContainer,
  StyledSortOption,
  StyledArrowContainer
} from './EarnMCOIN.styles'
import { TokenAmount } from '@mutantswap/sdk'

enum SortingType {
  liquidity = 'Liquidity',
  totalApr = 'Total APR',
  default = 'Default'
}

type SearchableTokenProps = { symbol: string | undefined; name: string | undefined; address: string }

const POOLS_ORDER = [0,1,2]

const MemoizedFarmBanner = React.memo(FarmBanner)
const MemoizedPoolCardMCOIN = React.memo(PoolCardMCOIN)

export default function Earn({
  match: {
    params: { version }
  }
}: RouteComponentProps<{ version: string }>) {
  const { t } = useTranslation()
  const allFarmArrs = useFarms()

  const toggleActiveFarms = useToggleFilterActiveFarms()
  const activeFarmsFilter = useIsFilterActiveFarms()

  const [sortBy, setSortBy] = useState<SortingType>(SortingType.default)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortDescending, setSortDescending] = useState<boolean>(true)

  const getSortedFarms = () => {
    switch (sortBy) {
      case SortingType.default:
        return POOLS_ORDER.map(index => allFarmArrs[index])
      case SortingType.liquidity:
        return sortDescending
          ? farmArrs.sort((a, b) => (a.totalStakedInUSD < b.totalStakedInUSD ? 1 : -1))
          : farmArrs.sort((a, b) => (a.totalStakedInUSD > b.totalStakedInUSD ? 1 : -1))
      case SortingType.totalApr:
        return sortDescending
          ? farmArrs.sort((a, b) => (a.apr + a.apr2 < b.apr + b.apr2 ? 1 : -1))
          : farmArrs.sort((a, b) => (a.apr + a.apr2 > b.apr + b.apr2 ? 1 : -1))
    }
  }

  const farmArrs = allFarmArrs
  const farmArrsInOrder = useMemo(() => getSortedFarms(), [sortBy, farmArrs])
  const nonDualRewardPools = farmArrsInOrder.filter(farm => !farm.doubleRewards && !farm.noMCOINRewards)

  const [currentFarms, setCurrentFarms] = useState<StakingMCOIN[]>(nonDualRewardPools)

  const dualRewardPools = farmArrsInOrder.filter(farm => farm.doubleRewards)
  const nonMCOINFarms = farmArrsInOrder.filter(farm => farm.noMCOINRewards)

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const input = event.target.value.toUpperCase()
    setSearchQuery(input)
  }

  const handleSort = (sortingType: SortingType) => {
    if (sortingType === sortBy) {
      setSortDescending(!sortDescending)
    } else {
      setSortBy(sortingType)
    }
  }

  const farmTokensIncludesQuery = ({ symbol, name, address }: SearchableTokenProps, query: string) => {
    return (
      symbol?.toUpperCase().includes(query) ||
      name?.toUpperCase().includes(query) ||
      (query.length > 5 && address?.toUpperCase().includes(query))
    )
  }

  const filterFarms = (farms: StakingMCOIN[], query: string) => {
    const farmsToFilter = activeFarmsFilter ? farms.filter(farm => isTokenAmountPositive(farm.stakedAmount)) : farms

    return farmsToFilter.filter(
      farm =>
        farm.tokens.some(({ symbol, name, address }) => farmTokensIncludesQuery({ symbol, name, address }, query)) ||
        (query.length > 5 && farm.lpAddress.toUpperCase().includes(query))
    )
  }

  const filteredFarms = useMemo(() => filterFarms(currentFarms, searchQuery), [
    currentFarms,
    searchQuery,
    activeFarmsFilter,
    sortBy
  ])

  useEffect(() => {
    const farmsToCompare = searchQuery.length || activeFarmsFilter ? farmArrsInOrder : nonDualRewardPools

    if (!isEqual(currentFarms, farmsToCompare)) {
      setCurrentFarms(farmsToCompare)
    }
  }, [farmArrs])

  const renderSortArrow = () => {
    return sortDescending ? <ChevronDown size={15} /> : <ChevronUp size={15} />
  }

  return (
    <PageWrapper gap="lg" justify="center">
      <MemoizedFarmBanner />
      <AutoColumn gap="lg" style={{ width: '100%' }}>
        <StyledSearchInput placeholder={t('earnPage.farmsSearchPlaceholder')} onChange={handleInput} />
        <StyledFiltersContainer>
          <StyledToggleContainer>
            <Text fontWeight={400} fontSize={16} marginRight={20}>
              {`${t('earnPage.filterUserPools')}: `}
            </Text>

            <Toggle id="toggle-user-farms-toggle" isActive={activeFarmsFilter} toggle={toggleActiveFarms} />
          </StyledToggleContainer>
          <StyledSortContainer>
            <Text fontWeight={400} fontSize={16}>
              Sort by:{' '}
              <StyledSortOption onClick={() => handleSort(SortingType.liquidity)}>
                {SortingType.liquidity}
                <StyledArrowContainer>{sortBy === SortingType.liquidity && renderSortArrow()}</StyledArrowContainer>
              </StyledSortOption>
              |
              <StyledSortOption style={{ marginLeft: '1rem' }} onClick={() => handleSort(SortingType.totalApr)}>
                {SortingType.totalApr}
                <StyledArrowContainer>{sortBy === SortingType.totalApr && renderSortArrow()}</StyledArrowContainer>
              </StyledSortOption>
            </Text>
          </StyledSortContainer>
        </StyledFiltersContainer>
      </AutoColumn>
      <AutoColumn gap="lg" style={{ width: '100%' }}>
        {!searchQuery.length && !activeFarmsFilter && (
          <DataRow style={{ alignItems: 'baseline' }}>
            <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>MutantCoin Pools</TYPE.mediumHeader>
          </DataRow>
        )}

        <PoolSection>
          {filteredFarms.map(farm => (
            <MemoizedPoolCardMCOIN
              key={farm.ID}
              apr={farm.apr}
              apr2={farm.apr2}
              chefVersion={farm.chefVersion}
              isPeriodFinished={farm.isPeriodFinished}
              token0={farm.tokens[0]}
              token1={farm.tokens[1]}
              totalStakedInUSD={farm.totalStakedInUSD}
              version={farm.ID}
              doubleRewards={farm.doubleRewards}
              inStaging={farm.inStaging}
              noMCOINRewards={farm.noMCOINRewards}
              doubleRewardToken={farm.doubleRewardToken}
              isStaking={isTokenAmountPositive(farm.stakedAmount)}
            />
          ))}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
