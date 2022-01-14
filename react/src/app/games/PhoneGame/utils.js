export const randomValue = (initalValue = '00') => {
  let floor = Number('1'.repeat(initalValue.length))
    , top = Number('9'.repeat(initalValue.length))
  return `${Math.floor(Math.random() * (top - floor) + floor)}`
}

export const getRandomValues = (values = ['1', '2', '3', '4', '5', '6', '7', '8']) => {
  return new Array(8)
    .fill({ value: '55', index: randomValue() })
    .map((_, index) => ({ value: values[index] ? values[index] : '0', index: randomValue() }))
    .sort((a, b) => Number(a.index) - Number(b.index))
    .map(item => item.value)
}
