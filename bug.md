- 生产环境打包后，访问 popup 无法链接到 background；background 与 popup 公用的变量使用后出现无法链接到 background

  ”我真傻，真的“。
  之前 manifest 中对于 background 使用 script 加载文件，然而 background 与 popup 的公用代码被我提取打包了，我完全忘记了这一点，口诺八嘎！还是偷懒用 html 引入吧。
