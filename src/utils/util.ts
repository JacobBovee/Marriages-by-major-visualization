const isRibbonHidden = (mouseOverGroup: any, sourceIndex: number, targetIndex: any) => {
    return mouseOverGroup !== null ? (mouseOverGroup !== sourceIndex && mouseOverGroup !== targetIndex) : false
}

export {
    isRibbonHidden,
}