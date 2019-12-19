export default function handleNumberInput(event, handleNumber) {
  const target = event.target

  const inputNumber = Number(target.value)
  if (inputNumber !== Number.NaN) {
    handleNumber(inputNumber)
  }
}