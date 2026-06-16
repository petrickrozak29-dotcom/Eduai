import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const getAll: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const getById: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const create: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const reply: (req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    getAll: (req: AuthRequestType, res: Response) => Promise<void>;
    getById: (req: AuthRequestType, res: Response) => Promise<void>;
    create: (req: AuthRequestType, res: Response) => Promise<void>;
    reply: (req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=forums.d.ts.map