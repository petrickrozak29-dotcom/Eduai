import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/index.js";
import { Role } from "../generated/prisma/client.js";
export interface AuthRequestType extends Request {
    user?: JwtPayload;
}
export declare function generateToken(payload: JwtPayload): string;
export declare function verifyToken(token: string): JwtPayload;
export declare function authenticate(req: AuthRequestType, res: Response, next: NextFunction): void;
export declare function authorize(...roles: Role[]): (req: AuthRequestType, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map