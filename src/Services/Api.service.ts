import { pageStateType } from "@/Components/DataPageWrapper.component";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "./Interfaces.interface";



///////////////------------ for production -----------\\\\\\\\\\\\\

export const BASE_URL = 'https://api-coldisha.newjobshub.com/api/';
export const Domain = 'https://api-coldisha.newjobshub.com';


/////////////////------------ for development -----------\\\\\\\\\\\\\

// export const BASE_URL = 'http://127.0.0.1:8000/api/';
// export const Domain = 'http://127.0.0.1:8000';


// // /////////////////------------ for testing -----------\\\\\\\\\\\\\

// export const BASE_URL = 'http://192.168.1.65:7000/api/';
// export const Domain = 'http://192.168.1.65:7000';



// /////////////////------------ for testing -----------\\\\\\\\\\\\\

// export const BASE_URL = 'http://192.168.1.52:8000/api/';
// export const Domain = 'http://192.168.1.52:8000';


const UserUrl = BASE_URL + 'user/';
const FilterOptionUrl = BASE_URL + 'attribs/';
const CandidateUrl = UserUrl + 'candidate/';
const ProfileUrl = CandidateUrl + 'profile/';
const ProfileUpdateUrl = CandidateUrl + 'profile/update/';
const InstituteUrl = BASE_URL + 'institutes/';
const CoachingUrl = BASE_URL + 'coachings/';
const ArticleUrl = BASE_URL + 'articles/';
const NewsUrl = BASE_URL + 'news/';
const ExamsUrl = BASE_URL + 'exams/';
const BoardsUrl = BASE_URL + 'boards/';
const CoursesUrl = BASE_URL + 'courses/';
const CareersUrl = BASE_URL + 'careers/';


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
    BoardClassesUrl: BoardsUrl + 'classes/',
    AllCoursesUrl: CoursesUrl + 'all/',
    AllCareersUrl: CareersUrl + 'all/',
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
    onFailed?: Function,
    onUnAuthenticated?: Function,
    onError?: Function,
    onNoData?: Function,
    onSuccess?: Function,
}

