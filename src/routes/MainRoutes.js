// project imports
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import BidsPurchaseHistory from 'views/bidPurchaseHistory';
// import AllBots from 'views/player/AllBots/Index';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const Users = Loadable(lazy(() => import('views/users')));
const CreateBids = Loadable(lazy(() => import('views/bids/CreateBids')));
const UpcomingBids = Loadable(lazy(() => import('views/bids/UpcomingBids')));
const CompletedBids = Loadable(lazy(() => import('views/bids/CompletedBids')));
const Customers = Loadable(lazy(() => import('views/customers')));
const Trading = Loadable(lazy(() => import('views/services/trading/trading')));
const Holding = Loadable(lazy(() => import('views/services/holding/holding')));
const PreferenceShares = Loadable(lazy(() => import('views/services/preference-shares/preference-shares')));
const AskToExpert = Loadable(lazy(() => import('views/askToExpert')));
const MarketTrends = Loadable(lazy(() => import('views/marketTrends')));
const AnalysisReport = Loadable(lazy(() => import('views/analysisReport')));
const PaymentGatewayReport = Loadable(lazy(() => import('views/paymentGatewayReport')));
const BidPurchaseHistory = Loadable(lazy(() => import('views/bidPurchaseHistory')));
const TradingEnquiry = Loadable(lazy(() => import('views/enquiry/trading')));
const PreferenceSharesEnquiry = Loadable(lazy(() => import('views/enquiry/preference-shares')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/bids/create-bids',
            element: <CreateBids />
        },
        {
            path: '/bids/upcoming-bids',
            element: <UpcomingBids />
        },
        {
            path: '/bids/completed-bids',
            element: <CompletedBids />
        },
        {
            path: '/customers',
            element: <Customers />
        },
        {
            path: '/services/trading',
            element: <Trading />
        },
        {
            path: '/services/holding',
            element: <Holding />
        },
        {
            path: '/services/preference-shares',
            element: <PreferenceShares />
        },
        {
            path: '/ask-to-expert',
            element: <AskToExpert />
        },
        {
            path: '/market-trends',
            element: <MarketTrends />
        },
        {
            path: '/analysis-report',
            element: <AnalysisReport />
        },
        {
            path: '/payment-gateway-report',
            element: <PaymentGatewayReport />
        },
        {
            path: '/bids-purchase-history',
            element: <BidPurchaseHistory />
        },
        {
            path: '/enquiry/trading',
            element: <TradingEnquiry />
        },
        {
            path: '/enquiry/preference-shares',
            element: <PreferenceSharesEnquiry />
        }
    ]
};

export default MainRoutes;
