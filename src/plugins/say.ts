/**
 * @name: say
 * @author: liuzhichao
 * @date: 2021-05-20
 * @description：say
 * @update: 2021-05-20
 */
export default {
  install: (app: any, options: any) => {
    console.log("安装插件");
    app.prototype.$hello = () => {
      console.log("全局属性已挂载");
      if (options) {
        console.log("全局选项是：", options);
      }
    };
  }
};
