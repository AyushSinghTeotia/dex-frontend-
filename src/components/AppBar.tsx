import { ChainId, Currency } from 'quest-cyswap-sdk'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../assets/images/newlogo.png'
import { useActiveWeb3React } from '../hooks/useActiveWeb3React'
import { useETHBalances } from '../state/wallet/hooks'
import { ReactComponent as Burger } from '../assets/images/burger.svg'
import { ReactComponent as X } from '../assets/images/x.svg'
import Web3Network from './Web3Network'
import Web3Status from './Web3Status'
import Web3Faucet from './Web3Faucet'
import MoreMenu from './Menu'
import { ExternalLink, NavLink } from './Link'
import { Disclosure } from '@headlessui/react'
import { ANALYTICS_URL } from '../constants'
import QuestionHelper from './QuestionHelper'
import { t } from '@lingui/macro'
import LanguageSwitch from './LanguageSwitch'
import { useLingui } from '@lingui/react'
import {SidebarMenu} from 'components/StyledMenu'
import { ButtonError } from '../components/ButtonLegacy'

function AppBar(): JSX.Element {
    const { i18n } = useLingui()
    const { account, chainId, library } = useActiveWeb3React()
    const { pathname } = useLocation()

    const [navClassList, setNavClassList] = useState(
        'w-screen bg-transparent gradiant-border-bottom z-10 backdrop-filter backdrop-blur'
    )

    const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

    useEffect(() => {
        if (pathname === '/trade') {
            setNavClassList('w-screen bg-transparent z-10 backdrop-filter backdrop-blur')
        } else {
            setNavClassList('w-screen bg-transparent gradiant-border-bottom z-10 backdrop-filter backdrop-blur')
        }
    }, [pathname])

    return (
        

        <header className="flex flex-row flex-nowrap justify-between w-screen">
            <Disclosure as="nav" className={navClassList}>
                {({ open }) => (
                    <>
                        <div className="px-4 py-1.5">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href='https://cyswap.netlify.app/'>
                                        <img src={Logo} alt="Cyy" className="h-10 w-auto" />
                                        </a>
                                    </div>
                                    <div className="hidden sm:block sm:ml-4">
                                        <div className="flex space-x-2">
                                     
                                                                               {/* disable home */}
                                        {/* <ExternalLink
                                                 id={`analytics-nav-link`}
                                                href={'https://Cyex.com/'}
                                                    >
                                                    {i18n._(t`Home`)}
                                            </ExternalLink> */}

                                            <NavLink id={`swap-nav-link`} to={'/swap'}>
                                                {i18n._(t`Swap`)}
                                            </NavLink>
                                            
                                             {chainId &&
                                                [ChainId.RINKEBY, ChainId.BSC, ChainId.BSC_TESTNET].includes(chainId) && (
                                            <NavLink
                                                id={`pool-nav-link`}
                                                to={'/pool'}
                                                isActive={(match, { pathname }) =>
                                                    Boolean(match) ||
                                                    pathname.startsWith('/add') ||
                                                    pathname.startsWith('/remove') ||
                                                    pathname.startsWith('/create') ||
                                                    pathname.startsWith('/find')
                                                }
                                            >
                                                {i18n._(t`Pool`)}
                                            </NavLink>
                                            )}
                                            {/* {chainId && [ChainId.MAINNET, ChainId.MATIC].includes(chainId) && (
                                                <NavLink id={`yield-n
                                                av-link`} to={'/yield'}>
                                                    {i18n._(t`Yield`)}
                                                </NavLink>
                                            )} */}
                                            {/* {chainId &&
                                                [ChainId.RINKEBY , ChainId.BSC_TESTNET].includes(chainId) && (
                                                <NavLink id={`sushibar-nav-link`} to={'/CyBar'}>
                                                    {i18n._(t`CyBar`)}
                                                </NavLink>
                                            )} */}
                                            {/* {chainId &&
                                                [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(
                                                    chainId
                                                ) && (
                                                    <NavLink id={`kashi-nav-link`} to={'/bento/kashi/lend'}>
                                                        {i18n._(t`Lend`)}
                                                    </NavLink>
                                                )}
                                            {chainId &&
                                                [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(
                                                    chainId
                                                ) && (
                                                    <NavLink id={`bento-nav-link`} to={'/bento'}>
                                                        {i18n._(t`BentoBox`)}
                                                    </NavLink>
                                                )}
                                            {chainId === ChainId.MAINNET && (
                                                <ExternalLink id={`stake-nav-link`} href={'https://miso.cyy.com'}>
                                                    {i18n._(t`Miso`)}
                                                </ExternalLink>
                                            )}
                                            {chainId === ChainId.MAINNET && (
                                                <NavLink id={`vesting-nav-link`} to={'/vesting'}>
                                                    {i18n._(t`Vesting`)}
                                                </NavLink>
                                            )}
                                            {chainId &&
                                                [
                                                    ChainId.MAINNET,
                                                    ChainId.BSC,
                                                    ChainId.XDAI,
                                                    ChainId.FANTOM,
                                                    ChainId.MATIC
                                                ].includes(chainId) && (
                                                    <ExternalLink
                                                        id={`analytics-nav-link`}
                                                        href={ANALYTICS_URL[chainId] || 'https://analytics.cyy.com'}
                                                    >
                                                        {i18n._(t`Analytics`)}
                                                    </ExternalLink>
                                                )}  */}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center justify-center w-full lg:w-auto p-4 fixed left-0 bottom-0 lg:relative lg:p-0 lg:bg-transparent">                                
                                    <div className="flex items-center justify-between sm:justify-end space-x-2 w-full">                          
                                        {/* {chainId &&
                                            [ChainId.MAINNET].includes(chainId) &&
                                            library &&
                                            library.provider.isMetaMask && (
                                                <>
                                                    <QuestionHelper text={i18n._(t`Add SAK3 to your Metamask wallet`)}>
                                                        <div
                                                            className="hidden sm:inline-block rounded-md bg-dark-900 hover:bg-dark-800 cursor-pointer border border-gray-400"
                                                            onClick={() => {
                                                                const params: any = {
                                                                    type: 'ERC20',
                                                                    options: {
                                                                        address:
                                                                            '0xe9F84dE264E91529aF07Fa2C746e934397810334',
                                                                        symbol: 'SAK3',
                                                                        decimals: 18,
                                                                        image:
                                                                            'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xe9F84dE264E91529aF07Fa2C746e934397810334/logo.png'
                                                                    }
                                                                }

                                                                if (
                                                                    library &&
                                                                    library.provider.isMetaMask &&
                                                                    library.provider.request
                                                                ) {
                                                                    library.provider
                                                                        .request({
                                                                            method: 'wallet_watchAsset',
                                                                            params
                                                                        })
                                                                        .then(success => {
                                                                            if (success) {
                                                                                console.log(
                                                                                    'Successfully added SAK3 to MetaMask'
                                                                                )
                                                                            } else {
                                                                                throw new Error('Something went wrong.')
                                                                            }
                                                                        })
                                                                        .catch(console.error)
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xe9F84dE264E91529aF07Fa2C746e934397810334/logo.png`}
                                                                alt="Switch Network"
                                                                style={{
                                                                    minWidth: 36,
                                                                    minHeight: 36,
                                                                    maxWidth: 36,
                                                                    maxHeight: 36
                                                                }}
                                                                className="rounded-md object-contain"
                                                            />
                                                        </div>
                                                    </QuestionHelper>
                                                </>
                                            )} */}
                                            
                                        {chainId &&
                                            [ ChainId.RINKEBY, ChainId.BSC_TESTNET].includes(chainId) &&
                                            library &&
                                            library.provider.isMetaMask && (
                                                <>
                                                    <QuestionHelper
                                                        text={i18n._(t`Add xCYY to your Metamask wallet`)}
                                                    >
                                                        {/* <div
                                                            className="hidden sm:inline-block rounded-md bg-dark-900 hover:bg-dark-800 cursor-pointer"
                                                            onClick={() => {
                                                                const params: any = {
                                                                    type: 'ERC20',
                                                                    options: {
                                                                        address:
                                                                            '0xbFa85aF088c28ab112fE40903c97bd8535c5e93c',
                                                                        symbol: 'xSamK',
                                                                        decimals: 18,
                                                                        image:
                                                                            'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272/logo.png'
                                                                    }
                                                                } */}

                                                            <div
                                                            className="rounded-md bg-dark-1000 hover:bg-dark-800 cursor-pointer"
                                                            onClick={() => {
                                                                let address: string | undefined
                                                                switch (chainId) {
                                                                    // case ChainId.MAINNET:
                                                                    //     address =
                                                                    //         '0xbea6aff7067d1db51145039c6484a9b670c705ad'    //address need to change
                                                                    //     break
                                                                    case ChainId.BSC:
                                                                        address =
                                                                            '0xAF53b5f1AE51ae5Fe554912A7a2649Ebb90074E7'    
                                                                        break
                                                                    // case ChainId.MATIC:
                                                                    //     address =
                                                                    //         '0xbea6aff7067d1db51145039c6484a9b670c705ad'     //address need to change
                                                                    //     break
                                                                    case ChainId.RINKEBY:
                                                                        address =
                                                                            '0x00EAbc1D044764cc9e959954698426326247b1c4'
                                                                        break

                                                                    case ChainId.BSC_TESTNET:
                                                                        address =
                                                                            '0x82C6727ee76f5A03bAA1c4372A848EB5b7C5E8A5'
                                                                        break
                                                                }
                                                                const params: any = {
                                                                    type: 'ERC20',
                                                                    options: {
                                                                        address: address,
                                                                        symbol: 'xCYY',
                                                                        decimals: 18,
                                                                        image:
                                                                            'https://samkoin.com/public/images/other/sam1.png'
                                                                    }
                                                                }    

                                                                if (
                                                                    library &&
                                                                    library.provider.isMetaMask &&
                                                                    library.provider.request
                                                                ) {
                                                                    library.provider
                                                                        .request({
                                                                            method: 'wallet_watchAsset',
                                                                            params
                                                                        })
                                                                        .then(success => {
                                                                            if (success) {
                                                                                console.log(
                                                                                    'Successfully added xCYY to MetaMask'
                                                                                )
                                                                            } else {
                                                                                throw new Error('Something went wrong.')
                                                                            }
                                                                        })
                                                                        .catch(console.error)
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                // src={`${process.env.PUBLIC_URL}/images/tokens/xsamk-square.jpg`}
                                                                // alt="Switch Network"
                                                                // style={{
                                                                //     minWidth: 35,
                                                                //     minHeight: 35,
                                                                //     maxWidth: 35,
                                                                //     maxHeight: 35
                                                                // }}
                                                                // className="object-contain rounded"
                                                            />
                                                        </div>
                                                    </QuestionHelper>
                                                </>
                                            )}

                                        {chainId &&
                                            [ ChainId.RINKEBY, ChainId.BSC, ChainId.BSC_TESTNET].includes(chainId) &&
                                            library &&
                                            library.provider.isMetaMask && (
                                                <>
                                                    <QuestionHelper text={i18n._(t`Add CYY to your Metamask wallet`)}>
                                                        <div
                                                            className="rounded-md bg-dark-1000 hover:bg-dark-800 cursor-pointer"
                                                            onClick={() => {
                                                                let address: string | undefined
                                                                switch (chainId) {
                                                                    // case ChainId.MAINNET:
                                                                    //     address =
                                                                    //         '0x52B8E9296B3c605eA7e9ecF1d201254bc9D55F54'  //address need to change
                                                                    //     break
                                                                    case ChainId.BSC:
                                                                        address =
                                                                            '0xC456D84D202FcB97E29Fc2dce20aC613434C8065'   //address need to change
                                                                        break
                                                                    // case ChainId.MATIC:
                                                                    //     address =
                                                                    //         '0x52B8E9296B3c605eA7e9ecF1d201254bc9D55F54'
                                                                    //     break
                                                                    case ChainId.RINKEBY:
                                                                        address =
                                                                            '0x5e88777e5956CBf076500E75b09aCfE8f09BC9ca'
                                                                        break

                                                                    case ChainId.BSC_TESTNET:
                                                                        address =
                                                                            '0x1Da4EbB979A6925159eAc5Ad8B675B9ED75b499F'
                                                                        break
                                                                }
                                                                const params: any = {
                                                                    type: 'ERC20',
                                                                    options: {
                                                                        address: address,
                                                                        symbol: 'CYY',
                                                                        decimals: 18,
                                                                        image:
                                                                        'https://cyswap.netlify.app/images/tokens/samk-square.png'
                                                                    }
                                                                }

                                                                if (
                                                                    library &&
                                                                    library.provider.isMetaMask &&
                                                                    library.provider.request
                                                                ) {
                                                                    library.provider
                                                                        .request({
                                                                            method: 'wallet_watchAsset',
                                                                            params
                                                                        })
                                                                        .then(success => {
                                                                            if (success) {
                                                                                console.log(
                                                                                    'Successfully added CYY to MetaMask'
                                                                                )
                                                                            } else {
                                                                                throw new Error('Something went wrong.')
                                                                            }
                                                                        })
                                                                        .catch(console.error)
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                src={`${process.env.PUBLIC_URL}/images/tokens/samk-square.png`}
                                                                alt="Switch Network"
                                                                style={{
                                                                    minWidth: 35,
                                                                    minHeight: 35,
                                                                    maxWidth: 35,
                                                                    maxHeight: 35
                                                                }}
                                                                className="object-contain rounded"
                                                            />
                                                        </div>
                                                    </QuestionHelper>
                                                </>
                                            )}
                                        {/* {chainId && chainId === ChainId.MATIC && (
                                            <div className="hidden sm:inline-block">
                                                <a
                                                    className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
                                                    href="https://wallet.matic.network/bridge/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <div className="grid grid-flow-col auto-cols-max items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3 pointer-events-auto">
                                                        <div className="text-primary">{i18n._(t`Bridge Assets`)}</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}  */}

                                        {library && library.provider.isMetaMask && (
                                            <div className="hidden sm:inline-block">
                                                 {chainId &&
                                            [ ChainId.RINKEBY, ChainId.BSC, ChainId.BSC_TESTNET].includes(chainId) &&
                                                <Web3Network />
                                                }
                                            </div>
                                        )}
                                        {library && library.provider.isMetaMask && (
                                           
                                        <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-1000 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                                         {chainId && chainId !== ChainId.RINKEBY && chainId !== ChainId.BSC && chainId !== ChainId.BSC_TESTNET && ( 
                                       
                                         <ButtonError onClick={() => {window.alert(
                                            i18n._(t`Please Choose Correct Network`)
                                           )}
                                            }>
                                            {i18n._(t`Wrong Network`)}
                                            </ButtonError>
                                             )}
                                             </div>
                                        )}
                                    

                                        <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-1000 whitespace-nowrap text-smp font-bold cursor-pointer select-none pointer-events-auto">
                                            {account && chainId && userEthBalance && (
                                                <>
                                                  {chainId && 
                                                     [ ChainId.RINKEBY, ChainId.BSC , ChainId.BSC_TESTNET].includes(chainId) &&
                                                    <div className="py-2 px-2 text-primary1 text-bold">
                                                  
                                                        {userEthBalance?.toSignificant(4)}{' '}
                                                        {Currency.getNativeCurrencySymbol(chainId)}
                                                    
                                                    </div>
                                                  }
                                                </>
                                            )}
                                            <Web3Status />
                                        </div>
                                        <MoreMenu/> 
                                        <LanguageSwitch />

                                        {/* {chainId &&
                                            [ChainId.RINKEBY].includes(
                                                chainId
                                            ) && <Web3Faucet />} */}

                                             
                                    </div>
                                </div>
                                <div className="-mr-2 flex sm:hidden">
                                    {/* Mobile menu button */}
                                    {/* <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                                        <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                                        {open ? (
                                            <X title="Close" className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Burger title="Burger" className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button> */}
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                {/* <a
                                href="#"
                                className="bg-gray-1000 text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Dashboard
                            </a> */}
                            
                           
                                <NavLink id={`swap-nav-link`} to={'/swap'}>
                                    {i18n._(t`Swap`)}
                                </NavLink>
                          
                            {chainId && [ChainId.RINKEBY, ChainId.BSC, ChainId.BSC_TESTNET].includes(chainId) && (
                                <NavLink
                                    id={`pool-nav-link`}
                                    to={'/pool'}
                                    isActive={(match, { pathname }) =>
                                        Boolean(match) ||
                                        pathname.startsWith('/add') ||
                                        pathname.startsWith('/remove') ||
                                        pathname.startsWith('/create') ||
                                        pathname.startsWith('/find')
                                    }
                                >
                                    {i18n._(t`Pool`)}
                                </NavLink>
                            )}
                                {/* {chainId && [ChainId.MAINNET, ChainId.MATIC].includes(chainId) && (
                                    <NavLink id={`yield-nav-link`} to={'/yield'}>
                                        {i18n._(t`Yield`)}
                                    </NavLink>
                                )}
                                {chainId &&
                                    [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(chainId) && (
                                        <NavLink id={`kashi-nav-link`} to={'/bento/kashi/lend'}>
                                            {i18n._(t`Kashi Lending`)}
                                        </NavLink>
                                    )}
                                {chainId &&
                                    [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(chainId) && (
                                        <NavLink id={`bento-nav-link`} to={'/bento'}>
                                            {i18n._(t`BentoBox`)}
                                        </NavLink>
                                    )} */}
                                {/* {chainId &&
                                    [ ChainId.RINKEBY, ChainId.BSC_TESTNET].includes(chainId) && (
                                        <NavLink id={`stake-nav-link`} to={'/Cybar'}>
                                            {i18n._(t`CyBar`)}
                                    </NavLink>
                                )} */}
                                {/* {chainId === ChainId.MAINNET && (
                                    <ExternalLink id={`stake-nav-link`} href={'https://miso.cyy.com'}>
                                        {i18n._(t`Miso`)}
                                    </ExternalLink>
                                )}
                                {chainId === ChainId.MAINNET && (
                                    <NavLink id={`vesting-nav-link`} to={'/vesting'}>
                                        {i18n._(t`Vesting`)}
                                    </NavLink>
                                )}
                                {chainId &&
                                    [
                                        ChainId.MAINNET,
                                        ChainId.BSC,
                                        ChainId.XDAI,
                                        ChainId.FANTOM,
                                        ChainId.MATIC
                                    ].includes(chainId) && (
                                        <ExternalLink
                                            id={`analytics-nav-link`}
                                            href={ANALYTICS_URL[chainId] || 'https://analytics.cyswap.com'}
                                        >
                                            {i18n._(t`Analytics`)}
                                        </ExternalLink>
                                    )} */}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </header>
        
        
        )
}

export default AppBar