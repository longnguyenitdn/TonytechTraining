export const ROUTER = {
  home: "/",
  houseNew: "/addHouse",
  houseDetail: "/houses/:houseId",
  invoices: "/houses/:houseId/invoices",
  invoiceNew: "/houses/:houseId/invoices/add",
  invoiceDetail: "/houses/:houseId/invoices/:invoiceId",
};

export const getRouter = (path, params) => {
  path = path.replace(/houseId|invoiceId/gi, function (matched) {
    return params[matched];
  });
  const newPath = path.replace(/:/gi, "");
  return newPath;
};
