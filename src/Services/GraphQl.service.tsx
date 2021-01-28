import { gql } from "@apollo/client";
import { BASE_URL } from "./Api.service";
import { ApiResponse } from "./Interfaces.interface";
import { InstituteListItem } from '@/Services/GraphQlDataTypes/Institutes';


export const Api_Url = BASE_URL + 'fetch-query/';


// ----- Method to handle api response ----- \\

// codes ----------
// '__request_failed__' = request has been failed
// '__not_authenticated__' = user is not authenticated
// '__request_failed_error__' = request has been failed with error
// '__data_not_found__' = No data is found
// '__request_success__' = All did well

const ApiResponseTypes = {
    RequestFailed: '__request_failed__',
    NotAuthenticated: '__not_authenticated__',
    RequestFailedError: '__request_failed_error__',
    dataNotFound: '__data_not_found__',
    RequestSuccess: '__request_success__',
}

export type PageInfo = { endCursor: string, hasNextPage: boolean }

// type InstituteType implements InstituteListItem{

// }

export const ResponseHandler = (response: ApiResponse | undefined) => {

    if (response) {
        if (response.isAuthenticated) {
            if (response.status) {
                if (response.result) {
                    return ApiResponseTypes.RequestSuccess
                } else {
                    return ApiResponseTypes.dataNotFound;
                }
            } else {
                return ApiResponseTypes.RequestFailedError;
            }
        } else {
            return ApiResponseTypes.NotAuthenticated;
        }
    } else {
        return ApiResponseTypes.RequestFailed;
    }
}

export const GetCollegeInformation = gql`
   query getColleges{
 college (id:17) {

   content

 }
}
`

const ResponseFragment = gql`
    fragment Response on Query{
        status
        messages
        additionalInfo
        isAuthenticated
    }
`



export const getColleges = gql`
   query collegeList ($category:String,$length:Int,$lastCursor:String){
        ... Response,
        collegeList(category:$category,after:$lastCursor,first:$length) {
            pageInfo{
                hasNextPage
                endCursor
            }
            edges{
                id
                name
                thumbnail
                location
                rating
                slug            
            
            }
        }
    }
    ${ResponseFragment}
  `