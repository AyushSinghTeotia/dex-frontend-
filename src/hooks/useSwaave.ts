import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import Fraction from '../entities/Fraction'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useCyyBarContract, useCyyContract } from './useContract'
import { useTransactionAdder } from '../state/transactions/hooks'

const { BigNumber } = ethers

const useCyyBar = () => {
    const { account } = useActiveWeb3React()
    const addTransaction = useTransactionAdder()
    const cyyContract = useCyyContract(true) // withSigner
    const barContract = useCyyBarContract(true) // withSigner

    const [allowance, setAllowance] = useState('0')

    const fetchAllowance = useCallback(async () => {
        if (account) {
            try {
                const allowance = await cyyContract?.allowance(account, barContract?.address)
                const formatted = Fraction.from(BigNumber.from(allowance), BigNumber.from(10).pow(18)).toString()
                setAllowance(formatted)
            } catch (error) {
                setAllowance('0')
                throw error
            }
        }
    }, [account, barContract, cyyContract])

    useEffect(() => {
        if (account && barContract && cyyContract) {
            fetchAllowance()
        }
        const refreshInterval = setInterval(fetchAllowance, 10000)
        return () => clearInterval(refreshInterval)
    }, [account, barContract, fetchAllowance, cyyContract])

    const approve = useCallback(async () => {
        try {
            const tx = await cyyContract?.approve(barContract?.address, ethers.constants.MaxUint256.toString())
            return addTransaction(tx, { summary: 'Approve' })
        } catch (e) {
            return e
        }
    }, [addTransaction, barContract, cyyContract])

    const enter = useCallback(
        // todo: this should be updated with BigNumber as opposed to string
        async (amount: string) => {
            try {
                const tx = await barContract?.enter(ethers.utils.parseUnits(amount))
                return addTransaction(tx, { summary: 'Enter RegoBar' })
            } catch (e) {
                return e
            }
        },
        [addTransaction, barContract]
    )

    const leave = useCallback(
        // todo: this should be updated with BigNumber as opposed to string
        async (amount: string) => {
            try {
                const tx = await barContract?.leave(ethers.utils.parseUnits(amount))
                return addTransaction(tx, { summary: 'Leave RegoBar' })
            } catch (e) {
                console.log('leave_error:', e)
                return e
            }
        },
        [addTransaction, barContract]
    )

    return { allowance, approve, enter, leave }
}

export default useCyyBar
