import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const dashboard: (_req: AuthRequestType, res: Response) => Promise<void>;
export declare const users: (_req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    dashboard: (_req: AuthRequestType, res: Response) => Promise<void>;
    users: (_req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=developer.d.ts.map