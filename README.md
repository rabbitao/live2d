# 基于live2d 3.3.1
## 安装
``` bash
$ yarn add find-live2d3
or
$ npm install find-live2d3
```
## 初始化
``` javascript
import live2d from 'find-live2d3'
/** 初始化live2d
 * @param object: {width: number, height:number} 画布的大小
 */
const live2dmanager = live2d.initialize({width: number, height:number})
```

``` javascript
/** 添加模型
 * @param object: { path: string, // 模型资源路径, 
 *                  fileName: string    // 模型文件名称(.model3.json之前)
 *                  modelName: string,  // 模型名称,
 *                  textures?: string[] // 纹理名称数组(为空则加载全部纹理)
 *                }
 * @return Promise<Model>
 */
public Promise live2dmanager.addModel({path: '/resource/momo/', fileName:'momo', modelName: 'momo'}).then((model) => {});
```

## model对象方法
``` javascript
/**
 * 显示当前模型
 * @param object: {
 *                  pointX: 出现的x坐标. 默认0
 *                  pointY: 出现的Y坐标. 默认0
 *                }
 */
public void appear(param: { pointX: number, pointY: number})
```

``` javascript
/**
 * 隐藏当前模型
 */
public void disappear()
```

``` javascript
/** 执行一个指定的动画
 * @param object: { groupName: 动作组名称
 *                  no: 动作索引. 当前动作组内如果有多个动画, 执行索引指定的那个. 默认为0
 *                  priority: 动画权重(默认2).
 *                  callback: 当前动作执行完毕后触发
 *                }
 * @return Promise<Model>
 */
public Promise startMotion({groupName: string, no?: number, priority?: number, callback?: () => void})
```

``` javascript
/** 在指定的动画组内随机选择一个动画执行
 * @param groupName: 动画组名称
 * @param priority: 动画权重(默认2)
 * @return Promise<Model>
 */
public Promise startRandomMotion(groupName: string, priority?: number)
```

``` javascript
/** 执行一个动画队列
 * @param objectArray: 同startMotion()参数, 是一个数组
 * @param clear: 为true则清除当前已存在的队列. 否则进行队列追加.  默认false. 
 * @return Promise<Model>
 */
public Promise startMotionQueue([{groupName: string, no?: number, priority?: number, callback?: () => void}], clear?: boolean)
```
  
``` javascript
/** 停止全部动作
 * @param clear: 停止动作后是否清除画板. (默认false. 停止动画后会执行idle, 没有idle时画布会保留当前动画的最后一帧)
 */
public void stopAllMotions(clear?: boolean)
```

``` javascript
/** 用指定的动画组替换默认发呆的动画组. 该动画自动循环
 * @param groupName: 动画组名称
 */
public void replaceIdleMotion(groupName: string)
```

``` javascript
/** 设置表情
 * @param expressionId: 表情id(model3.json Expressions字段配置 例: f01)
 */
public void setExpression(expressionId: string)
```

``` javascript
/** 
 * 随机使用一个表情
 */
public void setRandomExpression()
```

``` javascript
/** 
 *  清除画布 并终止默认的绘画动作
 */
public void clear()
```

``` javascript
/** 
 *  张嘴
 */
public void mouthOpen()
```

``` javascript
/** 
 *  闭嘴
 */
public void mouthClose()
```

``` javascript
/** 使模型的眼睛注视某个坐标点
 *  @param pointX x坐标
 *  @param pointY y坐标
 *  注: 坐标是以模型原点为(0,0)点, 进行象限分布
 *  例: 看向左下(第三象限) 坐标可为(-500, -500)
 */
public void lookAt(pointX: number, pointY: number)
```
  
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
