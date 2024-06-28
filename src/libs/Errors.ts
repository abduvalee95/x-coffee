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
    SOMETHING_WENT_WRONG = 'Something went wrong!',
    NO_DATA_FOUND = 'No Data is Found!',
    CREATE_FAILED = 'Create is Failed!',
    UPDATE_FAILED = 'Update is Failed!',

    USED_NICK_FOUND = 'Already used nickname or phone!',
    TOKEN_CREATION_ERROR = 'Token Creation Error!!!',
    NO_MEMBER_NICK = 'No member with that member Nick!',
    BLOCKED_USER =  'You have been Blocked, contact the Restaurant',
    WRONG_PASSWORD = 'Wrong Password, Please try again!',
    NOT_AUTHENTICATED = 'You are not authenticated, Please login first'

}

// Js ichida build in qilingan errorlarga build in qilinsin  INHERETANCE concept
class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    static standart = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG
    };

    constructor (statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
    };
}

// default holatda errors classini export qil degan mantiq yozvoldik errors customized class
export default Errors