import authenticationController from "./core/authentication/authentication.controller";

export class SqlParameters {
    public static Id: string = "id";
}

export class    Queries {
    public static WhiteBoardTypes: string = "SELECT * FROM white_board_type WHERE status_id = ?";
    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";

    // QUERIES FOR THE HOMEWORK 
    public static stores: string = "SELECT * FROM stores";
    public static storesById: string = "SELECT * FROM stores WHERE id = ?";
    public static updateStoreById: string = "UPDATE stores SET store_name = ?, store_address = ? WHERE id = ?";
    public static createNewStore: string = "INSERT stores (store_name, store_address) VALUES (?, ?)";
    public static deleteStoreById: string = "DELETE FROM stores WHERE id = ?";

    public static employeesByStoreId: string = "SELECT employee_id FROM emp_relat_store WHERE store_id = ?";
    public static updateEmployeeById: string = "UPDATE employees SET first_name = ?, last_name = ?, position = ? WHERE id = ?";
    public static createNewEmployee: string = "INSERT employees (first_name, last_name, position) VALUES (?, ?, ?)";
    public static employeeToStorePosition: string = "INSERT emp_relat_store (employee_id, store_id, employee_relat_id) VALUES (?, ?, ?)";
    public static deleteEmployeeById: string = "DELETE FROM employees WHERE id =?";

    public static addNewRole: string = "INSERT role (role_name, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?)";
    
    public static getIdFromStoredProc: string = "SELECT id FROM stores WHERE store_name = ? AND store_address = ?"
    
    public static getUsers: string = "SELECT * FROM [user]"

    public static getRoleByStatusId: string = "SELECT * FROM role WHERE status_id = ?"
    public static updateRoleById: string = "UPDATE role SET role_name = ?, update_date = ?, update_user_id = ? WHERE id = ?"
    public static DeleteRoleById: string = "UPDATE role SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
    // SELECT * FROM white_board_type WHERE id =  50
    public static WhiteBoardTypeById: string = `SELECT * FROM white_board_type WHERE id = ? AND status_id = ?`;
    public static WhiteBoardTypeByTitle: string = "SELECT * FROM white_board_type WHERE white_board_type LIKE ?";
    public static UpdateWhiteBoardTypeById: string = "UPDATE white_board_type SET white_board_type = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddWhiteBoardType: string = "INSERT white_board_type (white_board_type, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?)";
    public static DeleteWhiteBoardTypeById: string = "UPDATE white_board_type SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
    
    public static GetUserByLogin: string = "SELECT id, password, role_id FROM [user] WHERE login = ?";
    public static GetRolesByLogin: string = "SELECT [user].role_id FROM [user] INNER JOIN user_role ON [user].role_id = user_role.role_id WHERE login  = ?"

    public static UpdateUserById: string = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddUser: string = "INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteUserById: string = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

}

export class StoredProcedures {
    public static getStoreById3StoredProc: string = "getStoreByIdThree";
    public static createStoreByStoredProc: string = "update_store";
}

export const NON_EXISTENT_ID: number = -1;