export const ApiResponseHandler = (response: ApiResponse | undefined, callbacks: ApiResponseCallBacks) => {
    console.log('response object', response)
    if (response) {
        if (response.isAuthenticated) {
            if (response.status) {
                const { result } = response;
                let keys = null;
                if (result) {
                    keys = Object.keys(result);
                }

                let isResultPopulated = keys ? keys?.length : result?.length;
                if (isResultPopulated) {
                    callbacks.onSuccess && callbacks.onSuccess();
                    return ApiResponseTypes.RequestSuccess
                } else {
                    callbacks.onNoData && callbacks.onNoData();
                    return ApiResponseTypes.dataNotFound;
                }
            } else {
                callbacks.onError && callbacks.onError();
                return ApiResponseTypes.RequestFailedError;
            }
        } else {
            callbacks.onUnAuthenticated && callbacks.onUnAuthenticated();
            return ApiResponseTypes.NotAuthenticated;
        }
    } else {
        callbacks.onFailed && callbacks.onFailed();
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

export const GetInstituteList = async ({ token, userId, category = '', pageNo = 1, size = 12 }: { token: string, userId: number, category?: string, pageNo?: number, size?: number }) => {
    console.log('page Size', size);
    return await axios(InstituteUrl + `?id=${userId}&category=${category}&page=${pageNo}&size=${size}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetInstituteDetails = async ({ token, userId, slug = '', section = 'information' }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(InstituteUrl + `${slug}/` + `?id=${userId}&section=${section}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetInstituteSectionDetails = async ({ token, userId, slug = '', section }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(InstituteUrl + `${slug}/${section}` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetCoachingList = async ({ token, userId, pageNo = 1 }: { token: string, userId: number, pageNo?: number }) => {
    return await axios(CoachingUrl + `?id=${userId}&page=${pageNo}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetCoachingDetails = async ({ token, userId, slug = '' }: { token: string, userId: number, slug?: string }) => {
    return await axios(CoachingUrl + `${slug}/` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetArticleHome = async ({ token, userId }: { token: string, userId: number }) => {
    console.log(ArticleUrl + `?id=${userId}&page=1`);
    return await axios(ArticleUrl + `?id=${userId}&page=1`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetArticleList = async ({ token, userId, pageNo = 1 }: { token: string, userId: number, pageNo?: number }) => {
    return await axios(ArticleUrl + `?id=${userId}&page=${pageNo}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetAllArticles = async ({ token, userId }: { token: string, userId: number }) => {
    return await axios(ArticleUrl + `?id=${userId}&size=10000`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetArticleDetails = async ({ token, userId, slug = '' }: { token: string, userId: number, slug?: string }) => {
    return await axios(ArticleUrl + `${slug}/` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetNewsHome = async ({ token, userId, category = '' }: { token: string, userId: number, category: string }) => {
    console.log(NewsUrl + `?id=${userId}&category=${category}`);
    return await axios(NewsUrl + `?id=${userId}&category=${category}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetNewsList = async ({ token, userId, pageNo = 1, category = '' }: { token: string, userId: number, pageNo?: number, category: string }) => {
    return await axios(NewsUrl + `?id=${userId}&page=${pageNo}&category=${category}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetAllNews = async ({ token, userId }: { token: string, userId: number }) => {
    return await axios(NewsUrl + `?id=${userId}&size=10000`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetNewsDetails = async ({ token, userId, slug = '', section = '' }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(NewsUrl + `${slug}/` + `?id=${userId}&section=${section}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}


export const GetExamsHome = async ({ token, userId, category = '', size = 12 }: { token: string, userId: number, category?: string, size?: number }) => {
    console.log('page Size', size);
    return await axios(ExamsUrl + `?id=${userId}&category=${category}&size=${size}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetExamsList = async ({ token, userId, category = '', pageNo = 2, size = 12 }: { token: string, userId: number, category?: string, pageNo?: number, size?: number }) => {
    console.log('page Size', size);
    return await axios(ExamsUrl + `?id=${userId}&category=${category}&page=${pageNo}&size=${size}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetExamDetails = async ({ token, userId, slug = '', section = '' }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(ExamsUrl + `${slug}/` + `?id=${userId}&section=${section}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetExamSectionDetails = async ({ token, userId, slug = '', section = 'information' }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(ExamsUrl + `${slug}/${section}` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetBoardList = async ({ token, userId, pageNo = 1 }: { token: string, userId: number, pageNo?: number }) => {
    return await axios(BoardsUrl + `?id=${userId}&page=${pageNo}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetAllBoardClasses = async () => {
    return await axios(ApiRoutes.BoardClassesUrl, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetBoardDetails = async ({ token, userId, slug = '', section = '' }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(BoardsUrl + `${slug}/` + `?id=${userId}&section=${section}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetBoardSectionDetails = async ({ token, userId, slug = '', section = 'information' }: { token: string, userId: number, slug?: string, section: string }) => {
    return await axios(BoardsUrl + `${slug}/${section}` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetCourseList = async ({ token, userId, pageNo = 1 }: { token: string, userId: number, pageNo?: number }) => {
    return await axios(CoursesUrl + `?id=${userId}&page=${pageNo}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetAllCourses = async () => {
    return await axios(ApiRoutes.AllCoursesUrl, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetCourseDetails = async ({ token, userId, slug = '' }: { token: string, userId: number, slug?: string, }) => {
    console.log('slug', slug);
    return await axios(CoursesUrl + `${slug}/` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}


export const GetCareerList = async ({ token, userId, pageNo = 1 }: { token: string, userId: number, pageNo?: number }) => {
    return await axios(CareersUrl + `?id=${userId}&page=${pageNo}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetAllCareers = async () => {
    return await axios(CareersUrl + '?size=10000', {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetAllCareerCourses = async () => {
    return await axios(ApiRoutes.AllCareersUrl, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetCareerDetails = async ({ token, userId, slug = '' }: { token: string, userId: number, slug?: string, }) => {
    console.log('slug', slug);
    return await axios(CareersUrl + `${slug}/` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}

export const GetCareerCoursesDetails = async ({ token, userId, careerSlug = '', courseSlug = '' }: { token: string, userId: number, careerSlug?: string, courseSlug: string }) => {
    return await axios(CareersUrl + `${careerSlug}/${courseSlug}` + `?id=${userId}`, {
        // headers: setHeader(token)
    })
        .then(response => response)
        .catch(error => console.log('error', error));
}


export default ApiService;