import { observable } from 'mobx'

class SelectionState {
    @observable public selectedGroup: any = null
    @observable public selectedRibbon: any
    @observable public clickSelectedGroups: number[] = []

    public updateGroup = (group: number) => {
        this.selectedGroup = group
    }

    public updateRibbon = (ribbon: any) => {
        this.selectedRibbon = ribbon
    }

    public updateClickSelectedGroup = (group: number) => {
        if (this.clickSelectedGroups.length >= 2) {
            this.clickSelectedGroups.pop()
        }
        this.clickSelectedGroups.unshift(group)
    } 

    public isClickSelected = (group: number) => {
        if (this.clickSelectedGroups.length > 0 && this.clickSelectedGroups.indexOf(group) !== -1) {
            return true
        }
        return false
    }
}

export default new SelectionState()