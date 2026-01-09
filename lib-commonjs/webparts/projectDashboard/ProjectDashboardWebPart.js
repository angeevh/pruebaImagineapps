"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// ProjectDashboardWebPart.ts
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
var ProjectDashboard_1 = require("./components/ProjectDashboard");
var pnp_1 = require("./services/pnp");
var ProjectDashboardWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(ProjectDashboardWebPart, _super);
    function ProjectDashboardWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectDashboardWebPart.prototype.render = function () {
        (0, pnp_1.initSP)(this.context);
        var element = React.createElement(ProjectDashboard_1.ProjectDashboard, {
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
            return sp_core_library_1.Version.parse('1.0');
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
                                (0, sp_property_pane_1.PropertyPaneTextField)('projectsListTitle', { label: 'Título lista Proyectos' }),
                                (0, sp_property_pane_1.PropertyPaneTextField)('tasksListTitle', { label: 'Título lista Tareas' }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return ProjectDashboardWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = ProjectDashboardWebPart;
//# sourceMappingURL=ProjectDashboardWebPart.js.map