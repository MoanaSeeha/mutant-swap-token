# MutantSwap Interface

An open source interface for MutantSwap -- a community-driven decentralized exchange for Aurora and Ethereum assets with fast settlement, low transaction fees, and a democratic distribution -- powered by Aurora.

- Website: [https://www.mutantswap.finance/](https://www.mutantswap.finance/)
- Discord: [MutantLabs](https://discord.gg/BZjhYjqSp4)
- Twitter: [@MutantPunksNFT](https://twitter.com/mutantpunksnft)


## Accessing the MutantSwap Interface

Visit [https://www.mutantswap.finance/](https://mutantswap.finance/)

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to your JSON-RPC provider

## Attribution
This code was adapted from this Uniswap repo: [uniswap-interface](https://github.com/Uniswap/uniswap-interface).
