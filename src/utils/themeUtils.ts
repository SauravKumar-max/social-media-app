
export const setThemeInLocalStorage = (theme:string):void => {
    localStorage.setItem("theme", JSON.stringify(theme));
}

export const getThemeFromLocalStorage = ():"light" | "dark" => {
    const theme = JSON.parse(localStorage.getItem('theme') || "{}");
    if(typeof theme === 'object'){
        return "light";
    } return theme;
}