import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    role: $Enums.Role | null;
    nip: string | null;
    nis: string | null;
    kelas: string | null;
    avatar: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    role: $Enums.Role | null;
    nip: string | null;
    nis: string | null;
    kelas: string | null;
    avatar: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    name: number;
    role: number;
    nip: number;
    nis: number;
    kelas: number;
    avatar: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    nip?: true;
    nis?: true;
    kelas?: true;
    avatar?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    nip?: true;
    nis?: true;
    kelas?: true;
    avatar?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    nip?: true;
    nis?: true;
    kelas?: true;
    avatar?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: $Enums.Role;
    nip: string | null;
    nis: string | null;
    kelas: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    nip?: Prisma.StringNullableFilter<"User"> | string | null;
    nis?: Prisma.StringNullableFilter<"User"> | string | null;
    kelas?: Prisma.StringNullableFilter<"User"> | string | null;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    teacher?: Prisma.XOR<Prisma.TeacherNullableScalarRelationFilter, Prisma.TeacherWhereInput> | null;
    student?: Prisma.XOR<Prisma.StudentNullableScalarRelationFilter, Prisma.StudentWhereInput> | null;
    developer?: Prisma.XOR<Prisma.DeveloperNullableScalarRelationFilter, Prisma.DeveloperWhereInput> | null;
    forums?: Prisma.ForumListRelationFilter;
    forumReplies?: Prisma.ForumReplyListRelationFilter;
    events?: Prisma.EventListRelationFilter;
    systemLogs?: Prisma.SystemLogListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    nip?: Prisma.SortOrderInput | Prisma.SortOrder;
    nis?: Prisma.SortOrderInput | Prisma.SortOrder;
    kelas?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    teacher?: Prisma.TeacherOrderByWithRelationInput;
    student?: Prisma.StudentOrderByWithRelationInput;
    developer?: Prisma.DeveloperOrderByWithRelationInput;
    forums?: Prisma.ForumOrderByRelationAggregateInput;
    forumReplies?: Prisma.ForumReplyOrderByRelationAggregateInput;
    events?: Prisma.EventOrderByRelationAggregateInput;
    systemLogs?: Prisma.SystemLogOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    nip?: string;
    nis?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    kelas?: Prisma.StringNullableFilter<"User"> | string | null;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    teacher?: Prisma.XOR<Prisma.TeacherNullableScalarRelationFilter, Prisma.TeacherWhereInput> | null;
    student?: Prisma.XOR<Prisma.StudentNullableScalarRelationFilter, Prisma.StudentWhereInput> | null;
    developer?: Prisma.XOR<Prisma.DeveloperNullableScalarRelationFilter, Prisma.DeveloperWhereInput> | null;
    forums?: Prisma.ForumListRelationFilter;
    forumReplies?: Prisma.ForumReplyListRelationFilter;
    events?: Prisma.EventListRelationFilter;
    systemLogs?: Prisma.SystemLogListRelationFilter;
}, "id" | "email" | "nip" | "nis">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    nip?: Prisma.SortOrderInput | Prisma.SortOrder;
    nis?: Prisma.SortOrderInput | Prisma.SortOrder;
    kelas?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    nip?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    nis?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    kelas?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    avatar?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    nip?: Prisma.SortOrder;
    nis?: Prisma.SortOrder;
    kelas?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    nip?: Prisma.SortOrder;
    nis?: Prisma.SortOrder;
    kelas?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    nip?: Prisma.SortOrder;
    nis?: Prisma.SortOrder;
    kelas?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutTeacherInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTeacherInput, Prisma.UserUncheckedCreateWithoutTeacherInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTeacherInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutTeacherNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTeacherInput, Prisma.UserUncheckedCreateWithoutTeacherInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTeacherInput;
    upsert?: Prisma.UserUpsertWithoutTeacherInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutTeacherInput, Prisma.UserUpdateWithoutTeacherInput>, Prisma.UserUncheckedUpdateWithoutTeacherInput>;
};
export type UserCreateNestedOneWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudentInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudentInput;
    upsert?: Prisma.UserUpsertWithoutStudentInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStudentInput, Prisma.UserUpdateWithoutStudentInput>, Prisma.UserUncheckedUpdateWithoutStudentInput>;
};
export type UserCreateNestedOneWithoutDeveloperInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDeveloperInput, Prisma.UserUncheckedCreateWithoutDeveloperInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDeveloperInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDeveloperNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDeveloperInput, Prisma.UserUncheckedCreateWithoutDeveloperInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDeveloperInput;
    upsert?: Prisma.UserUpsertWithoutDeveloperInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDeveloperInput, Prisma.UserUpdateWithoutDeveloperInput>, Prisma.UserUncheckedUpdateWithoutDeveloperInput>;
};
export type UserCreateNestedOneWithoutForumsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutForumsInput, Prisma.UserUncheckedCreateWithoutForumsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutForumsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutForumsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutForumsInput, Prisma.UserUncheckedCreateWithoutForumsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutForumsInput;
    upsert?: Prisma.UserUpsertWithoutForumsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutForumsInput, Prisma.UserUpdateWithoutForumsInput>, Prisma.UserUncheckedUpdateWithoutForumsInput>;
};
export type UserCreateNestedOneWithoutForumRepliesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutForumRepliesInput, Prisma.UserUncheckedCreateWithoutForumRepliesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutForumRepliesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutForumRepliesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutForumRepliesInput, Prisma.UserUncheckedCreateWithoutForumRepliesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutForumRepliesInput;
    upsert?: Prisma.UserUpsertWithoutForumRepliesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutForumRepliesInput, Prisma.UserUpdateWithoutForumRepliesInput>, Prisma.UserUncheckedUpdateWithoutForumRepliesInput>;
};
export type UserCreateNestedOneWithoutEventsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEventsInput, Prisma.UserUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEventsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEventsInput, Prisma.UserUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEventsInput;
    upsert?: Prisma.UserUpsertWithoutEventsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEventsInput, Prisma.UserUpdateWithoutEventsInput>, Prisma.UserUncheckedUpdateWithoutEventsInput>;
};
export type UserCreateNestedOneWithoutSystemLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSystemLogsInput, Prisma.UserUncheckedCreateWithoutSystemLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSystemLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutSystemLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSystemLogsInput, Prisma.UserUncheckedCreateWithoutSystemLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSystemLogsInput;
    upsert?: Prisma.UserUpsertWithoutSystemLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSystemLogsInput, Prisma.UserUpdateWithoutSystemLogsInput>, Prisma.UserUncheckedUpdateWithoutSystemLogsInput>;
};
export type UserCreateWithoutTeacherInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutTeacherInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutTeacherInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutTeacherInput, Prisma.UserUncheckedCreateWithoutTeacherInput>;
};
export type UserUpsertWithoutTeacherInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutTeacherInput, Prisma.UserUncheckedUpdateWithoutTeacherInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutTeacherInput, Prisma.UserUncheckedCreateWithoutTeacherInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutTeacherInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutTeacherInput, Prisma.UserUncheckedUpdateWithoutTeacherInput>;
};
export type UserUpdateWithoutTeacherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutTeacherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutStudentInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutStudentInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutStudentInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>;
};
export type UserUpsertWithoutStudentInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutStudentInput, Prisma.UserUncheckedUpdateWithoutStudentInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStudentInput, Prisma.UserUncheckedUpdateWithoutStudentInput>;
};
export type UserUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutDeveloperInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutDeveloperInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutDeveloperInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDeveloperInput, Prisma.UserUncheckedCreateWithoutDeveloperInput>;
};
export type UserUpsertWithoutDeveloperInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDeveloperInput, Prisma.UserUncheckedUpdateWithoutDeveloperInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDeveloperInput, Prisma.UserUncheckedCreateWithoutDeveloperInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDeveloperInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDeveloperInput, Prisma.UserUncheckedUpdateWithoutDeveloperInput>;
};
export type UserUpdateWithoutDeveloperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutDeveloperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutForumsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutForumsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutForumsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutForumsInput, Prisma.UserUncheckedCreateWithoutForumsInput>;
};
export type UserUpsertWithoutForumsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutForumsInput, Prisma.UserUncheckedUpdateWithoutForumsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutForumsInput, Prisma.UserUncheckedCreateWithoutForumsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutForumsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutForumsInput, Prisma.UserUncheckedUpdateWithoutForumsInput>;
};
export type UserUpdateWithoutForumsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutForumsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutForumRepliesInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutForumRepliesInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutForumRepliesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutForumRepliesInput, Prisma.UserUncheckedCreateWithoutForumRepliesInput>;
};
export type UserUpsertWithoutForumRepliesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutForumRepliesInput, Prisma.UserUncheckedUpdateWithoutForumRepliesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutForumRepliesInput, Prisma.UserUncheckedCreateWithoutForumRepliesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutForumRepliesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutForumRepliesInput, Prisma.UserUncheckedUpdateWithoutForumRepliesInput>;
};
export type UserUpdateWithoutForumRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutForumRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutEventsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEventsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    systemLogs?: Prisma.SystemLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEventsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEventsInput, Prisma.UserUncheckedCreateWithoutEventsInput>;
};
export type UserUpsertWithoutEventsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEventsInput, Prisma.UserUncheckedUpdateWithoutEventsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEventsInput, Prisma.UserUncheckedCreateWithoutEventsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEventsInput, Prisma.UserUncheckedUpdateWithoutEventsInput>;
};
export type UserUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    systemLogs?: Prisma.SystemLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutSystemLogsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyCreateNestedManyWithoutUserInput;
    events?: Prisma.EventCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutSystemLogsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.Role;
    nip?: string | null;
    nis?: string | null;
    kelas?: string | null;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teacher?: Prisma.TeacherUncheckedCreateNestedOneWithoutUserInput;
    student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput;
    developer?: Prisma.DeveloperUncheckedCreateNestedOneWithoutUserInput;
    forums?: Prisma.ForumUncheckedCreateNestedManyWithoutUserInput;
    forumReplies?: Prisma.ForumReplyUncheckedCreateNestedManyWithoutUserInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutSystemLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSystemLogsInput, Prisma.UserUncheckedCreateWithoutSystemLogsInput>;
};
export type UserUpsertWithoutSystemLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSystemLogsInput, Prisma.UserUncheckedUpdateWithoutSystemLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSystemLogsInput, Prisma.UserUncheckedCreateWithoutSystemLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSystemLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSystemLogsInput, Prisma.UserUncheckedUpdateWithoutSystemLogsInput>;
};
export type UserUpdateWithoutSystemLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSystemLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    nip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nis?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kelas?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teacher?: Prisma.TeacherUncheckedUpdateOneWithoutUserNestedInput;
    student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput;
    developer?: Prisma.DeveloperUncheckedUpdateOneWithoutUserNestedInput;
    forums?: Prisma.ForumUncheckedUpdateManyWithoutUserNestedInput;
    forumReplies?: Prisma.ForumReplyUncheckedUpdateManyWithoutUserNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutUserNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    forums: number;
    forumReplies: number;
    events: number;
    systemLogs: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    forums?: boolean | UserCountOutputTypeCountForumsArgs;
    forumReplies?: boolean | UserCountOutputTypeCountForumRepliesArgs;
    events?: boolean | UserCountOutputTypeCountEventsArgs;
    systemLogs?: boolean | UserCountOutputTypeCountSystemLogsArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountForumsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountForumRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumReplyWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSystemLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemLogWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    nip?: boolean;
    nis?: boolean;
    kelas?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    teacher?: boolean | Prisma.User$teacherArgs<ExtArgs>;
    student?: boolean | Prisma.User$studentArgs<ExtArgs>;
    developer?: boolean | Prisma.User$developerArgs<ExtArgs>;
    forums?: boolean | Prisma.User$forumsArgs<ExtArgs>;
    forumReplies?: boolean | Prisma.User$forumRepliesArgs<ExtArgs>;
    events?: boolean | Prisma.User$eventsArgs<ExtArgs>;
    systemLogs?: boolean | Prisma.User$systemLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    nip?: boolean;
    nis?: boolean;
    kelas?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    nip?: boolean;
    nis?: boolean;
    kelas?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    nip?: boolean;
    nis?: boolean;
    kelas?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "nip" | "nis" | "kelas" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teacher?: boolean | Prisma.User$teacherArgs<ExtArgs>;
    student?: boolean | Prisma.User$studentArgs<ExtArgs>;
    developer?: boolean | Prisma.User$developerArgs<ExtArgs>;
    forums?: boolean | Prisma.User$forumsArgs<ExtArgs>;
    forumReplies?: boolean | Prisma.User$forumRepliesArgs<ExtArgs>;
    events?: boolean | Prisma.User$eventsArgs<ExtArgs>;
    systemLogs?: boolean | Prisma.User$systemLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        teacher: Prisma.$TeacherPayload<ExtArgs> | null;
        student: Prisma.$StudentPayload<ExtArgs> | null;
        developer: Prisma.$DeveloperPayload<ExtArgs> | null;
        forums: Prisma.$ForumPayload<ExtArgs>[];
        forumReplies: Prisma.$ForumReplyPayload<ExtArgs>[];
        events: Prisma.$EventPayload<ExtArgs>[];
        systemLogs: Prisma.$SystemLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: $Enums.Role;
        nip: string | null;
        nis: string | null;
        kelas: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    teacher<T extends Prisma.User$teacherArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$teacherArgs<ExtArgs>>): Prisma.Prisma__TeacherClient<runtime.Types.Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    student<T extends Prisma.User$studentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$studentArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    developer<T extends Prisma.User$developerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$developerArgs<ExtArgs>>): Prisma.Prisma__DeveloperClient<runtime.Types.Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    forums<T extends Prisma.User$forumsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$forumsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    forumReplies<T extends Prisma.User$forumRepliesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$forumRepliesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    events<T extends Prisma.User$eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    systemLogs<T extends Prisma.User$systemLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$systemLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly nip: Prisma.FieldRef<"User", 'String'>;
    readonly nis: Prisma.FieldRef<"User", 'String'>;
    readonly kelas: Prisma.FieldRef<"User", 'String'>;
    readonly avatar: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.teacher
 */
