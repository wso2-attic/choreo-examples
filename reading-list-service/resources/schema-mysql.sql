create database reading_list_db;

create table reading_list_db.reading_list (
    id CHAR(36),
    title VARCHAR(128),
    author VARCHAR(128),
    status VARCHAR(7),
    listId VARCHAR(256),
    PRIMARY KEY (id)
);
