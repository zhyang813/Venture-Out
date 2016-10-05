import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock(
    '8wMmKpAssAwUpOfPsS5FDd6sffAFSIyv',
    'calebkaston.auth0.com',
    {}
  );

  userProfile: Object;

  constructor(private http: Http) {

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }
        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        let body = JSON.stringify({
          'name': profile.name,
          'email': profile.email,
          'userId': profile.user_id,
          'interests': [],
          'favoritedEvents': [],
          'zipCode': null
        });
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/users', body, options).subscribe(function(response){
          console.log(response);
        });
      });
    });
  };

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };

}