export type User$teacherArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.student
 */
export type User$studentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where?: Prisma.StudentWhereInput;
};
/**
 * User.developer
 */
export type User$developerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: Prisma.DeveloperSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Developer
     */
    omit?: Prisma.DeveloperOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeveloperInclude<ExtArgs> | null;
    where?: Prisma.DeveloperWhereInput;
};
/**
 * User.forums
 */
export type User$forumsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.forumReplies
 */
export type User$forumRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReply
     */
    select?: Prisma.ForumReplySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ForumReply
     */
    omit?: Prisma.ForumReplyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ForumReplyInclude<ExtArgs> | null;
    where?: Prisma.ForumReplyWhereInput;
    orderBy?: Prisma.ForumReplyOrderByWithRelationInput | Prisma.ForumReplyOrderByWithRelationInput[];
    cursor?: Prisma.ForumReplyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumReplyScalarFieldEnum | Prisma.ForumReplyScalarFieldEnum[];
};
/**
 * User.events
 */
export type User$eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * User.systemLogs
 */
export type User$systemLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: Prisma.SystemLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: Prisma.SystemLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SystemLogInclude<ExtArgs> | null;
    where?: Prisma.SystemLogWhereInput;
    orderBy?: Prisma.SystemLogOrderByWithRelationInput | Prisma.SystemLogOrderByWithRelationInput[];
    cursor?: Prisma.SystemLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemLogScalarFieldEnum | Prisma.SystemLogScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map