const path = require("path");
const Koa = require("koa");
//解析请求
const KoaBody = require("koa-body");
//处理图片
const KoaStatic = require("koa-static");
//对请求数据进行检验
const KoaParameter = require("koa-parameter");

const router = require("./router");

const app = new Koa();

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "./upload"),///文件上传目录
      keepExtensions: true,//是否保存原扩展形式
    },
    parsedMethods: ["POST"],
  })
);

app.use(KoaParameter(app));
app.use(router.routes()).use(router.allowedMethods());
app.use(KoaStatic(path.join(__dirname, "./upload")));

app.listen("8000", () => {
  console.log(`server is running on http://localhost:8000`);
});

//初始化表
// const db = require("./config/db");
// const Article = require("./model/article.modal");
// const Classify = require("./model/classify.modal");
// const Tag = require("./model/tag.modal");
// Classify.hasOne(Article, {
//   foreignKey: "classifyId",
// });
// Tag.hasMany(Article, {
//   foreignKey: "tagId",
// });
// db.sync({ force: true });
