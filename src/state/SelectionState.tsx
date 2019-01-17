import { observable } from 'mobx'

class SelectionState {
    @observable public selectedGroup: any = null
    @observable public selectedRibbon: any
    @observable public clickSelectedGroup: number | null = null

    public updateGroup = (group: number | null) => {
        this.selectedGroup = group
    }

    public updateRibbon = (ribbon: any) => {
        this.selectedRibbon = ribbon
    }

    public updateClickSelectedGroup = (group: number) => {
        this.clickSelectedGroup = group
    } 

    public isClickSelected = (group: number) => {
        if (this.clickSelectedGroup && this.clickSelectedGroup === group) {
            return true
        }
        return false
    }
}

export default new SelectionState()