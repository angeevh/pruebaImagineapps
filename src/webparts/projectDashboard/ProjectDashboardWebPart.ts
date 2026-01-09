// ProjectDashboardWebPart.ts
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ProjectDashboard } from './components/ProjectDashboard';
import { initSP } from './services/pnp';

export interface IProjectDashboardWebPartProps {
  projectsListTitle: string;
  tasksListTitle: string;
}

export default class ProjectDashboardWebPart extends BaseClientSideWebPart<IProjectDashboardWebPartProps> {
  public render(): void {
    initSP(this.context);

    const element = React.createElement(ProjectDashboard, {
      projectsListTitle: this.properties.projectsListTitle || 'Proyectos',
      tasksListTitle: this.properties.tasksListTitle || 'Tareas',
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Configuración de listas' },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('projectsListTitle', { label: 'Título lista Proyectos' }),
                PropertyPaneTextField('tasksListTitle', { label: 'Título lista Tareas' }),
              ],
            },
          ],
        },
      ],
    };
  }
}
