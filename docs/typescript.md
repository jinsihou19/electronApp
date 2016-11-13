# tsconfig.json部分参数说明

在项目中使用的是tsconfig配置是：
```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "sourceMap": true,
    "target": "es6",
    "jsx": "preserve",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  }
}
```

* strictNullChecks：严格的null检查模式；
* sourceMap：生成相应的'.map'文件，方便调试；
* target：由于我们使用Babel，目标语言选择es6；
* jsx：使用preserve模式，preserve生成jsx，以供后续的转换操作使用（比如：Babel），react模式直接生成js；
* moduleResolution：使用node的模块策略；
* allowSyntheticDefaultImports：允许从没有设置默认导出的模块中默认导入，仅为了类型检查。
* 目前我们使用的是npm安装@type/xx库引入不存在的.d.ts

### compilerOptions
"compilerOptions"可以被忽略，这时编译器会使用默认值。在这里查看完整的[编译选项](/compilerOptions.md)列表。

### files
如果"files"和"include"都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（.ts, .d.ts 和 .tsx），排除在"exclude"里指定的文件。JS文件（.js和.jsx）也被包含进来如果allowJs被设置成true。 如果指定了"files"或"include"，编译器会将它们结合一并包含进来。 使用"outDir"指定的目录下的文件永远会被编译器排除，除非你明确地使用"files"将其包含进来（这时就算用exclude指定也没用）。

使用"include"引入的文件可以使用"exclude"属性过滤。 然而，通过"files"属性明确指定的文件却总是会被包含在内，不管"exclude"如何设置。 如果没有特殊指定，**"exclude"默认情况下会排除node_modules，bower_components，和jspm_packages目录**。

任何被"files"或"include"指定的文件所引用的文件也会被包含进来。A.ts引用了B.ts，因此B.ts不能被排除，除非引用它的A.ts在"exclude"`列表中。


### @types，typeRoots和types

默认所有可见的"@types"包会在编译过程中被包含进来。 node_modules/@types文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说，./node_modules/@types/，../node_modules/@types/和../../node_modules/@types/等等。

如果指定了typesRoots，只有typesRoots下面的包才会被包含进来。 比如：
```json
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```
这个配置文件会包含所有./typings下面的包，而不包含./node_modules/@types里面的包。

如果指定了types，只有被列出来的包才会被包含进来。 比如：
```json
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```
这个tsconfig.json文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash和./node_modules/@types/express。/@types/。 node_modules/@types/*里面的其它包不会被引入进来。

指定"types": []来禁用自动引入@types包。

注意，自动引入只在你使用了全局的声明（相反于模块）时是重要的。 如果你使用import "foo"语句，TypeScript仍然会查找node_modules和node_modules/@types文件夹来获取foo包。