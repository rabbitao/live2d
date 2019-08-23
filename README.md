# live2d3
## model对象支持的方法
``` javascript
/** 执行一个指定的动画
 * @Param object: { groupName: 动作组名称
 *                  no: 动作索引. 当前动作组内如果有多个动画, 执行索引指定的那个. 默认为0
 *                  priority: 动画权重(默认2).
 *                  callback: 当前动作执行完毕后触发
 *                }
 */
startMotion({groupName: string, no?: number, priority?: number, callback?: () => void})
```

``` javascript
/** 在指定的动画组内随机选择一个动画执行
 * @Param groupName: 动画组名称
 * @Param priority: 动画权重(默认2)
 */
startRandomMotion(groupName: string, priority?: number)
```

``` javascript
/** 执行一个动画队列
 * @Param objectArray: 同startMotion()参数, 是一个数组
 * @Param clear: 为true则清除当前已存在的队列. 否则进行队列追加.  默认false. 
 */
startMotionQueue([{groupName: string, no?: number, priority?: number, callback?: () => void}], clear?: boolean)
```
  
``` javascript
/** 停止全部动作
 * @Param clear: 停止动作后是否清除画板. (默认false. 停止动画后会执行idle, 没有idle时画布会保留当前动画的最后一帧)
 */
stopAllMotions(clear?: boolean)
```

``` javascript
/** 用指定的动画组替换默认发呆的动画组. 该动画自动循环
 * @Param groupName: 动画组名称
 */
replaceIdleMotion(groupName: string)
```

``` javascript
/** 
 *  清除画布 并终止默认的绘画动作
 */
clear()
```
  
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
