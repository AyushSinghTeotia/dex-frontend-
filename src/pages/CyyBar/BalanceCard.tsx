import { BalanceProps } from '../../hooks/useTokenBalance'
import React from 'react'
import CyyImage from '../../assets/images/sushi.png'
import XCyyImage from '../../assets/images/xsushi.png'
import { formatFromBalance } from '../../utils'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'

interface BalanceCardProps {
    cyyEarnings?: number
    xCyyBalance: BalanceProps
    cyyBalance: BalanceProps
    weightedApr?: number
}

export default function BalanceCard({
    xCyyBalance,
    cyyBalance,
    cyyEarnings = 0,
    weightedApr = 0
}: BalanceCardProps) {
    const { i18n } = useLingui()
    const { account } = useActiveWeb3React()
    return (
        <div className="balance-car-box bg-dark-900 rounded px-4 md:px-8 pt-6 pb-5 md:pt-7 md:pb-9">
            <div className="">
                <div className=" md:mb-14">
                    <p className="mb-3 text-lg font-bold md:text-h5 md:font-medium text-high-emphesis">
                        {i18n._(t`Balance`)}
                    </p>
                    <div className="flex items-center">
                        <img className="w-10 md:w-16 -ml-1 mr-1 md:mr-2 -mb-1.5" src={XCyyImage} alt="cyy" />
                        <div className="flex flex-col justify-center">
                            <p className="text-caption2 md:text-lg font-bold text-high-emphesis">
                                {/* {formatFromBalance(xCyyBalance.value)} */}
                                {parseFloat(formatFromBalance(xCyyBalance.value)).toFixed(2)}
                            </p>
                            <p className="text-caption2 md:text-caption text-primary">xCYY</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="flex flex-nowrap mb-3 ml-8 md:ml-0">
                        <p className="text-lg font-bold md:text-h5 md:font-medium text-high-emphesis">
                            {i18n._(t`Unstaked`)}
                        </p>
                        {/* <img className="cursor-pointer ml-2 w-4" src={MoreInfoSymbol} alt={'more info'} /> */}
                    </div>
                    <div className="flex items-center ml-8 md:ml-0">
                        <img className="w-10 md:w-16 -ml-1 mr-1 md:mr-2 -mb-1.5" src={CyyImage} alt="cyy" />
                        <div className="flex flex-col justify-center">
                            <p className="text-caption2 md:text-lg font-bold text-high-emphesis">
                                {/* {formatFromBalance(cyyBalance.value)} */}
                                {parseFloat(formatFromBalance(cyyBalance.value)).toFixed(2)}
                                {/* {cyyEarnings.toPrecision(7)} */}
                            </p>
                            <p className="text-caption2 md:text-caption text-primary">CYY</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full mt-7 mb-4 md:mb-0">
                    {/* <div className="flex justify-between items-center">
                        <div className="flex flex-nowrap items-center flex-1">
                            <p className="text-caption md:text-lg font-bold text-high-emphesis">Weighted APR</p>
                            <img className="cursor-pointer ml-2 w-4" src={MoreInfoSymbol} alt={'more info'} />
                        </div>
                        <div className="flex flex-1 md:flex-initial">
                            <p className="text-caption text-primary ml-5 md:ml-0">{`${weightedApr}%`}</p>
                        </div>
                    </div> */}
                    {account && (
                        <a
                            // href={`https://analytics.cyy.com/users/${account}`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={`
                                flex flex-grow justify-center items-center
                                h-14 mt-6 rounded
                                bg-dark-750 text-high-emphesis
                                focus:outline-none focus:ring hover:bg-opacity-80
                                text-caption2 font-bold cursor-pointer
                            `}
                        >
                            {i18n._(t`Your RegoBar Stats`)}
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}