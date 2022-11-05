export enum Status {
    Active = 1,
    NotActive = 2
}

export enum Role {
    Administrator = 1,
    RegularUser = 2,
    UpperUser = 3
}

export enum AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumeric",
    InputParameterNotSupplied = "NoParameter",
    DeletionConflict = "DeletionConflict"
}

export enum ColumnType {
    Integer = 1,
    Varchar,
    Boolean,
    Date
}

export enum TableNames {
    User = "[user]",
    Store = "stores",
    Role = "role",
    Employee = "employees"
}

export enum ColumnUpdateType {
    None = 1,
    Always,
    CurrentDate,
    CurrentUser
}