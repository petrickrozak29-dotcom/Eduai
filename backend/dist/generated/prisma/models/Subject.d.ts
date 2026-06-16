import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Subject
 *
 */
export type SubjectModel = runtime.Types.Result.DefaultSelection<Prisma.$SubjectPayload>;
export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null;
    _min: SubjectMinAggregateOutputType | null;
    _max: SubjectMaxAggregateOutputType | null;
};
export type SubjectMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    kelas: string | null;
    teacherId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubjectMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    kelas: string | null;
    teacherId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubjectCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    kelas: number;
    teacherId: number;
    imageUrl: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SubjectMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    kelas?: true;
    teacherId?: true;
    imageUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubjectMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    kelas?: true;
    teacherId?: true;
    imageUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubjectCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    kelas?: true;
    teacherId?: true;
    imageUrl?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SubjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType;
};
export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
    [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubject[P]> : Prisma.GetScalarType<T[P], AggregateSubject[P]>;
};
export type SubjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubjectWhereInput;
    orderBy?: Prisma.SubjectOrderByWithAggregationInput | Prisma.SubjectOrderByWithAggregationInput[];
    by: Prisma.SubjectScalarFieldEnum[] | Prisma.SubjectScalarFieldEnum;
    having?: Prisma.SubjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubjectCountAggregateInputType | true;
    _min?: SubjectMinAggregateInputType;
    _max?: SubjectMaxAggregateInputType;
};
export type SubjectGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    kelas: string | null;
    teacherId: string | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SubjectCountAggregateOutputType | null;
    _min: SubjectMinAggregateOutputType | null;
    _max: SubjectMaxAggregateOutputType | null;
};
export type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubjectGroupByOutputType[P]>;
}>>;
export type SubjectWhereInput = {
    AND?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    OR?: Prisma.SubjectWhereInput[];
    NOT?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    id?: Prisma.StringFilter<"Subject"> | string;
    name?: Prisma.StringFilter<"Subject"> | string;
    description?: Prisma.StringNullableFilter<"Subject"> | string | null;
    kelas?: Prisma.StringNullableFilter<"Subject"> | string | null;
    teacherId?: Prisma.StringNullableFilter<"Subject"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Subject"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    teacher?: Prisma.XOR<Prisma.TeacherNullableScalarRelationFilter, Prisma.TeacherWhereInput> | null;
    chapters?: Prisma.ChapterListRelationFilter;
    materials?: Prisma.MaterialListRelationFilter;
    quizzes?: Prisma.QuizListRelationFilter;
    forums?: Prisma.ForumListRelationFilter;
};
export type SubjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    kelas?: Prisma.SortOrderInput | Prisma.SortOrder;
    teacherId?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    teacher?: Prisma.TeacherOrderByWithRelationInput;
    chapters?: Prisma.ChapterOrderByRelationAggregateInput;
    materials?: Prisma.MaterialOrderByRelationAggregateInput;
    quizzes?: Prisma.QuizOrderByRelationAggregateInput;
    forums?: Prisma.ForumOrderByRelationAggregateInput;
};
export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    OR?: Prisma.SubjectWhereInput[];
    NOT?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    name?: Prisma.StringFilter<"Subject"> | string;
    description?: Prisma.StringNullableFilter<"Subject"> | string | null;
    kelas?: Prisma.StringNullableFilter<"Subject"> | string | null;
    teacherId?: Prisma.StringNullableFilter<"Subject"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Subject"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    teacher?: Prisma.XOR<Prisma.TeacherNullableScalarRelationFilter, Prisma.TeacherWhereInput> | null;
    chapters?: Prisma.ChapterListRelationFilter;
    materials?: Prisma.MaterialListRelationFilter;
    quizzes?: Prisma.QuizListRelationFilter;
    forums?: Prisma.ForumListRelationFilter;
}, "id">;
export type SubjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    kelas?: Prisma.SortOrderInput | Prisma.SortOrder;
    teacherId?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SubjectCountOrderByAggregateInput;
    _max?: Prisma.SubjectMaxOrderByAggregateInput;
    _min?: Prisma.SubjectMinOrderByAggregateInput;
};
export type SubjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubjectScalarWhereWithAggregatesInput | Prisma.SubjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubjectScalarWhereWithAggregatesInput | Prisma.SubjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Subject"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Subject"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Subject"> | string | null;
    kelas?: Prisma.StringNullableWithAggregatesFilter<"Subject"> | string | null;
    teacherId?: Prisma.StringNullableWithAggregatesFilter<"Subject"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Subject"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Subject"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Subject"> | Date | string;
};
export type SubjectCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    teacherId?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialUncheckedCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teacherId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUncheckedUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    teacherId?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teacherId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubjectListRelationFilter = {
    every?: Prisma.SubjectWhereInput;
    some?: Prisma.SubjectWhereInput;
    none?: Prisma.SubjectWhereInput;
};
export type SubjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kelas?: Prisma.SortOrder;
    teacherId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kelas?: Prisma.SortOrder;
    teacherId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    kelas?: Prisma.SortOrder;
    teacherId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubjectScalarRelationFilter = {
    is?: Prisma.SubjectWhereInput;
    isNot?: Prisma.SubjectWhereInput;
};
export type SubjectNullableScalarRelationFilter = {
    is?: Prisma.SubjectWhereInput | null;
    isNot?: Prisma.SubjectWhereInput | null;
};
export type SubjectCreateNestedManyWithoutTeacherInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutTeacherInput, Prisma.SubjectUncheckedCreateWithoutTeacherInput> | Prisma.SubjectCreateWithoutTeacherInput[] | Prisma.SubjectUncheckedCreateWithoutTeacherInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutTeacherInput | Prisma.SubjectCreateOrConnectWithoutTeacherInput[];
    createMany?: Prisma.SubjectCreateManyTeacherInputEnvelope;
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
};
export type SubjectUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutTeacherInput, Prisma.SubjectUncheckedCreateWithoutTeacherInput> | Prisma.SubjectCreateWithoutTeacherInput[] | Prisma.SubjectUncheckedCreateWithoutTeacherInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutTeacherInput | Prisma.SubjectCreateOrConnectWithoutTeacherInput[];
    createMany?: Prisma.SubjectCreateManyTeacherInputEnvelope;
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
};
export type SubjectUpdateManyWithoutTeacherNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutTeacherInput, Prisma.SubjectUncheckedCreateWithoutTeacherInput> | Prisma.SubjectCreateWithoutTeacherInput[] | Prisma.SubjectUncheckedCreateWithoutTeacherInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutTeacherInput | Prisma.SubjectCreateOrConnectWithoutTeacherInput[];
    upsert?: Prisma.SubjectUpsertWithWhereUniqueWithoutTeacherInput | Prisma.SubjectUpsertWithWhereUniqueWithoutTeacherInput[];
    createMany?: Prisma.SubjectCreateManyTeacherInputEnvelope;
    set?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    disconnect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    delete?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    update?: Prisma.SubjectUpdateWithWhereUniqueWithoutTeacherInput | Prisma.SubjectUpdateWithWhereUniqueWithoutTeacherInput[];
    updateMany?: Prisma.SubjectUpdateManyWithWhereWithoutTeacherInput | Prisma.SubjectUpdateManyWithWhereWithoutTeacherInput[];
    deleteMany?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
};
export type SubjectUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutTeacherInput, Prisma.SubjectUncheckedCreateWithoutTeacherInput> | Prisma.SubjectCreateWithoutTeacherInput[] | Prisma.SubjectUncheckedCreateWithoutTeacherInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutTeacherInput | Prisma.SubjectCreateOrConnectWithoutTeacherInput[];
    upsert?: Prisma.SubjectUpsertWithWhereUniqueWithoutTeacherInput | Prisma.SubjectUpsertWithWhereUniqueWithoutTeacherInput[];
    createMany?: Prisma.SubjectCreateManyTeacherInputEnvelope;
    set?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    disconnect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    delete?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    update?: Prisma.SubjectUpdateWithWhereUniqueWithoutTeacherInput | Prisma.SubjectUpdateWithWhereUniqueWithoutTeacherInput[];
    updateMany?: Prisma.SubjectUpdateManyWithWhereWithoutTeacherInput | Prisma.SubjectUpdateManyWithWhereWithoutTeacherInput[];
    deleteMany?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
};
export type SubjectCreateNestedOneWithoutChaptersInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutChaptersInput, Prisma.SubjectUncheckedCreateWithoutChaptersInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutChaptersInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneRequiredWithoutChaptersNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutChaptersInput, Prisma.SubjectUncheckedCreateWithoutChaptersInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutChaptersInput;
    upsert?: Prisma.SubjectUpsertWithoutChaptersInput;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutChaptersInput, Prisma.SubjectUpdateWithoutChaptersInput>, Prisma.SubjectUncheckedUpdateWithoutChaptersInput>;
};
export type SubjectCreateNestedOneWithoutMaterialsInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutMaterialsInput, Prisma.SubjectUncheckedCreateWithoutMaterialsInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutMaterialsInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneRequiredWithoutMaterialsNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutMaterialsInput, Prisma.SubjectUncheckedCreateWithoutMaterialsInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutMaterialsInput;
    upsert?: Prisma.SubjectUpsertWithoutMaterialsInput;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutMaterialsInput, Prisma.SubjectUpdateWithoutMaterialsInput>, Prisma.SubjectUncheckedUpdateWithoutMaterialsInput>;
};
export type SubjectCreateNestedOneWithoutQuizzesInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutQuizzesInput, Prisma.SubjectUncheckedCreateWithoutQuizzesInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutQuizzesInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutQuizzesInput, Prisma.SubjectUncheckedCreateWithoutQuizzesInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutQuizzesInput;
    upsert?: Prisma.SubjectUpsertWithoutQuizzesInput;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutQuizzesInput, Prisma.SubjectUpdateWithoutQuizzesInput>, Prisma.SubjectUncheckedUpdateWithoutQuizzesInput>;
};
export type SubjectCreateNestedOneWithoutForumsInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutForumsInput, Prisma.SubjectUncheckedCreateWithoutForumsInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutForumsInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneWithoutForumsNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutForumsInput, Prisma.SubjectUncheckedCreateWithoutForumsInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutForumsInput;
    upsert?: Prisma.SubjectUpsertWithoutForumsInput;
    disconnect?: Prisma.SubjectWhereInput | boolean;
    delete?: Prisma.SubjectWhereInput | boolean;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutForumsInput, Prisma.SubjectUpdateWithoutForumsInput>, Prisma.SubjectUncheckedUpdateWithoutForumsInput>;
};
export type SubjectCreateWithoutTeacherInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapters?: Prisma.ChapterCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutTeacherInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialUncheckedCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutTeacherInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutTeacherInput, Prisma.SubjectUncheckedCreateWithoutTeacherInput>;
};
export type SubjectCreateManyTeacherInputEnvelope = {
    data: Prisma.SubjectCreateManyTeacherInput | Prisma.SubjectCreateManyTeacherInput[];
    skipDuplicates?: boolean;
};
export type SubjectUpsertWithWhereUniqueWithoutTeacherInput = {
    where: Prisma.SubjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutTeacherInput, Prisma.SubjectUncheckedUpdateWithoutTeacherInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutTeacherInput, Prisma.SubjectUncheckedCreateWithoutTeacherInput>;
};
export type SubjectUpdateWithWhereUniqueWithoutTeacherInput = {
    where: Prisma.SubjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutTeacherInput, Prisma.SubjectUncheckedUpdateWithoutTeacherInput>;
};
export type SubjectUpdateManyWithWhereWithoutTeacherInput = {
    where: Prisma.SubjectScalarWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateManyMutationInput, Prisma.SubjectUncheckedUpdateManyWithoutTeacherInput>;
};
export type SubjectScalarWhereInput = {
    AND?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
    OR?: Prisma.SubjectScalarWhereInput[];
    NOT?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
    id?: Prisma.StringFilter<"Subject"> | string;
    name?: Prisma.StringFilter<"Subject"> | string;
    description?: Prisma.StringNullableFilter<"Subject"> | string | null;
    kelas?: Prisma.StringNullableFilter<"Subject"> | string | null;
    teacherId?: Prisma.StringNullableFilter<"Subject"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Subject"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
};
export type SubjectCreateWithoutChaptersInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutSubjectsInput;
    materials?: Prisma.MaterialCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutChaptersInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    teacherId?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    materials?: Prisma.MaterialUncheckedCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutChaptersInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutChaptersInput, Prisma.SubjectUncheckedCreateWithoutChaptersInput>;
};
export type SubjectUpsertWithoutChaptersInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutChaptersInput, Prisma.SubjectUncheckedUpdateWithoutChaptersInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutChaptersInput, Prisma.SubjectUncheckedCreateWithoutChaptersInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutChaptersInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutChaptersInput, Prisma.SubjectUncheckedUpdateWithoutChaptersInput>;
};
export type SubjectUpdateWithoutChaptersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutSubjectsNestedInput;
    materials?: Prisma.MaterialUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutChaptersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teacherId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    materials?: Prisma.MaterialUncheckedUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateWithoutMaterialsInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutMaterialsInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    teacherId?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutMaterialsInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutMaterialsInput, Prisma.SubjectUncheckedCreateWithoutMaterialsInput>;
};
export type SubjectUpsertWithoutMaterialsInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutMaterialsInput, Prisma.SubjectUncheckedUpdateWithoutMaterialsInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutMaterialsInput, Prisma.SubjectUncheckedCreateWithoutMaterialsInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutMaterialsInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutMaterialsInput, Prisma.SubjectUncheckedUpdateWithoutMaterialsInput>;
};
export type SubjectUpdateWithoutMaterialsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutMaterialsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teacherId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateWithoutQuizzesInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutQuizzesInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    teacherId?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialUncheckedCreateNestedManyWithoutSubjectInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutQuizzesInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutQuizzesInput, Prisma.SubjectUncheckedCreateWithoutQuizzesInput>;
};
export type SubjectUpsertWithoutQuizzesInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutQuizzesInput, Prisma.SubjectUncheckedUpdateWithoutQuizzesInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutQuizzesInput, Prisma.SubjectUncheckedCreateWithoutQuizzesInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutQuizzesInput, Prisma.SubjectUncheckedUpdateWithoutQuizzesInput>;
};
export type SubjectUpdateWithoutQuizzesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutQuizzesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teacherId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUncheckedUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateWithoutForumsInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutForumsInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    teacherId?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutSubjectInput;
    materials?: Prisma.MaterialUncheckedCreateNestedManyWithoutSubjectInput;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutForumsInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutForumsInput, Prisma.SubjectUncheckedCreateWithoutForumsInput>;
};
export type SubjectUpsertWithoutForumsInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutForumsInput, Prisma.SubjectUncheckedUpdateWithoutForumsInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutForumsInput, Prisma.SubjectUncheckedCreateWithoutForumsInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutForumsInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutForumsInput, Prisma.SubjectUncheckedUpdateWithoutForumsInput>;
};
export type SubjectUpdateWithoutForumsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutForumsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    teacherId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUncheckedUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateManyTeacherInput = {
    id?: string;
    name: string;
    description?: string | null;
    kelas?: string | null;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubjectUpdateWithoutTeacherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutTeacherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutSubjectNestedInput;
    materials?: Prisma.MaterialUncheckedUpdateManyWithoutSubjectNestedInput;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutSubjectNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateManyWithoutTeacherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type SubjectCountOutputType
 */
export type SubjectCountOutputType = {
    chapters: number;
    materials: number;
    quizzes: number;
    forums: number;
};
export type SubjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapters?: boolean | SubjectCountOutputTypeCountChaptersArgs;
    materials?: boolean | SubjectCountOutputTypeCountMaterialsArgs;
    quizzes?: boolean | SubjectCountOutputTypeCountQuizzesArgs;
    forums?: boolean | SubjectCountOutputTypeCountForumsArgs;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: Prisma.SubjectCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountChaptersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountMaterialsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialWhereInput;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountQuizzesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizWhereInput;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountForumsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumWhereInput;
};
export type SubjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    kelas?: boolean;
    teacherId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    teacher?: boolean | Prisma.Subject$teacherArgs<ExtArgs>;
    chapters?: boolean | Prisma.Subject$chaptersArgs<ExtArgs>;
    materials?: boolean | Prisma.Subject$materialsArgs<ExtArgs>;
    quizzes?: boolean | Prisma.Subject$quizzesArgs<ExtArgs>;
    forums?: boolean | Prisma.Subject$forumsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subject"]>;
