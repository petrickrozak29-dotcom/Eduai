import { Request, Response } from "express";
import { AuthRequestType } from "../middleware/auth.js";
export declare const getAll: (req: Request, res: Response) => Promise<void>;
export declare const getById: (req: Request, res: Response) => Promise<void>;
export declare const update: (req: AuthRequestType, res: Response) => Promise<void>;
export declare const remove: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=students.d.ts.map