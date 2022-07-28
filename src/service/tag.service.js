const Tag = require("../model/tag.model");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

class TagService {
  async serviceCreate(obj) {
    const res = await Tag.create(obj);
    return res.dataValues;
  }

  async serviceUpdate(obj) {
    const { id } = obj;
    const res = await Tag.update(obj, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  async serviceDelete(id) {
    const res = await Tag.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  async serviceSelectOne(id) {
    const res = await Tag.findOne({
      where: { id },
    });
    return res.dataValues;
  }

  async serviceEnum() {
    const res = await Tag.findAll();
    let arr = res
      .map((item) => {
        if (item.show) {
          return { id: item.dataValues.id, name: item.dataValues.name };
        }
        return false;
      })
      .filter((value) => !!value == true);
    return arr;
  }

  async servicePage(pageNum, pageSize, obj) {
    let sendObj = removeEmptyObj(obj);
    sendObj.name
      ? (sendObj.name = {
          [Op.like]: `%${sendObj.name || ""}%`,
        })
      : null;
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Tag.findAndCountAll({
      offset,
      limit: pageSize * 1,
      // order: [["updatedAt", "DESC"]],
      where: {
        ...sendObj,
      },
    });
    return {
      total: count,
      rows,
    };
  }
}

module.exports = new TagService();
