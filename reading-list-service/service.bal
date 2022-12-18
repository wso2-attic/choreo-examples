import ballerina/uuid;
import ballerina/http;
import ballerina/jwt;

import ballerina/sql;
import ballerinax/mysql;
import ballerina/log;
import ballerinax/mysql.driver as _;

configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;
configurable int dbPort = ?;

enum Status {
    reading = "reading",
    read = "read",
    to_read = "to_read"
}

type BookItem record {|
    string title;
    string author;
    string status;
|};

type Book record {|
    *BookItem;
    string id;
|};

mysql:Client mysqlClient = check new (host = dbHost,
user = dbUser, password = dbPassword, database = dbName, port = dbPort);

service /readinglist on new http:Listener(9090) {

    resource function get books(@http:Header string x\-jwt\-assertion) returns Book[]|error? {
        string? userId = check getUserId(x\-jwt\-assertion);
        if (userId is string) {
            stream<Book, sql:Error?> resultStream =
                            mysqlClient->query(`SELECT id,title,author,status FROM reading_list where listId=${userId}`);
            Book[]|sql:Error? BooksOrError = check from var result in resultStream
                select result;
            if BooksOrError is Book[] {
                return BooksOrError;
            } else {
                string msg = string `Error retrieving books`;
                log:printError(msg, BooksOrError);
                return error(msg);
            }
        } else {
            return error("User is not set for the request");
        }
    }

    resource function post books(@http:Header string x\-jwt\-assertion, @http:Payload BookItem newBook) returns record {|*http:Ok;|}|error? {
        string bookId = uuid:createType1AsString();
        string? userId = check getUserId(x\-jwt\-assertion);
        if (userId is string) {
            sql:ExecutionResult|sql:Error res = mysqlClient->execute(`INSERT INTO reading_list (id, title, author, status, listId) 
                    VALUES (${bookId}, ${newBook.title}, ${newBook.author}, ${newBook.status}, ${x\-jwt\-assertion})`);
            if (res is sql:Error) {
                string msg = string `Failed to add the book ${newBook.title}`;
                log:printError(msg, res);
                return error(msg);
            }
            return {};
        } else {
            return error("User is not set for the request");
        }
    }

    resource function delete books(string id) returns record {|*http:Ok;|}|error? {
        sql:ExecutionResult|sql:Error res = mysqlClient->execute(`DELETE FROM reading_list WHERE id=${id}`);
        if (res is sql:Error) {
            string msg = string `Failed to delete task with id ${id}`;
            log:printError(msg, res);
            return error(msg);
        }
        return {};
    }
}

function getUserId(string encodedJwt) returns string?|error {
    [jwt:Header, jwt:Payload] [_, payload] = check jwt:decode(encodedJwt);
    return payload.sub;
}
