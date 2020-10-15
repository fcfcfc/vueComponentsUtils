# vue-components-utils  
适用于PC端项目的vue组件和可自定义的Element组件  
## 目录  
- [安装](#安装)  
- [使用](#使用)  
  - [全部引用](#全部引用)   
  - [按需引用](#按需引用)   
- [scss-flex](#此库引用的scss-flex插件)  
  - [安装](#安装)  
  - [引用](#引用)  
  - [示例](#示例)
  - [使用说明](#使用说明)  
    - [写在父项目的属性](#写在父项目的属性)  
    - [写在子项目的属性](#写在子项目的属性)  
- [组件介绍](#组件介绍)  
  - [CollapseTransition-折叠展开动画](#CollapseTransition)
  - [ComponentFadeOutIn-显示隐藏的Vue过渡状态](#ComponentFadeOutIn)
  - [MyAudio-html5的audio标签](#MyAudio)
  - [MyBtn-div组成的button](#MyBtn)
  - [MyFlowChart-可自定义的流程图（暂时为demo）](#MyFlowChart)
  - [MyFlvVideo-播放器组件，支持flv和mp4](#MyFlvVideo)
  - [MyVideo-播放器组件，支持m3u8、直播和mp4](#MyVideo)
  - [MyMask-可自定义的全屏遮罩](#MyMask)
  - [MyQRCode-可生成带有logo的二维码](#MyQRCode)
  - [MySaveToPDF-将指定DOM转为PDF后下载或者打印](#MySaveToPDF)
  - [MySendMessageBox-发送验证按钮，验证码发出后倒计时](#MySendMessageBox)
  - [MySwiper-封装的Swiper组件](#MySwiper)
- [写在最后](#写在最后)  
## 安装  
```sh
$ npm install --save vue-components-utils
```  
## 使用  
#### 全部引用
在main.js中设置如下
```sh
import componentsUtils from 'vue-components-utils'
Vue.use(componentsUtils)
```  
#### 按需引用  
1.安装babel-plugin-component插件
```sh
npm install babel-plugin-component -D
```  
2.修改babel.config.js
```sh
plugins: [
//其它插件
[
  "component",
  {
    libraryName: "vue-components-utils",
    "camel2Dash": false,
    "style": true
  }
]
]
```  
3.在main.js中按需引入你要用到的组件，比如MyAudio
```sh
import { MyAudio } from "vue-components-utils";
Vue.use(MyAudio);
```  
## 此库引用的scss-flex插件
#### 安装
```sh
npm install --save scss-flex
```  
#### 引用
在需要的地方引用即可
```sh
require('scss-flex');
```  
#### 示例
```
<div flex="main:center cross:center dir:top item:end">
```
#### 使用说明
##### 写在父项目的属性
###### dir：主轴方向  
- top：从上到下  
- right：从右到左
- bottom：从下到上
- left：从左到右（默认）  
###### wrap: 换行方式  
- nowrap：不换行（默认）
- wrap：换行，第一行在上方
- reverse：换行，第一行在下方
###### flow: 布局方式  
- left-nowrap: 从左到右且不换行(默认)  
- left-wrap: 从左到右且换行，第一行在上方  
- left-reverse: 从左到右且换行，第一行在下方  
- right-nowrap: 从右到左且不换行  
- right-wrap: 从右到左且换行，第一行在上方  
- right-reverse: 从右到左且换行，第一行在下方  
- top-nowrap: 从上到下且不换行  
- top-wrap: 从上到下且换行，第一行在上方  
- top-reverse: 从上到下且换行，第一行在下方  
- bottom-nowrap: 从下到上且不换行  
- bottom-wrap: 从下到上且换行，第一行在上方  
- bottom-reverse: 从下到上且换行，第一行在下方  
###### main：主轴对齐方式  
- right：从右到左  
- left：从左到右（默认）  
- between：两端对齐  
- around: 分散对齐  
- center：居中对齐  
###### cross：交叉轴对齐方式  
- top：从上到下（默认）  
- bottom：从上到下  
- baseline：基线对齐  
- center：居中对齐  
- stretch：高度并排铺满  
###### main-cross: 主轴交叉轴对齐方式  
- center: 居中  
###### content: 多根轴线的对齐方式  
- stretch: 轴线占满整个交叉轴（默认）  
- start: 与交叉轴的起点对齐  
- end: 与交叉轴的终点对齐  
- center: 与交叉轴的中点对齐  
- between: 与交叉轴两端对齐，轴线之间的间隔平均分布  
- around: 每根轴线两侧的间隔都相等  
###### box：子元素设置  
- mean：子元素平分空间  
- first：第一个子元素不要多余空间，其他子元素平分多余空间  
- last：最后一个子元素不要多余空间，其他子元素平分多余空间  
- justify：两端第一个元素不要多余空间，其他子元素平分多余空间  
##### 写在子项目的属性
###### item: 允许单个项目有与其他项目不一样的对齐方式  
- auto: 继承父元素的 align-items 属性（默认）  
- start: 居于轴顶部对齐  
- end: 居于轴尾部对齐  
- center：居于轴中心对齐  
- baseline：居于基线对齐  
- stretch：充满整个轴  
###### order: 定义项目的排列顺序。数值越小，排列越靠前，默认为0    
- 0~12  
- -1~-12  
###### flex-box: 自定义项目的放大或者缩小比例    
- 0~10  
## 组件介绍  
#### CollapseTransition  
###### 示例
```sh
<collapse-transition dimension="width">
    <div>内容</div>
</collapse-transition>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
dimension | String | 纵向 | 横向收缩还是纵向收缩，设置为'width'时变为横向
duration | Number | 300 | 动画时长，毫秒
#### ComponentFadeOutIn  
###### 示例
```sh
<component-fade-out-in>
    <div>内容</div>
</component-fade-out-in>
```  
#### MyAudio  
###### 示例
```sh
<my-audio ref="myAudio" audioSrc="src" @audioEnd="()=>{}"/>
---
this.$refs.myAudio.playAudio()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
audioSrc | String | '' | 音频地址
ifHide | Boolean | false（隐藏） | 是否隐藏音频播放控件的显示
###### 监听方法  
**_audioEnd_**：监听播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
playAudio | 播放 | - | - | -
pauseAudio | 暂停 | - | - | -
#### MyBtn  
###### 示例
```sh
<my-btn background-color-hover="red" :not-used="notUsed" @myClick="notUsed=true"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
text | String | '' | 按钮的文字
color | String | '' | 自定义按钮文字颜色
borderColor | String | '' | 按钮的边框颜色，不设置时不显示边框
backgroundColor | String | '' | 自定义按钮背景颜色
backgroundColorHover | String | '' | 自定义按钮在hover时的背景颜色
width | String | '100%' | 按钮的宽度
height | String | '48px' | 按钮的高度
fontSize | String | '18px' | 按钮的字体大小
borderRadius | String | '4px' | 按钮的四边圆角大小
notUsed | Boolean | false（不禁用） | 是否禁用按钮
alwaysUse | Boolean | false（不启用） | 是否在notUsed设置为true时还启用按钮的点击事件
###### 监听方法  
**_myClick_**：点击了按钮
#### MyFlowChart  
###### 示例
```sh
<my-flow-chart/>
```  
#### MyFlvVideo  
###### 示例
```sh
<my-flv-video ref="myFlvVideo" audioSrc="src" @endedEvent="()=>{}"/>
---
this.$refs.myFlvVideo.play()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '' | 播放器宽度
height | String | '' | 播放器高度
videoSrc | String | '' | 视频地址
type | String | 'mp4' | 加载的视频格式，可选'flv'或者'mp4'
###### 监听方法  
**_endedEvent_**：播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
start | 组件初始化 | notPlay | 设置true时初始化后不立即播放 | -
play | 播放 | - | - | -
pause | 暂停播放 | - | - | -
destroyFn | 组件的销毁 | - | - | -
###### 注意事项  
1. 在父组件中需要手动调用此组件的start方法进行初始化，初始化成功后将自动播放
#### MyVideo  
###### 示例
```sh
<my-video ref="myVideo" audioSrc="src" @endedEvent="()=>{}"/>
---
this.$refs.myVideo.play()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '' | 播放器宽度
height | String | '' | 播放器高度
videoSrc | String | '' | 视频地址
videoType | String | 'application/x-mpegURL' | 视频类型，还可设为video/mp4
###### 监听方法  
1. **_onPlayerReady_**：组件准备就绪的监听
2. **_endedEvent_**：播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
play | 播放 | - | - | -
pause | 暂停播放 | - | - | -
destroy | 组件的销毁 | - | - | -
###### 注意事项  
1. 需要在模版文件引入以下   
   ```sh
    <link href="https://unpkg.zhimg.com/video.js/dist/video-js.min.css" rel="stylesheet">
    <script src="https://unpkg.zhimg.com/video.js/dist/video.min.js"></script>
   ```    
2. 在vue.config.js中需要如下配置   
    ```sh
    configureWebpack: config => {
      config.externals = {
          'videojs': 'videojs'
      }
    }
    ```    
3. 在父组件中监听onPlayerReady成功后调用此组件的play方法进行播放
#### MyMask  
###### 示例
```sh
<my-mask width="450px"/>
```  
###### 插槽  
该组件共有3个插槽，分别为title（标题的dom），closeBtn（关闭按钮的dom），content（内容的dom）
```sh
<my-mask :width="width" :min-top="62" class="projectMask">
    <div slot="title" class="projectMaskTitleText" flex="cross:center">{{title}}</div>
    <div slot="closeBtn" @click="closeBtnFn" class="closeBtn"></div>
    <slot slot="content"/>
</my-mask>
``` 
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '450px' | 弹出框的宽度
minTop | Number | 0 | 允许拖拽的最大高度
initTop | String | ''（居中） | 初始top值
bgcColor | String | 'rgba(#FFFFFF, .6)' | 遮罩背景颜色
hideShadow | Boolean | false（不取消） | 取消阴影
#### MyQRCode  
###### 示例
```sh
<my-q-r-code :logoScale="0.2"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
logoScale | Number | 0.2 | 用于计算 LOGO 大小的值, 过大将导致解码失败, LOGO 尺寸计算公式 logoScale*(size-2*margin)
logoSrc | String | '' | 嵌入至二维码中心的logo图片地址
text | String | '' | 欲编码的内容
size | Number | 0 | 尺寸, 正方形, 包含外边距
###### 注意事项  
1. logoScale不要设置的过大，否则识别不了
#### MySaveToPDF  
###### 示例
```sh
import { MySaveToPDF } from "vue-component-utils";
MySaveToPDF.methods.saveToPDFFn('我的模拟实践训练成绩', this.$refs.myTable)
MySaveToPDF.methods.printPDFFn(this.$refs.myTable)
```  
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | :------: | :-----: |------
saveToPDFFn | 将指定DOM转为PDF后下载 | pdfName | PDF文档名称 | dom | 要转换的dom | -
printPDFFn | 将指定DOM转为PDF后打印 | dom | 要转换的dom | - | - | -
###### 注意事项  
1. printPDFFn方法只能在弹出的新窗口打印
#### MySendMessageBox  
###### 示例
```sh
<my-send-message-box ref="mySendMessageBox" audioSrc="src" @endedEvent="()=>{}"/>
---
this.$refs.mySendMessageBox.sendSmsSuccess()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifCheckPwd | Boolean | false（不检查） | 是否检查密码
password | String | '' | 密码
phoneNumber | String | '' | 手机号
fontSize | String | '18px' | 按钮的字体大小
height | String | '48px' | 高度
###### 监听方法  
**_sendSms_**：点击了按钮
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
sendSmsSuccess | 调接口成功后调用此方法，开始倒计时并且不能点击 | - | - | -
sendSmsFail | 调接口失败后调用此方法，重置为初始状态 | - | - | -
###### 注意事项  
1. 此组件需要在父组件中手动调用组件内的方法使用
#### MySwiper  
###### 示例
```sh
<my-swiper ref="mySwiper" :slidesArr="[]" @getCurrentActiveIndex="activeIndex=>{}"/>
---
this.$refs.mySwiper.slideToIndex(index)
```  
###### 插槽
```sh
<template v-slot:default="slotProps"></template>
```  
其中slotProps.itemInfo.item为对应的数据，slotProps.itemInfo.index为对应的下标
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
slidesArr | Array | [] | slide数组
slidesPerView | Number | 1 | 设置slider容器能够同时显示的slides数量，可设的值为number值或者auto
freeMode | Boolean | false（普通模式） | 普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
slideWidth | String | '' | 强制改变slide的宽度
scrollbarIndex | String | '' | 滚动条index，页面中有多个swiper时需给各个组件设置index
useScrollbar | Boolean | false（不启用） | 是否启用滚动条
scrollbarDragBgc | String | 'rgba(0, 0, 0, 0.5)' | 滚动条中拖动块的背景颜色
scrollbarBgc | String | 'rgba(0, 0, 0, 0.1)' | 滚动条的背景颜色
###### 监听方法  
**_getCurrentActiveIndex_**：监听activeIndex值的变化，返回activeIndex
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 参数2 | 参数2含义 | 返回值
:------: | ----- | :------: | :-----: | :------: | :-----: | ------
slideToIndex | 滑动到指定index | index | 要滑动到的slide的index | - | - | -
updateSize | 这个方法会重新计算Swiper的尺寸。 | - | -| - | - | -
## 写在最后  
个人开发和维护，有需求或者bug请提Issues或者邮箱，看到后会第一时间解决   
Email：323247568@qq.com   
