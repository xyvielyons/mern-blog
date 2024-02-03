export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    res.status(err.statusCode).send({
        success:false, 
        error: err,
        status:err.statusCode,
        message:err.message,
        stacktrace:err.stack
        
    });
}