import adminAccount from "../DTOS/admin/adminAccountDTO.js"
export default interface adminAccountInterface {
    createAccount(account: adminAccount): Promise<adminAccount>
}
