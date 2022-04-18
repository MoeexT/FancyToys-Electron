import { App } from "vue";
import { Breadcrumb, Layout, Menu } from "ant-design-vue";
const components = [Layout, Breadcrumb, Menu];

export default (app: App) => {
  components.forEach((component) => {
    app.use(component);
  });
};
