import { ChainId } from 'quest-cyswap-sdk'
import React from 'react'
import { Redirect, Route, RouteComponentProps, useLocation, Switch } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import AddLiquidity from './pages/AddLiquidity'
import {
    RedirectDuplicateTokenIds,
    RedirectOldAddLiquidityPathStructure,
    RedirectToAddLiquidity
} from './pages/AddLiquidity/redirects'
import Bento from './pages/BentoBox'
import BentoBalances from './pages/BentoBox/Balances'
import Migrate from './pages/Migrate'
import Pool from './pages/Pool'
import PoolFinder from './pages/PoolFinder'
import RemoveLiquidity from './pages/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './pages/RemoveLiquidity/redirects'
import CyyBar from './pages/CyyBar'
import CyyBarTransactions from './pages/CyyBar/CyyBarTransactions'
import CyyBarTips from './pages/CyyBar/Tips'
import Trade from './pages/Trade'
import Swap from './pages/Swap'
import {
    RedirectHashRoutes,
    OpenClaimAddressModalAndRedirectToSwap,
    RedirectPathToSwapOnly,
    RedirectToSwap
} from './pages/Swap/redirects'
import Tools from './pages/Tools'
import Yield from './pages/Yield'
//import MasterChefV1 from './pages/Yield/masterchefv1'
//import MasterChefV1Debug from './pages/Yield/masterchefv1/debug'
//import MiniChefV2 from './pages/Yield/minichefv2'
import Positions from './pages/Positions'
import Transactions from './pages/Transactions'

function Routes(): JSX.Element {
    const { chainId } = useActiveWeb3React()
    return (
        <Switch>
            {/* BentoApps */}
            {/* <Route exact strict path="/bento" component={Bento} />
            <WalletRoute exact strict path="/bento/balances" component={BentoBalances} /> */}

            {chainId === ChainId.MAINNET && (
                <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
            )}
            {/* disable yield  */}
            {/* {chainId === ChainId.RINKEBY && <Route exact strict path="/yield" component={Yield} />}
            {chainId === ChainId.MAINNET && <Route exact strict path="/yield" component={Yield} />}
            {chainId === ChainId.MATIC && <Route exact strict path="/yield" component={Yield} />} */}
            {/* {chainId === ChainId.MAINNET && (
                <Route exact strict path="/yield/debug/:address" component={MasterChefV1Debug} />
            )} */}
            {/* {chainId === ChainId.MAINNET && <Route exact strict path="/vesting" component={Vesting} />} */}

            {/* Migrate */}
            {(chainId === ChainId.MAINNET || chainId === ChainId.BSC || chainId === ChainId.MATIC) && (
                <Route exact strict path="/migrate" component={Migrate} />
            )}

            {/* Cybar Staking */}
            {/* disable Cybar staking */}
            {/* {(chainId === ChainId.MAINNET ||  chainId === ChainId.RINKEBY   || chainId === ChainId.BSC_TESTNET) && ( 
            <Route exact strict path="/Cybar" component={CyyBar} />
            )} */}
            {/* {(chainId === ChainId.MAINNET || chainId === ChainId.RINKEBY || chainId === ChainId.BSC_TESTNET) && (
                <Route exact strict path="/cyybar/transactions" component={CyyBarTransactions} />
            )} */}
            {/* {(chainId === ChainId.MAINNET ||  chainId === ChainId.RINKEBY  || chainId === ChainId.BSC_TESTNET) && ( 
            <Route exact strict path="/cyybar/tips" component={CyyBarTips} />
            )} */}
            {/* disable stake */}
            {/* {(chainId === ChainId.MAINNET ||  chainId === ChainId.RINKEBY  || chainId === ChainId.BSC_TESTNET) && ( 
            <Route exact strict path="/stake" component={CyyBar} />
            )} */}
            {/* Tools */}
            {chainId === ChainId.MAINNET && <Route exact strict path="/tools" component={Tools} />}

            {/* Pages */}
            <Route exact strict path="/tradingview" component={Trade} />
            <Route exact strict path="/trade" component={Swap} />
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/pool" component={Pool} />
            <Route exact strict path="/transactions" component={Transactions} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirects for app routes */}
            <Route
                exact
                strict
                path="/token/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/swap/${address}`} />}
            />
            <Route
                exact
                strict
                path="/pair/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/pool`} />}
            />

            {/* Redirects for Legacy Hash Router paths */}
            <Route exact strict path="/" component={RedirectHashRoutes} />

            {/* Catch all */}
            <Route component={RedirectPathToSwapOnly} />
        </Switch>
    )
}

export default Routes

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
export const PublicRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    const location = useLocation<any>()
    return (
        <>
            <Route
                {...rest}
                render={(props: RouteComponentProps) =>
                    account ? (
                        <Redirect
                            to={{
                                pathname: location.state ? location.state.from.pathname : '/'
                            }}
                        />
                    ) : Component ? (
                        <Component {...props} />
                    ) : (
                        children
                    )
                }
            />
        </>
    )
}

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
export const WalletRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    return (
        <>
            <Route
                {...rest}
                render={({ location, props, match }: any) => {
                    return account ? (
                        Component ? (
                            <Component {...props} {...rest} match={match} />
                        ) : (
                            children
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/connect',
                                state: { from: location }
                            }}
                        />
                    )
                }}
            />
        </>
    )
}
