import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Teachers
      * const teachers = await prisma.teacher.findMany()
      * ```
      */
    get teacher(): Prisma.TeacherDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.student`: Exposes CRUD operations for the **Student** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Students
      * const students = await prisma.student.findMany()
      * ```
      */
    get student(): Prisma.StudentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.developer`: Exposes CRUD operations for the **Developer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Developers
      * const developers = await prisma.developer.findMany()
      * ```
      */
    get developer(): Prisma.DeveloperDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Subjects
      * const subjects = await prisma.subject.findMany()
      * ```
      */
    get subject(): Prisma.SubjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.chapter`: Exposes CRUD operations for the **Chapter** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Chapters
      * const chapters = await prisma.chapter.findMany()
      * ```
      */
    get chapter(): Prisma.ChapterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.material`: Exposes CRUD operations for the **Material** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Materials
      * const materials = await prisma.material.findMany()
      * ```
      */
    get material(): Prisma.MaterialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.quiz`: Exposes CRUD operations for the **Quiz** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Quizzes
      * const quizzes = await prisma.quiz.findMany()
      * ```
      */
    get quiz(): Prisma.QuizDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.question`: Exposes CRUD operations for the **Question** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Questions
      * const questions = await prisma.question.findMany()
      * ```
      */
    get question(): Prisma.QuestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.answer`: Exposes CRUD operations for the **Answer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Answers
      * const answers = await prisma.answer.findMany()
      * ```
      */
    get answer(): Prisma.AnswerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.result`: Exposes CRUD operations for the **Result** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Results
      * const results = await prisma.result.findMany()
      * ```
      */
    get result(): Prisma.ResultDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.learningProfile`: Exposes CRUD operations for the **LearningProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LearningProfiles
      * const learningProfiles = await prisma.learningProfile.findMany()
      * ```
      */
    get learningProfile(): Prisma.LearningProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.forum`: Exposes CRUD operations for the **Forum** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Forums
      * const forums = await prisma.forum.findMany()
      * ```
      */
    get forum(): Prisma.ForumDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.forumReply`: Exposes CRUD operations for the **ForumReply** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ForumReplies
      * const forumReplies = await prisma.forumReply.findMany()
      * ```
      */
    get forumReply(): Prisma.ForumReplyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.event`: Exposes CRUD operations for the **Event** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Events
      * const events = await prisma.event.findMany()
      * ```
      */
    get event(): Prisma.EventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.systemLog`: Exposes CRUD operations for the **SystemLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SystemLogs
      * const systemLogs = await prisma.systemLog.findMany()
      * ```
      */
    get systemLog(): Prisma.SystemLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map