const {
  servicePage,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
  serviceSelectOne,
} = require("../service/article.service");

class ArticleController {
  //新增
  async articleCreate(ctx, next) {
    try {
      const res = await serviceCreate(ctx.request.body);
      ctx.body = {
        result: 0,
        message: "新增文章成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //修改
  async articleUpdate(ctx, next) {
    try {
      const res = await serviceUpdate(ctx.request.body);
      if (res) {
        ctx.body = {
          result: 0,
          message: "修改成功",
          data: null,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //是否展示
  async articleChangeShow(ctx, next) {
    try {
      const { show, id } = ctx.request.body;
      const res = await serviceUpdate({ show: show ? 1 : 0, id });
      if (res) {
        ctx.body = {
          result: 0,
          message: "修改展示成功",
          data: null,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //删除
  async articleDelete(ctx, next) {
    const { id } = ctx.request.body;
    try {
      const res = await serviceDelete(id);
      if (res) {
        ctx.body = {
          result: 0,
          message: "删除成功",
          data: null,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //根据id查找数据
  async articleSelectOne(ctx, next) {
    const { id } = ctx.request.body;
    try {
      const res = await serviceSelectOne(id);
      if (res) {
        ctx.body = {
          result: 0,
          message: "查询成功",
          data: {
            ...res,
          },
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }

  //分页
  async articlePage(ctx, next) {
    const {
      page: pageNum = 1,
      rows: pageSize = 10,
      ...obj
    } = ctx.request.query;
    try {
      const res = await servicePage(pageNum, pageSize, obj);
      ctx.body = {
        result: 0,
        message: "查询成功",
        data: {
          ...res,
        },
      };
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new ArticleController();
