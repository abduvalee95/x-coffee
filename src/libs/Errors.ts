export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORITHED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum  Message {
    SOMETHING_WENT_WRONG = 'Something went wrong',
    NO_DATA_FOUND = 'No Data is Found',
    CREATE_FAILED = 'Create is Failed',
    UPDATE_FAILED = 'Update is Failed'
}

// Js ichida build in qilingan errorlarga build in qilinsin  INHERETANCE concept
class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    constructor (statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
    };
}

// default holatda errors classini export qil degan mantiq yozvoldik errors customized class
export default Errors