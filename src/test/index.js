// // 组合继承(盗用构造函数+原型链)
// function Father() {
//   console.log("调用了father构造函数");
//   this.familyName = "Liu";
//   this.lastName = "BaBa";
//   this.national = "China";
// }
// Father.prototype.say = function() {
//   console.log("I am Chinese");
// };
//
// function Son() {
//   //用盗用构造函数来继承Father属性（保证所有实例都有单独的属性指向）
//   console.log("第一步");
//   Father.call(this);
//   // 赋值属性写在call之后  不然会覆盖
//   this.lastName = "ErZi";
// }
// console.log("第二步");
// // 用原型链的方式继承Father方法（保证所有实例的方法都指向一个内存地址）
// Son.prototype = new Father();
//
// const son = new Son();
// console.log(Son.prototype);
// console.log("song-familyName:", son.familyName);
// console.log("song-lastName:", son.lastName);
// console.log("song-national:", son.national);
// son.say();

// const Person = class PersonName {
//   logFunction() {
//     console.log(Person.name, PersonName.name);
//   }
// };
// const p = new Person();
// p.logFunction();
// console.log(Person.name);
// console.log(PersonName.name); //PersonName is not defined

let firstFunc = function() {
  console.log("I am first");
};

const _firstF = firstFunc;

firstFunc = function() {
  console.log("Do Sth before first");
  _firstF();
};
firstFunc();

Function.prototype.before = function(fn) {
  const _this = this; // 用来保存调用这个函数的引用，如func_1调用此函数，则_this指向func_1
  return function() {
    // 返回一个函数，这个函数包含原函数和新函数，原函数指的是func_1，新函数指的是fn
    fn.apply(this, arguments); // 执行新函数
    return _this.apply(this, arguments); // 执行原函数
  };
};

Function.prototype.after = function(fn) {
  const _this = this;
  return function() {
    const r = _this.apply(this, arguments); // 先执行原函数，也就是func_1
    fn.apply(this, arguments); // 再执行新函数
    return r;
  };
};

let func_1 = function() {
  console.log("2");
};

func_1 = func_1
  .before(function() {
    console.log("1");
  })
  .after(function() {
    console.log("3");
  });

func_1(); // 输出1、2、3

function before(target, key, descriptor) {
  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      console.log("before");
      return fn.apply(this, arguments);
    }
  };
}
function after(target, key, descriptor) {
  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      const result = fn.apply(this, arguments);
      console.log("after");
      return result;
    }
  };
}
class Test {
  @after
  @before
  func() {
    console.log("func");
  }
}
const test = new Test();
test.func();
