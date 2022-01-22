
export function getTokenFromLocalStroage(){
    const { isUserLoggedIn, token } = JSON.parse(localStorage.getItem('login') || "{}");
    return { token: token?.replace('Bearer', '') , isUserLoggedIn };
}

export function removeTokenFromLocalStorage(){
  localStorage?.removeItem('login');
}
