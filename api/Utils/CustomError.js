// class CustomError extends Error{
//     constructor(message,statusCode){
//          super(message,statusCode);
//          this.statusCode = statusCode;
//          this.status = statusCode >= 400 && statusCode < 500 ? "fail":"error";
//          this.isOperational = true;
//          Error.captureStackTrace(this,this.constructor)

//     }
// }
// export default CustomError

export const errorHandler = (message,statusCode)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error

}