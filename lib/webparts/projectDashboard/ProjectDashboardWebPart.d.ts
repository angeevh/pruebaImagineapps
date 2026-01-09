import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IProjectDashboardWebPartProps {
    projectsListTitle: string;
    tasksListTitle: string;
}
export default class ProjectDashboardWebPart extends BaseClientSideWebPart<IProjectDashboardWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ProjectDashboardWebPart.d.ts.map