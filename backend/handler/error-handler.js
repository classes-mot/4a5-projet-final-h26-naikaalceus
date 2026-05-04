function errorHandler(error, res, next){
    if (res.headerSent){
        return next (error);
    } else {
        res.status(error.code || 500);
        res.json({message : error.mesage || "Une erreur inconnue est survenue !"})
    }
}
export default errorHandler;