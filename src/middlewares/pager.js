const qs = require("qs")

const keys = ["page", "pageSize"]
const maxPageSize = 20

module.exports = (ctx, next) => {
  if (ctx.method !== "GET") {
    return next()
  }

  const query = qs.parse(ctx.querystring)

  if (
    !keys.filter(function (k) {
      return k in query
    }).length
  ) {
    return next()
  }

  query.pageSize = parseInt(query.pageSize)
  if (query.pageSize && query.pageSize > 1) {
    if (query.pageSize > maxPageSize) {
      query.pageSize = maxPageSize
    }
  } else {
    query.pageSize = maxPageSize
  }

  query.page = parseInt(query.page)
  if (!query.page || query.page < 1) {
    query.page = 1
  }

  query.offset = (query.page - 1) * query.pageSize

  ctx.query = query

  return next()
}
