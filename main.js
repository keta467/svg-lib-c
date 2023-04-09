class TestClass {
  sayHello() {
    console.log("hello!!!!!変更2");
  }
}

class RectTag {
  getScript() {
    return "aiueo";
  }
}

export default {
  TestClass,
  RectTag,
};

//これ単体で動くアプリをつくりたいが、、
document.getElementById("root").innerHTML += "dddddd";
