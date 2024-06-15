import SignIn from '../sreens/user/SignIn';
import Search from '../sreens/user/Search';
import NotFound from '../sreens/NotFound';
import Homepage from '../sreens/user/Homepage';
import EditBook from '../sreens/user/EditBook';
import AccountManagement from '../sreens/user/profile/AccountManagement';
import Library from '../sreens/user/profile/Library';
import TransactionHistory from '../sreens/user/profile/TransactionHistory';
import NewBook from '../sreens/user/NewBook';
import Overview from '../sreens/user/Overview';
import Account from '../components/account/Account';
import NewChapter from '../sreens/user/NewChapter';

export const routes = [
    {
        path: '/',
        element: Homepage,
    },
    {
        path: '/signin_signup',
        element: SignIn,
        isHiddenHeader: true,
    },
    {
        path: '/search',
        element: Search,
    },
    {
        path: '/account_management',
        element: AccountManagement,
    },
    {
        path: '/library',
        element: Library,
    },
    {
        path: '/transaction_history',
        element: TransactionHistory,
    },
    {
        path: '/new_book',
        element: NewBook,
    },
    {
        path: '/:bookId/overview',
        element: Overview,
    },
    {
        path: '/inforAccount',
        element: Account,
    },
    {
        path: '/editBook',
        element: EditBook,
    },
    {
        path: '/new_chapter',
        element: NewChapter,
    },
    {
        path: '*',
        element: NotFound,
    },
]