const sortBy = ['high', 'middle', 'low']
function customSort ({ data, sortField }) {
  const sortByObject = sortBy.reduce((obj, item, index) => {
    return {
      ...obj,
      [item]: index
    }
  }, {})
  return data.sort((a, b) => {
    return sortByObject[a[sortField]] - sortByObject[b[sortField]]
  })
}
export default customSort
