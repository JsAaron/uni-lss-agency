### uni-axios

使用axios封装request 网络请求库

**安装**

```
npm install --save axios
```

**使用方式：**

使用方法同 axios。

```javascript
import axios from '@/js_sdk/gangdiedao-uni-axios'
axios
  .get('https://xxxx.com/api/v1/')
  .then(res => {
    console.log(res.data)
  })
```
