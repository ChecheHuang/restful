import { ExpressControllerType } from "../types";
import prisma from "../utils/prisma";
import { CusProfile, CusProfileLabel, Labels } from "@prisma/client";

export const index: ExpressControllerType = async (req, res, next) => {
  try {
    const result = await prisma.cusProfile.findMany({
      orderBy: { id: "asc" },
      include: {
        cus_labels: {
          include: { label: true },
        },
      },
    });
    const data = formatData(result);
    res.data(data).send();
    // res.json({ status: "success", data });
  } catch (error: any) {
    next(error);
  }
};

export const index2: ExpressControllerType = async (req, res, next) => {
  try {
    const page = Number(req.query.page || req.body.page || 1);
    const size = Number(req.query.size || req.body.size);

    let where = {};
    const requestData = { ...req.query, ...req.body }; // 合併 req.query 和 req.body

    for (const key in requestData) {
      if (key === "page" || key === "size") {
        continue; // 跳過 page 和 size 屬性
      }
      const value = requestData[key];
      if (key === "label_name") {
        // 如果 key 是 "label_name"，則添加特定的過濾條件
        where = {
          ...where,
          cus_labels: {
            some: {
              label: {
                label_name: {
                  contains: value,
                },
              },
            },
          },
        };
      } else {
        // 其他 key 保持原來的過濾條件
        where = { ...where, [key]: { contains: value } };
      }
    }

    const total = await prisma.cusProfile.count({ where }); // 總資料數量
    const take = size ? size : total; // 要取得的資料數量
    const skip = (page - 1) * take; // 要跳過的資料數量

    const result = await prisma.cusProfile.findMany({
      where,
      orderBy: { id: "asc" },
      include: {
        cus_labels: {
          include: { label: true },
        },
      },
      skip,
      take,
    });
    const data = formatData(result);
    // res.json({ status: "success", data: { data, total } });

    res.data({ data, total }).send();
  } catch (error: any) {
    next(error);
  }
};

export const create: ExpressControllerType = async (req, res, next) => {
  const {
    cus_name,
    cus_number,
    cus_email,
    cus_idnumber,
    cus_birthday,
    cus_remark,
    cus_status,
    cus_level,
  } = req.body;
  try {
    await prisma.cusProfile.create({
      data: {
        create_user_id: req?.user?.user_id as number,
        cus_name,
        cus_number,
        cus_email,
        cus_idnumber,
        cus_birthday,
        cus_remark,
        cus_status,
        cus_level,
      },
    });
    return res.message("新增成功").send();
  } catch (error: any) {
    next(error);
  }
};
export const edit: ExpressControllerType = async (req, res, next) => {
  const { id } = req.params;
  const {
    cus_name,
    cus_number,
    cus_email,
    cus_idnumber,
    cus_birthday,
    cus_remark,
    cus_status,
    cus_level,
    label_names,
  } = req.body;
  const create_cus_labels = label_names.map((item: { id: string }) => ({
    label_id: parseInt(item.id),
  }));

  try {
    await prisma.cusProfile.update({
      where: { id: parseInt(id) },
      data: {
        cus_name,
        cus_number,
        cus_email,
        cus_idnumber,
        cus_birthday: new Date(cus_birthday),
        cus_remark,
        cus_status,
        cus_level,
        cus_labels: {
          deleteMany: {},
          createMany: {
            data: create_cus_labels,
          },
        },
      },
    });
    res.message("成功修改").send();
  } catch (err) {
    next(err);
  }
};
export const destroy: ExpressControllerType = async (req, res, next) => {
  const cus_id = parseInt(req.params.id);
  try {
    const cusProfile = await prisma.cusProfile.findUnique({
      where: {
        id: cus_id,
      },
    });

    if (!cusProfile) {
      return res.error("沒有該客戶");
    }
    await prisma.cusProfile.delete({
      where: {
        id: cus_id,
      },
    });
    return res.message("删除成功").send();
  } catch (err) {
    next(err);
  }
};

type resultType = (CusProfile & {
  cus_labels: (CusProfileLabel & {
    label: Labels;
  })[];
})[];
function formatData(result: resultType) {
  const data = result.map((cus) => {
    const {
      id,
      cus_name,
      cus_number,
      cus_email,
      cus_idnumber,
      cus_remark,
      cus_status,
      cus_level,
      cus_birthday,
      cus_labels,
    } = cus;

    const cus_age = calculateAge(cus_birthday as unknown as Date);
    const formatDate = cus_birthday?.toISOString().substring(0, 10);
    const label_names = cus_labels.map(
      (labelInfo: { label: Labels }) => labelInfo.label
    );
    return {
      id,
      cus_name,
      cus_number,
      cus_email,
      cus_idnumber,
      cus_birthday: formatDate,
      cus_age,
      cus_remark,
      cus_status,
      cus_level,
      label_names,
    };
  });
  return data;
}

function calculateAge(birthday: Date): number {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
  const daysDiff = currentDate.getDate() - birthDate.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}
