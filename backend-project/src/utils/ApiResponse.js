class ApiResponse {
    constructor(statusCode, data, message = "success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message 
        this.success = statusCode<400
        // in server there are statusCode for differnt type of data 
    }
}
//Api response for give the response to user

export {ApiResponse};