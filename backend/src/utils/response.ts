import { Response } from "express";
import { ApiResponse } from "../types/index.js";

export function sendSuccess<T>(res: Response, data: T, message = "Success", statusCode = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
}

export function sendError(res: Response, message: string, statusCode = 400, error?: string): void {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  res.status(statusCode).json(response);
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message = "Success"
): void {
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
