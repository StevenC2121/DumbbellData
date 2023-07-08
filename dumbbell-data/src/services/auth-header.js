export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  //TODO: might need to change this!
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }