import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserDetailsModel } from "src/models/user/UsersModel";
import { UsersService } from "src/services/users.service";

@Injectable({ providedIn: 'root' })
export class UserDetailsResolver implements Resolve<UserDetailsModel> {
    constructor(private usersService: UsersService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<UserDetailsModel> | Promise<UserDetailsModel> | UserDetailsModel {
        return this.usersService.GetUserDetails(route.paramMap.get('id')!);
    }
}
