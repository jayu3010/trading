// assets
import {
    IconTableExport,
    IconSquarePlus,
    IconUsers,
    IconUser,
    IconCheck,
    IconChartLine,
    IconChartInfographic,
    IconChartDots,
    IconUserCircle,
    IconBuildingStore,
    IconReportAnalytics,
    IconTool,
    IconReport,
    IconShoppingCart,
    IconVirusSearch
} from '@tabler/icons';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'user-view',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: IconUser,
            breadcrumbs: false
        },
        {
            id: 'customer-view',
            title: 'Customers',
            type: 'item',
            url: '/customers',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'serviceType',
            title: 'Services',
            type: 'collapse',
            icon: IconTool,
            children: [
                {
                    id: 'trading',
                    title: 'Trading',
                    type: 'item',
                    url: '/services/trading',
                    icon: IconChartLine,
                    breadcrumbs: false
                },
                {
                    id: 'holding',
                    title: 'Holding',
                    type: 'item',
                    url: '/services/holding',
                    icon: IconChartInfographic,
                    breadcrumbs: false
                },
                {
                    id: 'preference-shares',
                    title: 'Preference Shares',
                    type: 'item',
                    url: '/services/preference-shares',
                    icon: IconChartDots,
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'bids',
            title: 'Bids',
            type: 'collapse',
            icon: IconChartInfographic,
            children: [
                {
                    id: 'create-bids',
                    title: 'Create Bids',
                    type: 'item',
                    url: '/bids/create-bids',
                    icon: IconSquarePlus,
                    breadcrumbs: false
                },
                {
                    id: 'upcoming-bids',
                    title: 'Upcoming Bids',
                    type: 'item',
                    url: '/bids/upcoming-bids',
                    icon: IconTableExport,
                    breadcrumbs: false
                },
                {
                    id: 'completed-bids',
                    title: 'Completed bids',
                    type: 'item',
                    url: '/bids/completed-bids',
                    icon: IconCheck,
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'enquiry',
            title: 'Enquiry',
            type: 'collapse',
            icon: IconVirusSearch,
            children: [
                {
                    id: 'trading',
                    title: 'Trading',
                    type: 'item',
                    url: '/enquiry/trading',
                    icon: IconChartLine,
                    breadcrumbs: false
                },
                {
                    id: 'preference-shares',
                    title: 'Preference Shares',
                    type: 'item',
                    url: '/enquiry/preference-shares',
                    icon: IconChartDots,
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'market-trends',
            title: 'Market Trends',
            type: 'item',
            url: '/market-trends',
            icon: IconBuildingStore,
            breadcrumbs: false
        },
        {
            id: 'bids-purchase-history',
            title: 'Bids Purchase History',
            type: 'item',
            url: '/bids-purchase-history',
            icon: IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'analysis-report',
            title: 'Analysis Report',
            type: 'item',
            url: '/analysis-report',
            icon: IconReportAnalytics,
            breadcrumbs: false
        },
        {
            id: 'payment-gateway-report',
            title: 'Payment Gateway Report',
            type: 'item',
            url: '/payment-gateway-report',
            icon: IconReport,
            breadcrumbs: false
        },
        {
            id: 'ask-to-expert',
            title: 'Ask to Expert',
            type: 'item',
            url: '/ask-to-expert',
            icon: IconUserCircle,
            breadcrumbs: false
        }
    ]
};

export default utilities;
