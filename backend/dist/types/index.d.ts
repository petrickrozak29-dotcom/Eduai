import { Role } from "../generated/prisma/client.js";
export interface JwtPayload {
    userId: string;
    role: Role;
    email: string;
}
export interface AuthRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    role: Role;
    nip?: string;
    nis?: string;
    kelas?: string;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
export interface PaginationParams {
    page?: number;
    limit?: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
//# sourceMappingURL=index.d.ts.map