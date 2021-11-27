export const toggleEditHandlr = (e, seteditableEl) => {
    e.preventDefault();
    seteditableEl(prev => {
        if(prev === 'open') return true;
    
        return !prev
    });
}