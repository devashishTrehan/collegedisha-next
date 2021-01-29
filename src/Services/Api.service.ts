import { pageStateType } from "@/Components/DataPageWrapper.component";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Http2ServerRequest } from "http2";
import { Storages } from "./App.service";
import { ApiResponse } from "./Interfaces.interface";

/////////////////------------ for production -----------\\\\\\\\\\\\\

// export const BASE_URL = 'https://newjobshub.com/api/';
// export const Domain = 'https://newjobshub.com';


/////////////////------------ for development -----------\\\\\\\\\\\\\

// export const BASE_URL = 'http://127.0.0.1:8000/api/';
// export const Domain = 'http://127.0.0.1:8000';


/////////////////------------ for testing -----------\\\\\\\\\\\\\

export const BASE_URL = 'http://192.168.1.65:7000/api/';
export const Domain = 'http://192.168.1.65:7000';


const UserUrl = BASE_URL + 'user/';
const FilterOptionUrl = BASE_URL + 'attribs/';
const CandidateUrl = UserUrl + 'candidate/';
const ProfileUrl = CandidateUrl + 'profile/';
const ProfileUpdateUrl = CandidateUrl + 'profile/update/';
const InstituteUrl = BASE_URL + 'institutes/';


export const GetAccessTokenUrl = UserUrl + 'token/refresh/';

const ApiRoutes = {
    RegisterUrl: UserUrl + 'register/',
    LoginUrl: UserUrl + 'login/',
    LogoutUrl: UserUrl + 'logout/',
    ChangePasswordUrl: UserUrl + 'change_password/',
    ResetPasswordUrl: UserUrl + 'reset_password/',
    EmailVerifyUrl: UserUrl + 'verify_email/',
    SendConfirmationEmailUrl: UserUrl + 'send_confirmation_mail/',
    RequestEmailConfirmationUrl: UserUrl + 'get_email_flag/',
    ProfileUrl: ProfileUrl,
    ProfileUpdateUrl: ProfileUrl + 'update/',
    ExperienceUpdateUrl: ProfileUpdateUrl + 'experience/',
    EducationUpdateUrl: ProfileUpdateUrl + 'education/',
    ProfileImageUpdateUrl: ProfileUpdateUrl + 'image/',
    CoverImageUpdateUrl: ProfileUpdateUrl + 'cover_image/',
}

export const setHeader = (token: string = '') => {
    let header = new Headers();
    // header.append('authorization', token);
    if (token) {
        header.append('Authorization', `Bearer ${token}`);
    }
    header.append('Content-Type', 'application/json');
    return header;
}

setHeader();

const ApiService = {}

export const PostRequestObject = (data: object, token: string = ''): AxiosRequestConfig => ({
    headers: setHeader(token),
    method: 'POST',
    data: data,
})


export const ApiResponseTypes: { [key: string]: pageStateType } = {
    RequestFailed: '__request_failed__',
    NotAuthenticated: '__not_authenticated__',
    RequestFailedError: '__request_failed_error__',
    dataNotFound: '__data_not_found__',
    RequestSuccess: '__request_success__',
}

interface ApiResponseCallBacks {
    onFailed: Function,
    onUnAuthenticated: Function,
    onError: Function,
    onNoData: Function,
    onSuccess: Function,
}

export const ApiResponseHandler = (response: ApiResponse | undefined, callbacks: ApiResponseCallBacks) => {

    if (response) {
        if (response.isAuthenticated) {
            if (response.status) {
                if (response.result) {
                    callbacks.onSuccess();
                    return ApiResponseTypes.RequestSuccess
                } else {
                    callbacks.onNoData();
                    return ApiResponseTypes.dataNotFound;
                }
            } else {
                callbacks.onError();
                return ApiResponseTypes.RequestFailedError;
            }
        } else {
            callbacks.onUnAuthenticated();
            return ApiResponseTypes.NotAuthenticated;
        }
    } else {
        callbacks.onFailed();
        return ApiResponseTypes.RequestFailed;
    }
}



export const Register = async (data: object) => {

    return await axios(ApiRoutes.RegisterUrl, PostRequestObject(data))
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const Login = async (data: object) => {
    let statusCode: number | null = null;
    return await axios(ApiRoutes.LoginUrl, PostRequestObject(data))
        .then(response => {
            return response
        })
        .catch(error => console.log('error', error));
}

export const ChangePassword = async (token: string, data: object) => {
    return await axios(ApiRoutes.ChangePasswordUrl, PostRequestObject(data, token))
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const ResetPassword = async (data: object, query: string) => {
    return await axios(ApiRoutes.ResetPasswordUrl + query, PostRequestObject(data))
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const VerifyEmail = async (data: object, stage: number = 1) => {
    return await axios(ApiRoutes.EmailVerifyUrl + `?stage=${stage}`, PostRequestObject(data))
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const SendConfirmationMail = async (token: string, id: number | undefined) => {
    return await axios(ApiRoutes.SendConfirmationEmailUrl + `?id=${id}`, {
        headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetUserMailConfirmation = async (token: string, id: number | undefined) => {
    return await axios(ApiRoutes.RequestEmailConfirmationUrl + `?id=${id}`, {
        headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const Logout = async (token: string, id: number) => {
    return await axios(ApiRoutes.LogoutUrl + `?userId=${id}&token=${token}`)
        .then(response => response)
        .catch(error => console.log('error', error));
}


export const GetProfileData = async (token: string, slug: string) => {
    console.log('profile url', ApiRoutes.ProfileUrl + `?profileIdentifier=${slug}`)
    return await axios(ApiRoutes.ProfileUrl + `?profileIdentifier=${slug}`, {
        headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}


export const UpdateProfileImage = async (token: string, userId: number, data: any) => {
    console.log('projects url', ApiRoutes.ProfileImageUpdateUrl + `?id=${userId}`)
    return await axios(ApiRoutes.ProfileImageUpdateUrl + `?id=${userId}`, PostRequestObject(data, token))
        .then(response => response)
        .catch(error => console.log('error', error));
}



export const GetFilterOptions = async () => {
    return await axios(FilterOptionUrl)
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetInstituteList = async ({ token, userId, category = '', pageNo = 1 }: { token: string, userId: number, category?: string, pageNo?: number }) => {
    return await axios(InstituteUrl + `?id=${userId}&category=${category}&page=${pageNo}`)
        .then(response => response)
        .catch(error => console.log('error', error));
}



export default ApiService;