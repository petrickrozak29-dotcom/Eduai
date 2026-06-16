import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const generateLearningPackage: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const submitPretestProfile: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const getLearningPath: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const askAssistant: (req: AuthRequestType, res: Response) => Promise<void>;
declare const _default: {
    generateLearningPackage: (req: AuthRequestType, res: Response) => Promise<void>;
    submitPretestProfile: (req: AuthRequestType, res: Response) => Promise<void>;
    getLearningPath: (req: AuthRequestType, res: Response) => Promise<void>;
    askAssistant: (req: AuthRequestType, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=edupath.d.ts.map