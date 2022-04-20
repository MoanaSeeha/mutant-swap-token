import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@pangolindex/web3-react-injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1313161554')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  defaultChainId: NETWORK_CHAIN_ID
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [NETWORK_CHAIN_ID ?? 1313161554]
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'MutantSwap',
  appLogoUrl: 'https://raw.githubusercontent.com/jirosaito/tokens/main/assets/0xADb5BDd6f24e0AF7896ae2825B98dcaA1109B82f/logo.png'
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1313161555: NETWORK_URL //TODO: check mainnet chainid 1313161554 on launch
  },
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org'
})
