import useSWR from 'swr'

async function fetcher() {
  const response = await fetch('https://raw.githubusercontent.com/mutantswap/apr/main/xmc.json') //TODO: change to mainnet url for xMC

  return response.json()
}

async function getMCOINBarAPR() {
  const { apr } = (await fetcher()) ?? {}

  return apr
}

export function useFetchMCOINBarAPR() {
  const { data } = useSWR(['useMCOINBarAPR'], getMCOINBarAPR)

  return data
}