export type SubjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    kelas?: boolean;
    teacherId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    teacher?: boolean | Prisma.Subject$teacherArgs<ExtArgs>;
}, ExtArgs["result"]["subject"]>;
export type SubjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    kelas?: boolean;
    teacherId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    teacher?: boolean | Prisma.Subject$teacherArgs<ExtArgs>;
}, ExtArgs["result"]["subject"]>;
export type SubjectSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    kelas?: boolean;
    teacherId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SubjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "kelas" | "teacherId" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["subject"]>;
export type SubjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teacher?: boolean | Prisma.Subject$teacherArgs<ExtArgs>;
    chapters?: boolean | Prisma.Subject$chaptersArgs<ExtArgs>;
    materials?: boolean | Prisma.Subject$materialsArgs<ExtArgs>;
    quizzes?: boolean | Prisma.Subject$quizzesArgs<ExtArgs>;
    forums?: boolean | Prisma.Subject$forumsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SubjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teacher?: boolean | Prisma.Subject$teacherArgs<ExtArgs>;
};
export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teacher?: boolean | Prisma.Subject$teacherArgs<ExtArgs>;
};
export type $SubjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Subject";
    objects: {
        teacher: Prisma.$TeacherPayload<ExtArgs> | null;
        chapters: Prisma.$ChapterPayload<ExtArgs>[];
        materials: Prisma.$MaterialPayload<ExtArgs>[];
        quizzes: Prisma.$QuizPayload<ExtArgs>[];
        forums: Prisma.$ForumPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        kelas: string | null;
        teacherId: string | null;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["subject"]>;
    composites: {};
};
export type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubjectPayload, S>;
export type SubjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubjectCountAggregateInputType | true;
};
export interface SubjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Subject'];
        meta: {
            name: 'Subject';
        };
    };
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: Prisma.SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: Prisma.SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     *
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SubjectFindManyArgs>(args?: Prisma.SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     *
     */
    create<T extends SubjectCreateArgs>(args: Prisma.SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SubjectCreateManyArgs>(args?: Prisma.SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     *
     */
    delete<T extends SubjectDeleteArgs>(args: Prisma.SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SubjectUpdateArgs>(args: Prisma.SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: Prisma.SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: Prisma.SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(args?: Prisma.Subset<T, SubjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubjectCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Prisma.Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>;
    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends SubjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubjectGroupByArgs['orderBy'];
    } : {
        orderBy?: SubjectGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Subject model
     */
    readonly fields: SubjectFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Subject.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    teacher<T extends Prisma.Subject$teacherArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$teacherArgs<ExtArgs>>): Prisma.Prisma__TeacherClient<runtime.Types.Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    chapters<T extends Prisma.Subject$chaptersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$chaptersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    materials<T extends Prisma.Subject$materialsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$materialsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    quizzes<T extends Prisma.Subject$quizzesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    forums<T extends Prisma.Subject$forumsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$forumsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Subject model
 */
export interface SubjectFieldRefs {
    readonly id: Prisma.FieldRef<"Subject", 'String'>;
    readonly name: Prisma.FieldRef<"Subject", 'String'>;
    readonly description: Prisma.FieldRef<"Subject", 'String'>;
    readonly kelas: Prisma.FieldRef<"Subject", 'String'>;
    readonly teacherId: Prisma.FieldRef<"Subject", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Subject", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Subject", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Subject", 'DateTime'>;
}
/**
 * Subject findUnique
 */
export type SubjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject findUniqueOrThrow
 */
export type SubjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject findFirst
 */
export type SubjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subjects.
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subjects.
     */
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * Subject findFirstOrThrow
 */
export type SubjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subjects.
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subjects.
     */
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * Subject findMany
 */
export type SubjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subjects to fetch.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Subjects.
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subjects.
     */
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * Subject create
 */
export type SubjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * The data needed to create a Subject.
     */
    data: Prisma.XOR<Prisma.SubjectCreateInput, Prisma.SubjectUncheckedCreateInput>;
};
/**
 * Subject createMany
 */
export type SubjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: Prisma.SubjectCreateManyInput | Prisma.SubjectCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Subject createManyAndReturn
 */
export type SubjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * The data used to create many Subjects.
     */
    data: Prisma.SubjectCreateManyInput | Prisma.SubjectCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Subject update
 */
export type SubjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * The data needed to update a Subject.
     */
    data: Prisma.XOR<Prisma.SubjectUpdateInput, Prisma.SubjectUncheckedUpdateInput>;
    /**
     * Choose, which Subject to update.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject updateMany
 */
export type SubjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: Prisma.XOR<Prisma.SubjectUpdateManyMutationInput, Prisma.SubjectUncheckedUpdateManyInput>;
    /**
     * Filter which Subjects to update
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * Limit how many Subjects to update.
     */
    limit?: number;
};
/**
 * Subject updateManyAndReturn
 */
export type SubjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * The data used to update Subjects.
     */
    data: Prisma.XOR<Prisma.SubjectUpdateManyMutationInput, Prisma.SubjectUncheckedUpdateManyInput>;
    /**
     * Filter which Subjects to update
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * Limit how many Subjects to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Subject upsert
 */
export type SubjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: Prisma.SubjectWhereUniqueInput;
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: Prisma.XOR<Prisma.SubjectCreateInput, Prisma.SubjectUncheckedCreateInput>;
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SubjectUpdateInput, Prisma.SubjectUncheckedUpdateInput>;
};
/**
 * Subject delete
 */
export type SubjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter which Subject to delete.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject deleteMany
 */
export type SubjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number;
};
/**
 * Subject.teacher
 */
export type Subject$teacherArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: Prisma.TeacherSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Teacher
     */
    omit?: Prisma.TeacherOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TeacherInclude<ExtArgs> | null;
    where?: Prisma.TeacherWhereInput;
};
/**
 * Subject.chapters
 */
export type Subject$chaptersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
/**
 * Subject.materials
 */
export type Subject$materialsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    cursor?: Prisma.MaterialWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
/**
 * Subject.quizzes
 */
export type Subject$quizzesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: Prisma.QuizSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Quiz
     */
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput | Prisma.QuizOrderByWithRelationInput[];
    cursor?: Prisma.QuizWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizScalarFieldEnum | Prisma.QuizScalarFieldEnum[];
};
/**
 * Subject.forums
 */
export type Subject$forumsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Forum
     */
    select?: Prisma.ForumSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Forum
     */
    omit?: Prisma.ForumOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ForumInclude<ExtArgs> | null;
    where?: Prisma.ForumWhereInput;
    orderBy?: Prisma.ForumOrderByWithRelationInput | Prisma.ForumOrderByWithRelationInput[];
    cursor?: Prisma.ForumWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumScalarFieldEnum | Prisma.ForumScalarFieldEnum[];
};
/**
 * Subject without action
 */
export type SubjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
};
//# sourceMappingURL=Subject.d.ts.map