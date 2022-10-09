export const carouselArray = (array: any) => {
  const newArray = [...array]
  newArray.push(newArray.shift())
  return newArray
}