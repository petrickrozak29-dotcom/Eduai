export function sendSuccess(res, data, message = "Success", statusCode = 200) {
    const response = {
        success: true,
        message,
        data,
    };
    res.status(statusCode).json(response);
}
export function sendError(res, message, statusCode = 400, error) {
    const response = {
        success: false,
        message,
        error,
    };
    res.status(statusCode).json(response);
}
export function sendPaginated(res, data, total, page, limit, message = "Success") {
    res.status(200).json({
        success: true,
        message,
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    });
}
//# sourceMappingURL=response.js.map