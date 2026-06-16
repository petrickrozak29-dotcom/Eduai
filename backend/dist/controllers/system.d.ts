import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const status: (_req: AuthRequestType, res: Response) => Promise<void>;
export declare const logs: (_req: AuthRequestType, res: Response) => Promise<void>;
export declare const createLog: (req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    status: (_req: AuthRequestType, res: Response) => Promise<void>;
    logs: (_req: AuthRequestType, res: Response) => Promise<void>;
    createLog: (req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=system.d.ts.map