
import HomePage from '../components/pages/HomePage.vue';
import About from '../components/pages/About.vue';
import Contact from '../components/pages/Contact.vue';
import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import Dashboard from '../components/Auth/Dashboard';
import ZoboDetails from '../components/Auth/ZoboDetails';
import CreateZobo from '../components/Auth/CreateZobo';
import ZoboList from '../components/Auth/ZoboListView';
import ForgetPassword from '../components/Auth/ForgetPassword';
import ResetPassword from '../components/Auth/ResetPassword';
import Settings from '../components/Auth/Settings';
import Profile from '../components/Auth/Profile';
import Transactions from '../components/Auth/Transactions';
// import ProfileView from '../components/Auth/ProfileView';
import Balance from '../components/Auth/Balance';
import Access from '../components/Auth/Access';
import Logout from '../components/Auth/Logout';
import Page404 from '../components/pages/Page404';
import MyZoboPage from '../components/pages/MyZoboPage';
import StoreCat from '../components/pages/StoreCat';
import Payment from '../components/Auth/Payment';
                                                                                                               
export const routes = [
   { 
        path: '/',
        name: 'home',
        component: HomePage
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
                }
        ]
    },
    { 
        path: '/about',
        name: 'about',
        component: About
    },
    { 
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    { 
        path: '/store',
        name: 'contact',
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
                path: 'me/zobo/create',
                name: 'zobo.create',
                component:CreateZobo,
                meta: {
                    requiresAuth: true,                              
                }
            },
            {
                path: 'me/zobo/transactions',
                name: 'zobo.transactions',
                component:Transactions,
                meta: {
                    requiresAuth: true,                              
                }
            },
            {
                    path: 'me/zobo/:id',
                    name: 'list.details',
                    component:ZoboDetails,
                    meta: {
                        requiresAuth: true,                              
                    }
                },
                {
                    path: 'me/balance',
                    name: 'balance',
                    component:Balance,
                    meta: {
                        requiresAuth: true,                              
                    }
                },
                 {
                            path:'me/settings',
                            name:'settings',
                            component:Settings

                }
        ]
    },
     {
         path:'/z/:username',
         name:'profile',
         component:Profile,
     },
     { 
        path: '/zobo/:id/:title',
        name:'myzobopage',
        component: MyZoboPage,
        
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
