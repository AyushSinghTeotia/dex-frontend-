import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Helmet } from 'react-helmet'
import XCyySign from '../../assets/images/xsushi-text-sign.png'
import InfoCard from './InfoCard'
import APRCard from './APRCard'
import StakeCard from './StakeCard'
import BalanceCard from './BalanceCard'
import { ChainId } from 'quest-cyswap-sdk'
import {CYY, xCYY } from '../../constants'
import useTokenBalance from '../../hooks/useTokenBalance'

const mockData = {
    cyyEarnings: 345.27898,
    weightedApr: 15.34
}

export default function XCyy() {
    const { account, chainId } = useActiveWeb3React()

// mainnet    
    // const cyyBalance = useTokenBalance(CYY[ChainId.MAINNET]?.address ?? '')
    // const xCyyBalance = useTokenBalance(xCYY[ChainId.MAINNET]?.address ?? '')

// Rinkeby
    
    // const cyyBalance = useTokenBalance(RADIO[ChainId.RINKEBY]?.address ?? '')
    // const xCyyBalance = useTokenBalance(xRadio?.address ?? '')
  
// matic    
    const cyyBalance = useTokenBalance(
        (chainId === ChainId.MATIC)
        ? 
        CYY[ChainId.MATIC]?.address ?? ''
        :
        (chainId === ChainId.RINKEBY)
        ? 
        CYY[ChainId.RINKEBY ]?.address ?? ''
        :
        (chainId === ChainId.BSC_TESTNET)
        ? 
        CYY[ChainId.BSC_TESTNET ]?.address ?? ''
        :
        (chainId === ChainId.MAINNET)
        ? 
        CYY[ChainId.MAINNET ]?.address ?? ''
        :
        CYY[ChainId.BSC ]?.address ?? ''
        )
        
    const xCyyBalance = useTokenBalance(
        (chainId === ChainId.MATIC)
        ?
        xCYY[ChainId.MATIC]?.address ?? ''
        :
        (chainId === ChainId.RINKEBY)
        ?
        xCYY[ChainId.RINKEBY]?.address ?? ''
        :
        (chainId === ChainId.BSC_TESTNET)
        ?
        xCYY[ChainId.BSC_TESTNET]?.address ?? ''
        :
        (chainId === ChainId.MAINNET)
        ?
        xCYY[ChainId.MAINNET]?.address ?? ''
        :
        xCYY[ChainId.BSC]?.address ?? ''
        )

    return (
        <>
            <Helmet>
                <title>xCYY | swap</title>
            </Helmet>
            <div className="flex flex-wrap w-full w-full min-h-fitContent">
                <div style={{minWidth: 250 }} className=" mb-6 justify-center regobar-side0-box">
                <div >
                     <img style={{ maxHeight: 40 }} src={XCyySign} alt={'xcyy sign'} /> 
                   
                    </div>
                    <InfoCard />
                    
                  
                </div>
                <div className="middile-logo-box justify-center">
                    <div className="w-full">
                        <div className="mb-4">
                            <APRCard />
                        </div>
                        <div>
                            <StakeCard cyyBalance={cyyBalance} xCyyBalance={xCyyBalance} />
                        </div>
                    </div>
                    
                </div>
                <div className="hidden md:block ml-6">
                        <BalanceCard
                            cyyEarnings={mockData.cyyEarnings}
                            xCyyBalance={xCyyBalance}
                            cyyBalance={cyyBalance}
                            weightedApr={mockData.weightedApr}
                        />
                    </div>
                <div className=" justify-center w-full">
                    <div className="md:hidden  w-full max-w-xl mt-6 mb-20">
                        <BalanceCard
                            cyyEarnings={mockData.cyyEarnings}
                            xCyyBalance={xCyyBalance}
                            cyyBalance={cyyBalance}
                            weightedApr={mockData.weightedApr}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
