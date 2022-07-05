import { IBase } from '@shared/interfaces';
import { ResponseList } from '@shared/models';

export class UserPreferences implements IBase {
    id!: number;
    name!: string;
    createdAt!: Date;
    locationId!: number;
    pinnedAlertIds?: PinnedAlertIds;
    userId!: number
    userPreferencesId!: number
    userSettings!: {};

    constructor(args: { roleId: number; roleName: string; createdAt: Date , userPreferencesId:number,
        pinnedAlertIds: PinnedAlertIds}) {
        this.id = args.roleId;
        this.name = args.roleName;
        this.createdAt = args.createdAt;
        this.userPreferencesId = args.userPreferencesId;
        this.pinnedAlertIds = args.pinnedAlertIds;
       

        // if (args?.pinnedAlertIds?.$values) {
        //     this.pinnedAlertIds = args?.pinnedAlertIds?.$values.map(
        //       (responseJson: any) =>  new PinnedAlertIds(responseJson)
        //     );
        //   }
    }
}

export class PinnedAlertIds{
    $id!:number;
    $values!:number[];
    constructor(args: { $id:number;$values:[] }) {
        this.$id = args.$id;
        this.$values = args.$values;
    }
}

