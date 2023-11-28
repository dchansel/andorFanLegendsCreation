import Vue from 'vue';

// adding Element UI
import { Button, Row, Col, Collapse, CollapseItem, Container, Header, Main, Aside, Footer, Table, Form, FormItem, Input, TableColumn, Radio, RadioGroup, Dialog, Loading, Tabs, TabPane, Checkbox, CheckboxButton, CheckboxGroup } from 'element-ui';

Vue.use(Button);
Vue.use(Row);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Col);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Table);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Loading);

import App from './components/App';
import store from './store';

new Vue({
  el: '#app',
  render: h => h(App),
  store
});