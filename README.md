## 📖 兼容 ie8 的 React 脚手架

### 1️⃣ 程序命令

- npm install 安装依赖
- npm run dev 开发模式（热加载）
- npm run build 项目打包
- npm run format 格式化项目文件
- npm run eslint-check 检查 eslint 规则是否和 prettier 规则有冲突

### 2️⃣ 开发依赖

- webpack (v1.15.0)
- react (v0.14.9)
- react-router (v2.3.0)
- redux
- axios
- ...

### 3️⃣ 注意说明

- package 内的包不要随意更新。
- IE8 下， Mock.js 无法拦截 ajax 模拟数据，如需要调测，需在 ./script/dev.js 文件中将 ./mock/mock.js 注释。

### 4️⃣ 插件说明

- 文件 jsconfig.json 和 setting.json 是 Visual Studio Code 开发工具所用到的文件，需配合插件 Path Intellisense 使用。
- 项目采用 eslint 和 prettier 进行代码验证，建议使用 VSCode 插件 ESlint 和 Prettier 来配合进行自动格式化代码，统一代码风格。

### 5️⃣ 参考文档

- [react 兼容 IE8 文档](https://github.com/xcatliu/react-ie8)
- [react (v0.14.9)](http://react-ie8.xcatliu.com/react)
- [JavaScript 编码规范](https://github.com/airbnb/javascript)

### 6️⃣ 文件/文件夹说明

| 目录                   | 说明                   |
| ---------------------- | ---------------------- |
| public/                | 外部静态资源           |
| public/index.html      | webpack 打包 html 模板 |
| script/                | webpack 配置文件       |
| script/dev.js          | 开发环境               |
| script/build.js        | 生产环境               |
| script/proxy.js        | 请求代理设置           |
| src/                   | 项目主体               |
| src/component/         | 项目组件               |
| src/component/communal | 项目公用组件           |
| src/static/            | 组件中引入的静态资源   |
| src/style/             | 全局样式               |
| src/tool/              | 工具方法               |
| src/index.js           | 入口文件               |
| src/pages.js           | 异步加载文件           |
| src/reducer.js         | redux 的处理函数       |
| src/router.js          | react-router 路由设置  |
| src/store.js           | redux 设置             |
| .babelrc               | babel 设置             |
| .eslintrc.json         | eslint 设置            |
| .jsconfig.json         | VSCode 对 js 配置      |
| .settings.json         | VSCode 对插件配置      |
| .package.json          | node 项目依赖包管理    |
