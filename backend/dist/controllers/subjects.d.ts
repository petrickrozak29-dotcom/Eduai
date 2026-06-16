import { Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const subjectController: {
    getAll(req: AuthRequestType, res: Response): Promise<void>;
    getById(req: AuthRequestType, res: Response): Promise<void>;
    create(req: AuthRequestType, res: Response): Promise<void>;
    update(req: AuthRequestType, res: Response): Promise<void>;
    remove(req: AuthRequestType, res: Response): Promise<void>;
};
export default subjectController;
//# sourceMappingURL=subjects.d.ts.map