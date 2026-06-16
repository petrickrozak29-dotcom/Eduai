import { Request, Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const register: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const me: (req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    me: (req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=auth.d.ts.map