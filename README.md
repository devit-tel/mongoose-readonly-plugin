# Mongoose readonly plugin

mongoose plugin for prevent field update

### Installing

```
npm install --save mongoose-readonly-plugin
```

### Example

```
const mongoose = require('mongoose')
const readonlyPlugin = require('mongoose-readonly-plugin')

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    readonly: true,
  },
  lastName: String,
  email: {
    type: String,
    readonly: true,
  },
})

userSchema.plugin(readonlyPlugin, { silent: true })

mongoose.model('User', userSchema)
```

## License

```
MIT License

Copyright (c) 2018 Paiboon Auengkongkatong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
