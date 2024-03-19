import {ACCOUNT_TYPE} from "../Utils/Constants"

export const dashboardLinks = [
    {
        id:1,
        name:"My Profile",
        path:"/dashboard/my-profile",
        accountType:ACCOUNT_TYPE.CUSTOMER
    },
    {
        id:2,
        name:"My Profile",
        path:"/dashboard/my-profile",
        accountType:ACCOUNT_TYPE.SELLER

    },
    {
        id:3,
        name:"Cart",
        path:"/dashboard/cart",
        accountType:ACCOUNT_TYPE.CUSTOMER
    }, 
    {
        id:4,
        name:"Purchased Items",
        path:"/dashboard/purchasedItem",
        accountType:ACCOUNT_TYPE.CUSTOMER
    },   
    {
        id:5,
        name:"Your Items",
        path:"/dashboard/your-items",
        accountType:ACCOUNT_TYPE.SELLER
    },
    {
        id:6,
        name:"Create Item",
        path:"/dashboard/createItem",
        accountType:ACCOUNT_TYPE.SELLER
    },
    {
        id:7,
        name:"Customer Enrolled",
        path:"/dashboard/customerEnrolled",
        accountType:ACCOUNT_TYPE.SELLER
    },
    {
        id:8,
        name:"Seller dashboard",
        path:"/dashboard/sellerDashboard",
        accountType:ACCOUNT_TYPE.SELLER
    },

]