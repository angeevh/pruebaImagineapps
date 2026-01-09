import * as React from 'react';
import { IUser, ProjectStatus } from '../models/types';
interface Props {
    statuses: ProjectStatus[];
    managers: IUser[];
    selectedStatus?: ProjectStatus | 'All';
    onStatusChange: (s: ProjectStatus | 'All') => void;
    selectedManagerId?: number | 'All';
    onManagerChange: (id: number | 'All') => void;
}
export declare const FilterPanel: React.FC<Props>;
export {};
//# sourceMappingURL=FilterPanel.d.ts.map