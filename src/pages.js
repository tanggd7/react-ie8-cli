/**
|--------------------------------------------------
| 异步加载模块
|--------------------------------------------------
*/
// export const login = (location, callback) => {
//   require.ensure(
//     [],
//     require => {
//       callback(null, require('./components/login'));
//     },
//     'login'
//   );
// };

// export const desktop = (location, callback) => {
//   require.ensure(
//     [],
//     require => {
//       callback(null, require('./components/desktop'));
//     },
//     'desktop'
//   );
// };

// eslint-disable-next-line import/prefer-default-export
export const notfound = (location, callback) => {
  require.ensure(
    [],
    require => {
      callback(null, require('./components/status/not-found'));
    },
    'notFound'
  );
};
