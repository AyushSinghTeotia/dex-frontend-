import { ChainId } from 'quest-cyswap-sdk'
import { signERC2612Permit } from 'eth-permit'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import ReactGA from 'react-ga'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useCyyRollContract } from './useContract'
import LPToken from '../types/LPToken'

const useCyyRoll = (version: 'v1' | 'v2' = 'v2') => {
    const { chainId, library, account } = useActiveWeb3React()
    const cyyRoll = useCyyRollContract(version)
    const ttl = 60 * 20

    let from = ''

    if (chainId === ChainId.MAINNET) {
        from = 'Uniswap'
    } else if (chainId === ChainId.BSC) {
        from = 'PancakeSwap'
    }

    const migrate = useCallback(
        async (lpToken: LPToken, amount: ethers.BigNumber) => {
            if (cyyRoll) {
                const deadline = Math.floor(new Date().getTime() / 1000) + ttl
                const args = [
                    lpToken.tokenA.address,
                    lpToken.tokenB.address,
                    amount,
                    ethers.constants.Zero,
                    ethers.constants.Zero,
                    deadline
                ]

                const gasLimit = await cyyRoll.estimateGas.migrate(...args)
                const tx = cyyRoll.migrate(...args, {
                    gasLimit: gasLimit.mul(120).div(100)
                })

                ReactGA.event({
                    category: 'Migrate',
                    action: `${from}->Cyswap`,
                    label: 'migrate'
                })

                return tx
            }
        },
        [cyyRoll, ttl, from]
    )

    const migrateWithPermit = useCallback(
        async (lpToken: LPToken, amount: ethers.BigNumber) => {
            if (account && cyyRoll) {
                const deadline = Math.floor(new Date().getTime() / 1000) + ttl
                const permit = await signERC2612Permit(
                    library,
                    lpToken.address,
                    account,
                    cyyRoll.address,
                    amount.toString(),
                    deadline
                )
                const args = [
                    lpToken.tokenA.address,
                    lpToken.tokenB.address,
                    amount,
                    ethers.constants.Zero,
                    ethers.constants.Zero,
                    deadline,
                    permit.v,
                    permit.r,
                    permit.s
                ]

                console.log('migrate with permit', args)

                const gasLimit = await cyyRoll.estimateGas.migrateWithPermit(...args)
                const tx = await cyyRoll.migrateWithPermit(...args, {
                    gasLimit: gasLimit.mul(120).div(100)
                })

                ReactGA.event({
                    category: 'Migrate',
                    action: `${from}->Sushiswap`,
                    label: 'migrateWithPermit'
                })

                return tx
            }
        },
        [account, library, cyyRoll, ttl, from]
    )

    return {
        migrate,
        migrateWithPermit
    }
}

export default useCyyRoll
