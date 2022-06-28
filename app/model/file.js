
module.exports = function fileSizeUnit(size) {
  // 1 KB = 1024 Byte
  const kb = 1024
  const mb = Math.pow(kb, 2)
  const gb = Math.pow(kb, 3)
  const tb = Math.pow(kb, 4)
  const pb = Math.pow(kb, 5)
  const round = (size, unit) => {
    return Math.round(size / unit * 100.0) / 100.0
  }
  
  if (size >= pb) {
    return round(size, pb) + 'PB'
  } else if (size >= tb) {
    return round(size, tb) + 'TB'
  } else if (size >= gb) {
    return round(size, gb) + 'GB'
  } else if (size >= mb) {
    return round(size, mb) + 'MB'
  } else if (size >= kb) {
    return round(size, kb) + 'KB'
  }
  return size + 'バイト'
}
