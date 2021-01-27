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

// type InstituteType implements InstituteListItem{

// }

export const ResponseHandler = (response: ApiResponse | undefined) => {

    if (response) {
        if (response.is_authenticated) {
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

export const getColleges = gql`
    query allColleges ($category:String,$offset:Int,$length:Int){
    allColleges  (category:$category,offset:$offset,length:$length){
        id
        name
        thumbnail
        location
        rating
        slug
    }
    }
  `