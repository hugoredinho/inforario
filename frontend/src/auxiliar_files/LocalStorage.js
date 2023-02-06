


export function  getLocalStorageSettings() {
    var localStorageSettings = JSON.parse(localStorage.getItem(process.env.REACT_APP_local_storage));

    return localStorageSettings;
  }


export function saveInLocalStorageSettings (settings){
    console.log(settings);
    localStorage.setItem(process.env.REACT_APP_local_storage, JSON.stringify(settings));
}

export function getUsernameFromLocalStorageSettings () {
    var localStorage = getLocalStorageSettings();

    return localStorage.username;
}