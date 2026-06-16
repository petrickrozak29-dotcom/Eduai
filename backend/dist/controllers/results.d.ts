import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const getStudentResults: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const getById: (req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    getStudentResults: (req: AuthRequestType, res: Response) => Promise<void>;
    getById: (req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=results.d.ts.map