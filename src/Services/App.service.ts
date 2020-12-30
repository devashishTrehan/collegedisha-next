export const Theme = {
    // primary: '#44b4d6',
    primary: '#213858',
    // secondary: '#1ba6df',
    secondary: '#43acef',
    tertiary: '#385a64',
    secondaryFontColor: '#5c6b8a',
    fontColor: '#444',
    TFontHeadColor: '#1d2746',
    fontColorSecondary: '#374957',
    error: '#ff4444',
    success: '#00C851',
    warning: '#ffbb33',
    info: '#33b5e5',
    radius1: 5,
    radius2: 10,
    radius3: 20,
    bodyTextSize: 14,
    boxShadow: '5px 5px 25px 0 #aeaec067',
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
    FAQ: '/faq',
    Founder: '/college-disha-founder',
    Disclaimer: '/disclaimer',
    Advertisement:'/write-for-us',
    ProfileEdit: '/profile-edit/',
    Profile: '/profile/',
    MailSent: '/mailSent',
    Emailverification: '/emailVerication',
    OtpVerification: '/otpVerication',
    Verification: '/verification',
    Mobileverification: '/mobileverification',
    passwordChange: '/change-password',
    CreatePassword: '/reset-password',
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
    User: 'user'
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
