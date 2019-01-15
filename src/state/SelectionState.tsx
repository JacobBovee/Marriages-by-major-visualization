import { observable } from 'mobx'

class SelectionState {
    @observable public selectedGroup: any = null
    @observable public selectedRibbon: any = null

    public updateGroup = (group: number) => {
        this.selectedGroup = group
    }

    public updateRibbon = (ribbon: any) => {
        this.selectedRibbon = ribbon
    }

}

export default new SelectionState()