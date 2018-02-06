# fe-useful-utils
Useful code snippet for front-end programmer.


### 如何使用？

```
npm install fe-useful-utils

```

**浏览器 方式**   

使用script 标签引入 js文件即可

**ES Module 方式**

```
import Util from 'fe-useful-utils'

//eg.
alert(Util.UA.isMobile())

```

**CommonJS 方式**

```
var Util = require('fe-useful-utils')

//eg.
alert(Util.UA.isMobile())

```

### 其他工具

```
//使用rem.js
import 'fe-useful-utils/lib/util/rem.js'

//使用reset.css
import 'fe-useful-utils/lib/style/pc_reset.css'

```

> 如果想在浏览器中使用， 直接引入lib中的各种文件即可
