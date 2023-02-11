export enum EUserRoles {
    admin = 'admin',
    user = 'user'
}


export class UserRolesValueObject {

    constructor(private readonly pros: EUserRoles) {

    }


    public get role(): EUserRoles {
        return this.pros
    }

}