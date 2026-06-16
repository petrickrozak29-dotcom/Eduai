import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const overview: (_req: AuthRequestType, res: Response) => Promise<void>;
export declare const studentLearningIndex: (req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    overview: (_req: AuthRequestType, res: Response) => Promise<void>;
    studentLearningIndex: (req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=analytics.d.ts.map