# CySwap Interface

[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for CySwap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [cyex.com](https://cyex.com/)
- Interface: [cyswap.netlify.app](https://cyswap.netlify.app/)
- Twitter: [@cyexch](https://twitter.com/cyexch)

## Accessing the CySwap Interface

To access the Cyswap Interface, use an IPFS gateway link from the
or visit [cyswap.netlify.app](https://cyswap.netlify.app/).

## Listing a token

Please see the
[quest-cyswap-default-token-list]
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

Note that the interface only works on networks where both
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.**
CI checks will run against all PRs.
