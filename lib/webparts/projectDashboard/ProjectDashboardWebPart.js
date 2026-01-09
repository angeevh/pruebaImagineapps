import { __extends } from "tslib";
// ProjectDashboardWebPart.ts
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ProjectDashboard } from './components/ProjectDashboard';
import { initSP } from './services/pnp';
var ProjectDashboardWebPart = /** @class */ (function (_super) {
    __extends(ProjectDashboardWebPart, _super);
    function ProjectDashboardWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectDashboardWebPart.prototype.render = function () {
        initSP(this.context);
        var element = React.createElement(ProjectDashboard, {
            projectsListTitle: this.properties.projectsListTitle || 'Proyectos',
            tasksListTitle: this.properties.tasksListTitle || 'Tareas',
        });
        ReactDom.render(element, this.domElement);
    };
    ProjectDashboardWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ProjectDashboardWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ProjectDashboardWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return ProjectDashboardWebPart;
}(BaseClientSideWebPart));
export default ProjectDashboardWebPart;
//# sourceMappingURL=ProjectDashboardWebPart.js.map