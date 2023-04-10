export type GetDataParams<ResponseModel> = {
    url: string;
    instantiate: (data: unknown) => ResponseModel;
};
