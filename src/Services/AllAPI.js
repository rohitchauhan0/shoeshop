const BASE_URL = `https://shoeshop-tinv.onrender.com/api/v1`
// const BASE_URL = `http://localhost:5000/api/v1`

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const authEndPoint = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    SEND_OTP: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth//reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "/auth//reset-password"
}

export const settingsEndPoint = {
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword"
}

export const productEndpPoint = {
    CREATE_PRODUCT_API : BASE_URL + "/product/createProduct",
    GET_ALL_CATEGORY_API : BASE_URL + "/category/getAllCategory",
    GET_SELLLER_PRODUCT : BASE_URL + "/product/getSellerProduct",
    GET_ALL_PRODUCT : BASE_URL + "/category/allCategoryproducts",
    GET_ALL_CATEGORY_PAGE_DETAILS : BASE_URL + "/category/categoryPageDetails",
    GET_PRODUCT_DETAIL : BASE_URL + "/product/getProductDetails",
    CAPTURE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
    VERIFY_PAYMENT_API : BASE_URL + "/payment/verifyPayment",
    GET_PRODUCT_BUY_DETAILS : BASE_URL + "/profile/getProductBuyDetail",
    GET_USER_ENROLLED_DETAILS : BASE_URL + "/profile/getUserEnrolled",
    DELETE_PRODUCT : BASE_URL + "/product/deleteProduct"
}