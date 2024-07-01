export const saveGameToStorage = ({board, turn}) => {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('turn', turn);
};

export const resetGameFromStorage = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
};