export class MyPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  GetX() {
    return this.x;
  }

  GetY() {
    return this.y;
  }

  getScript() {
    return `${this.x} ${this.y}`;
  }

  GetTag() {
    var rect = new RectTag(this.x - 3, this.y - 3, 5, 5);
    rect.SetFill("red");
    return rect;
  }
}

export class BaseTag {
  constructor() {
    this.name = "";
    this.fill = "blue";
    this.stroke = "none";
    this.strokewidth = 5;
    this.opacity = 1;
  }

  move(dx, dy) {}

  resize(scale) {}

  getScript() {
    return ``;
  }

  setFill(fill) {
    this.fill = fill;
    return this;
  }

  setStroke(stroke) {
    this.stroke = stroke;
    return this;
  }

  setStrokeWidth(strokewidth) {
    this.strokewidth = strokewidth;
    return this;
  }

  setOpacity(opacity) {
    this.opacity = opacity;
    return this;
  }

  setOtherStyle(script) {
    script = this.setAtt(script, "fill", `${this.fill}`);
    script = this.setAtt(script, "stroke", `${this.stroke}`);
    script = this.setAtt(script, "stroke-width", `${this.strokewidth}`);
    script = this.setAtt(script, "opacity", `${this.opacity}`);
    return script;
  }

  //文字列を受け取ってそれに属性を付け加える関数
  setAtt(script, att, value) {
    if (value == "") return script;
    script = script.replace("cursor", ` ${att}="${value}"cursor`);
    return script;
  }
}

export class SvgTag extends BaseTag {
  constructor(width = 1920, height = 1080) {
    super();
    this.name = "svg";
    this.width = width * 1;
    this.height = height * 1;
    this.childs = [];
    this.vp_x = 0;
    this.vp_y = 0;
    this.vp_width = 1920;
    this.vp_height = 1080;
    this.id = "tako";
    this.classname = "";
  }

  setClassName(classname) {
    this.classname = classname;
  }

  add(child) {
    this.childs.push(child);
  }

  setViewPort(x, y, width, height) {
    this.vp_x = x;
    this.vp_y = y;
    this.vp_width = width;
    this.vp_height = height;
  }

  setID(id) {
    this.id = id;
  }
  getID() {
    return this.id;
  }

  getScript() {
    var script = `<${this.name} cursor >`;

    script = this.setAtt(script, "id", this.id);
    script = this.setAtt(script, "class", this.classname);
    script = this.setAtt(script, "width", this.width);
    script = this.setAtt(script, "height", this.height);
    script = this.setAtt(
      script,
      "viewBox",
      `${this.vp_x}, ${this.vp_y}, ${this.vp_width}, ${this.vp_height}`
    );
    script = this.setAtt(script, "xmlns=", "http://www.w3.org/2000/svg");
    script = script.replace("cursor", " ");

    //子を埋め込む
    for (var i = 0; i < this.childs.length; i++) {
      script += this.childs[i].getScript();
    }
    script += `</${this.name}>`;
    return script;
  }
}

export class RectTag extends BaseTag {
  constructor(x, y, width, height) {
    super();
    this.name = "rect";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getScript() {
    var script = `<${this.name} cursor />`;
    script = this.setAtt(script, "x", `${this.x}`);
    script = this.setAtt(script, "y", `${this.y}`);
    script = this.setAtt(script, "width", `${this.width}`);
    script = this.setAtt(script, "height", `${this.height}`);
    script = this.setOtherStyle(script);
    script = script.replace("cursor", " ");

    return script;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  resize(scale) {
    this.width *= scale;
    this.height *= scale;
  }
}

export class CircleTag extends BaseTag {
  constructor(cx, cy, r) {
    super();
    this.name = "circle";
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  getScript() {
    var script = `<${this.name} cursor />`;
    script = this.setAtt(script, "cx", `${this.cx}`);
    script = this.setAtt(script, "cy", `${this.cy}`);
    script = this.setAtt(script, "r", `${this.r}`);
    script = this.setOtherStyle(script);
    script = script.replace("cursor", " ");

    return script;
  }

  move(dx, dy) {
    this.cx += dx;
    this.cy += dy;
  }

  resize(scale) {
    this.r *= scale;
  }
}

export class GroupTag extends BaseTag {
  constructor() {
    super();
    this.name = "g";
    this.childs = [];
  }

  add(child) {
    this.childs.push(child);
  }

  getScript() {
    var script = `<${this.name} cursor />`;
    script = this.setOtherStyle(script);
    script = script.replace("cursor", " ");

    for (var i = 0; i < this.childs.length; i++) {
      script += this.childs[i].getScript();
    }
    script += `</${this.name}>`;
    return script;
  }

  move(dx, dy) {
    for (var i = 0; i < this.childs.length; i++) {
      this.childs[i].move(dx, dy);
    }
  }
}

export class ImageTag extends BaseTag {
  constructor(x, y, width, path) {
    super();
    this.name = "image";
    this.x = x;
    this.y = y;
    this.width = width;
    this.path = path;
  }

  getScript() {
    var script = `<${this.name} cursor />`;
    script = this.setAtt(script, "x", `${this.x}`);
    script = this.setAtt(script, "y", `${this.y}`);
    script = this.setAtt(script, "width", `${this.width}`);
    script = this.setAtt(script, "href", `${this.path}`);
    script = this.setAtt(script, "preserveAspectRatio", `none`);
    script = script.replace("cursor", " ");

    return script;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  resize(scale) {
    this.width *= scale;
  }
}

export class TextTag extends BaseTag {
  constructor(x, y, text) {
    super();
    this.name = "text";
    this.x = x;
    this.y = y;
    this.font_family = "serif";
    this.font_size = 35;
    this.font_weight = "normal";
    this.text = text;
  }
  setFontWeight(font_weight) {
    this.font_weight = font_weight;
    return this;
  }

  setFontFamily(font_family) {
    this.font_family = font_family;
    return this;
  }

  setFontSize(font_size) {
    this.font_size = font_size;
    return this;
  }

  getScript() {
    var script = `<${this.name} cursor >`;
    script = this.setAtt(script, "x", `${this.x}`);
    script = this.setAtt(script, "y", `${this.y}`);
    script = this.setAtt(script, "font-family", this.font_family);
    script = this.setAtt(script, "font-size", `${this.font_size}`);
    script = this.setAtt(script, "font-weight", `${this.font_weight}`);
    script = this.setOtherStyle(script);
    script = script.replace("cursor", " ");

    script += this.text;

    script += `</${this.name}>`;
    return script;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  resize(scale) {
    this.x *= scale;
    this.y *= scale;
    this.font_size *= scale;
  }
}
