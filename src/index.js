import {
  Alert,
  Autocomplete,
  Badge,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  InputTree,
  InputMasked,
  InputNumber,
  Popover,
  Progress,
  Pagination,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  Slider,
  Scroll,
  Switch,
  Step,
  Steps,
  Table,
  TableColumn,
  Tag,
  TimePicker,
  TimeSelect,
  Tooltip,
  Transfer,
  Tree,
  Tabs,
  TabPane,
  Upload,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  SubMenu,
  Option,
  OptionGroup,
  Loading
} from './packages'
const components = [
  Alert,
  Autocomplete,
  Badge,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  InputTree,
  InputMasked,
  InputNumber,
  Popover,
  Progress,
  Pagination,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Scroll,
  Step,
  Steps,
  Table,
  TableColumn,
  Tag,
  TimePicker,
  TimeSelect,
  Tooltip,
  Transfer,
  Tree,
  Tabs,
  TabPane,
  Upload,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  SubMenu,
  Option,
  OptionGroup
]
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
const GlsxVueComponents = {}
GlsxVueComponents.install = Vue => {
  Vue.use(ElementUI)
  components.map(component => {
    Vue.component(component.name, component)
  })
  Vue.use(Loading.directive)
  Vue.prototype.$loading = Loading.service
}
if (typeof window !== 'undefined' && window.Vue) {
  GlsxVueComponents.install(window.Vue)
}
export default GlsxVueComponents
