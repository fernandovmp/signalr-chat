create table users(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    createdOn datetime2(2) DEFAULT SYSDATETIME(),
    modifiedOn datetime2(2) DEFAULT SYSDATETIME()
)
