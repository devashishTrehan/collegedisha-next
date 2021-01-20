import { UrlObject } from "@/Components/CustomBreadCrumb.component";

export const Theme = {
    // primary: '#44b4d6',
    primary: '#213858',
    secondary: '#33a0ab',
    // secondary: '#43acef',
    tertiary: '#385a64',
    secondaryFontColor: '#5c6b8a',
    fontColor: '#444',
    fontLight: '#888',
    TFontHeadColor: '#1d2746',
    fontColorSecondary: '#374957',
    error: '#ff4444',
    success: '#00C851',
    backgroundColor: '#fff',
    warning: '#ffbb33',
    info: '#33b5e5',
    footerBackground: '#1c384e',
    copyrightStripBackground: '#1a3352',
    radius1: 5,
    radius2: 10,
    radius3: 20,
    bodyTextSize: 14,
    boxShadow: '4px 7px 24px 0 #0000000f',
    boxShadowLight: '5px 5px 25px 0 #aeaec033',
    spacingLess: 10,
    spacingMid: 20,
    spacingMore: 30,
    SecSpacingMob: 40,
    SecSpacingDesk: 80,
    ContentMid: {
        display: 'flex',
        alignItems: 'center'
    },
    ContentRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    ContentLeft: {
        display: 'flex',
        justifyContent: 'flex-start'
    }
}

export const RecaptchaKeys = {
    site_key: '6Lc20vUZAAAAAA6oANXZ7CObtino2s5w-Ujps1Yx',
    secret_key: '6Lc20vUZAAAAAJhGL6PNzI4IgBN9ILuvrYz7KJRT'
}

export const Months: any = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
};

export const Routes = {
    Home: '/',
    Login: '/login',
    User: '/user',
    About: '/about',
    Contact: '/contact',
    Register: '/register',
    PrivacyPolicy: '/privacy-policy',
    TermsConditions: '/website-usage-policy',
    EmailVerification: 'changeloginpassword',
    FAQ: '/faq',
    Founder: '/college-disha-founder',
    Disclaimer: '/disclaimer',
    Advertisement: '/write-for-us',
    Institutes: '/institutes',
    Colleges: '/colleges',
    Coachings: '/coaching',
    Exams: '/exams',
    Boards: '/boards',
    Articles: '/articles',
    Courses: '/courses',
    News: '/news',
    Universities: '/universities',
    ProfileEdit: '/profile-edit/',
    Profile: '/profile/',
    MailSent: '/mailSent',
    Emailverification: '/email-verication',
    OtpVerification: '/otpVerication',
    Verification: '/verification',
    Mobileverification: '/mobileverification',
    PasswordChange: '/change-password',
    ResetPassword: '/reset-password',
}

export const AppSectionHeights = {
    pageNavigation: 84,
}

export const ContactInfo = {
    address: {
        sec1: 'B-48, First Floor,',
        sec2: ' Sector-63, Noida \n U.P., 201301',
    },
    mobile: '9319311001',
    phone: '0120-430-9202',
    email: 'info@collegedisha.com'
}

export const ValidateFields = (conditions: any, refs: any) => {

    conditions?.forEach((condition: boolean, index: number) => {
        if (condition) {
            refs[index].makeDirty();
        }
    });

}

export const Storages = {
    Token: 'token',
    User: 'user',
    Navigation: 'navigation'
}

export const getUser = async () => {
    let user = await localStorage.getItem(Storages.User);
    if (user) {
        user = JSON.parse(user);
        return user;
    } else {
        return false;
    }
}

export const StoreToken = async (token: any) => {
    localStorage.setItem(Storages.Token, JSON.stringify(token));
}

export const getToken = () => {
    let tokenString = localStorage.getItem(Storages.Token);
    if (tokenString) {
        let tokens = JSON.parse(tokenString);
        return tokens;
    } else {
        return null;
    }
}

export const clearStore = async (field: string) => {
    localStorage.removeItem(field);
}

export const StoreUser = async (data: Object) => {
    let user = JSON.stringify(data);
    localStorage.setItem(Storages.User, user);
}


export const ApplicationStatusList = {
    NotAvailable: 'NA',
    Viewed: 'Viewed',
    Applied: 'Applied',
    Saved: 'Saved',
    Reviewed: 'Reviewed',
    Shortlisted: 'Shortlisted',
    Rejected: 'Rejected',
}

export const ErrorTypes = {
    UNVERIFIED_EMAIL: 'UNVERIFIED_EMAIL',
    USER_ALREADY_EXIST: 'USER_ALREADY_EXISTS',
}

export const RequestStatusList = {
    Error: 'error',
    Success: 'success',
    Warning: 'warning',
    Info: 'info'
}

//---------- The function to set last navigation state -------\\

export const setLastNavigation = async (navigation: UrlObject[]) => {
    let item = JSON.stringify(navigation);
    try {
        localStorage.setItem(Storages.Navigation, item);
    } catch (error) {
        console.log('storage navigation setting error', error);
        return false;
    }
    return true;
}


//---------- The function to get last navigation state -------\\

export const getLastNavigation = () => {

    let navigation = localStorage.getItem(Storages.Navigation);
    if (navigation) {
        return JSON.parse(navigation);
    } else {
        return false;
    }
}



//---------- The function changes formats to Indian Number system-------\\

export const Format_INS = (number: number | string) => {
    number = number.toString();
    var lastThree = number.substring(number.length - 3);
    var otherNumbers = number.substring(0, number.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    var result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
}

export function NFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const CurrencySymbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};
