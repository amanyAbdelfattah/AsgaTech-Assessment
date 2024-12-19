import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/Environment';
import { UsersModel } from 'src/models/user/UsersModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUpdated = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  onGetAllUsers(): Observable<UsersModel[]> {
    return this.httpClient.get<UsersModel[]>(`${Environment.baseUrl}users.json`);
  }

  onFixUserRegisteredDateFormat(userRegisteredDateString: string): string {
    const yearTimePattern = /(\d{4})(\d{2}:\d{2}:\d{2})/;
    if (yearTimePattern.test(userRegisteredDateString)) {
      userRegisteredDateString = userRegisteredDateString.replace(yearTimePattern, '$1 $2');
    }
    return userRegisteredDateString;
  }

  onGenerateUniqueId() {
    return 'xxxx-xxxx-xxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    });
  }
}
