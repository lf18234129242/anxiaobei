
const getUrl = (url, obj) => {
  let params = ''
  let item
  for (item in obj) {
    params += `&${item}=${obj[item]}`
  }
  if (params) {
    url += '?' + params.slice(1)
  }
  return url
}


export {
  getUrl
}
