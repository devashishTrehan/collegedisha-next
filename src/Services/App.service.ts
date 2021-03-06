import { UrlObject } from "@/Components/CustomBreadCrumb.component";
import { pageStateType } from "@/Components/DataPageWrapper.component";
import { ApiResponseHandler } from "./Api.service";
import { ApiResponse, PageSEOProps } from "./Interfaces.interface";

export const Theme = {
    // primary: '#44b4d6',
    primary: '#213858',
    secondary: '#33a0ab',
    // secondary: '#665dfe',
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
}



export const RecaptchaKeys = {
    site_key: '',
    secret_key: ''
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

export const AppSectionHeights = {
    pageNavigation: 84,
}

export const AppPageValues = {
    itemsPerPage: 12
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
    Navigation: 'navigation',
    AccessToken: 'accessToken',
    UserId: 'userId'
}

export const getUser = () => {
    let user = localStorage.getItem(Storages.User);
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
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

//---------- The function to clip test string -------\\

export const MemoizedClipText = () => {
    let cache = {};

    return (text: string, limit: number = 60) => {
        if (text?.length > limit) {

            if (text in cache) {
                console.log('returning from cache');
                return cache[text];
            } else {
                console.log('Calculating result');
                let newText = text?.slice(0, limit - 1) + '...';
                cache[text] = newText;
                return newText;
            }
        } else {
            return text;
        }
    }
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



//---------- The function to set cookie -------\\
export function SetCookie(cname, cvalue, exdays = 5) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



//---------- The function to get cookie -------\\
export function GetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



//---------- The function to get data for initial page render -------\\
export function GetPageInitialData(responseData: ApiResponse): { result: any, responseType: pageStateType, pageSeo: PageSEOProps, hasMore: boolean, relatedResults: any[] } {

    let responseType = ApiResponseHandler(responseData, {});
    if (responseData) {
        return {
            result: responseData?.result,
            responseType: responseType,
            pageSeo: responseData?.additionalData?.pageSEO,
            hasMore: responseData?.additionalData?.hasMore,
            relatedResults: responseData?.additionalData?.relatedResults ?? []
        }
    } else {
        return {
            result: null,
            responseType: responseType,
            pageSeo: null,
            hasMore: true,
            relatedResults: []
        }
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
