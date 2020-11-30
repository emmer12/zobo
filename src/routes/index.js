
import HomePage from '../components/pages/HomePage.vue';
import About from '../components/pages/About.vue';
import Contact from '../components/pages/Contact.vue';
import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import Special from '../components/Auth/Special';
import Dashboard from '../components/Auth/Dashboard';
import Admin from '../components/Auth/Admin';
import ZoboDetails from '../components/Auth/ZoboDetails';
import CreateZobo from '../components/Auth/CreateZobo';
import ZoboList from '../components/Auth/ZoboListView';
import ForgetPassword from '../components/Auth/ForgetPassword';
import ResetPassword from '../components/Auth/ResetPassword';
import Notifications from '../components/Auth/NotificationsPage';
import ProfileSettings from '../components/Auth/ProfileSettings';
import AccountSettings from '../components/Auth/AccountSettings';
import Profile from '../components/Auth/Profile';
import Transactions from '../components/Auth/Transactions';
// import ProfileView from '../components/Auth/ProfileView';
import Balance from '../components/Auth/Balance';
import Access from '../components/Auth/Access';
import Logout from '../components/Auth/Logout';
import Page404 from '../components/pages/Page404';
import MyZoboPage from '../components/pages/MyZoboPage';
import EmailTest from '../components/pages/EmailTest';
import EditZobo from '../components/pages/EditZobo';
import Feeds from '../components/pages/Feeds';
import StoreCat from '../components/pages/StoreCat';
import EmailConfirm from '../components/pages/EmailConfirm';
import FAQ from '../components/pages/FAQ';
import Payment from '../components/Auth/Payment';
                                                                                                               
export const routes = [
   { 
        path: '/',
        name: 'home',
        component: HomePage
    },
    { 
        path: '/email/test',
        name: 'email.test',
        component: EmailTest
    },
    {
        path:'/access',
        name:'access',
        component:Access,
        children:[
            {
                    path: 'signup',
                    name: 'access.signup',
                    component:SignUp,
                    meta: {
                        requiresVisitor: true,                              
                    }
                },
                {                                                                                                                                
                    path: 'signin',
                    name: 'access.signin',
                    component: SignIn,
                    meta: {
                        requiresVisitor: true,
                    }
                },
                {
                    path: 'forget-password',
                    name: 'access.forget.password',
                    component:ForgetPassword,
                    meta: {
                        requiresVisitor: true,                              
                    }
                },

                {
                    path: 'special',
                    name: 'access.special',
                    component:Special,
                }
        ]
    },
    { 
        path: '/about',
        name: 'about',
        component: About
    },
    { 
        path: '/faq',
        name: 'faq',
        component:FAQ
    },
    { 
        path: '/store',
        name: 'store',
        component: Contact
    },
     { 
        path: '/store/:category',
        name: 'store-cat',
        component:StoreCat
    },
    {
        path: '/reset-password/:token',
        name: 'reset.password',
        component:ResetPassword,
        meta: {
            requiresVisitor: true,                              
        }
    },   
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            requiresSuperAuth:true
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },

        children:[
            {
                path: '/',
                name: 'zobo.list',
                component:ZoboList,
                meta: {
                    requiresAuth: true,                              
                }
            },
            {
                path: 'me/c/create',
                name: 'zobo.create',
                component:CreateZobo,
                meta: {
                    requiresAuth: true,                              
                }
            },
            {
                path: 'me/c/transactions',
                name: 'zobo.transactions',
                component:Transactions,
                meta: {
                    requiresAuth: true,                              
                }
            },
            {
                    path: 'me/c/:id',
                    name: 'list.details',
                    component:ZoboDetails,
                    meta: {
                        requiresAuth: true,                              
                    }
                },

                 {
                    path: 'c/:id/edit',
                    name: 'zobo.edit',
                    component:EditZobo,
                    meta: {
                        requiresAuth: true,                              
                    }
                },
                
                {
                    path: '/me/balance',
                    name: 'balance',
                    component:Balance,
                    meta: {
                        requiresAuth: true,                              
                    }
                },
                {
                    path: '/me/notifications',
                    name: 'all.notification',
                    component:Notifications,
                    meta: {
                        requiresAuth: true,                              
                    }
                },
                 {
                            path:'/profile/settings',
                            name:'profile.settings',
                            component:ProfileSettings,
                            meta: {
                                requiresAuth: true,                              
                            }

                },
                {
                    path:'/account/settings',
                    name:'account.settings',
                    component:AccountSettings,
                    meta: {
                        requiresAuth: true,                              
                    }

        },
                
        ]
    },
     {
         path:'/c/:username',
         name:'profile',
         component:Profile,
     },
     { 
        path: '/zobo/:id/:title',
        name:'myzobopage',
        component: MyZoboPage,
        
    },
    { 
        path: '/feeds',
        name:'feeds',
        component:Feeds,
        meta: {
            requiresAuth: true,                              
        }
        
    },
    { 
        path: '/users/confirmation/:token',
        name:'user.e.confirm',
        component: EmailConfirm,
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/payment',
        name: 'payments',
        component: Payment,
        meta: {
            requiresAuth: true,
        }
    },
 
    {
        path: '*',
        name: '404',
        component:Page404,
    },
];
