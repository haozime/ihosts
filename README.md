# ihosts
---
## how to use

```
import ihosts from 'ihosts'
ihosts.set({
  127.0.0.1: [
    'www.tmall.com',
    'www.taobao.com'
  ]
}).then(() => {
  console.log('success')
})
```

```
ihosts.remove([
  'www.tmall.com',
  'www.taobao.com'
]).then()
```
