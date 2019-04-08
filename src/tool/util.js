/*
 * @Author: 汤国栋
 * @Date: 2019-04-08 11:29:41
 * @Last Modified by: 汤国栋
 * @Last Modified time: 2019-04-08 11:32:43
 * 
 * 工具类
 */
// 清除 Storage
// eslint-disable-next-line import/prefer-default-export
export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
