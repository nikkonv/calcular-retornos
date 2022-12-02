const getCompoundInterest = (amount, interest, period, contrib = 0) => {
  // logic based in dap mensually
  const final = amount * (1 + interest) + contrib
  if (period === 1) {
    return Math.round(final)
  } else {
    return getCompoundInterest(Math.round(final), interest, period - 1, contrib)
  }
}

const getRetornoUF = (amount, interest, contrib, ufArray) => {
  const ufConv = amount / ufArray[0]
  const interestUF = ufConv + ufConv * interest
  const finalUF = ufArray[1] - ufArray[0]
  const total = Math.round(interestUF * ufArray[1]) + contrib
  const newArray = ufArray.splice(0, 1)
  if (ufArray.length === 1) {
    return total
  } else {
    return getRetornoUF(total, interest, contrib, ufArray)
  }
}

const montoInicial = 1000000
// tasa mensual bco estado = 0.91, bcochile = 0.94 (puede variar durante el año)
const tasaMensual = 0.94
const cantMeses = 12
const contribMensual = 150000

const totalContrib = montoInicial + cantMeses * contribMensual

const fixedInterest = 1.66 / 12 // interes anual / 12 meses
// uf dic 2021 - nov 2022, 0: primer dia dic, 1: ultimo dia dic, 2: ultimo dia ene, 3: ultimo dia feb ...
const ufArray = [
  30776, 30991, 31212, 31539, 31727, 32176, 32679, 33086, 33417, 33836, 34258,
  34600, 34811,
]

const retorno = getCompoundInterest(
  montoInicial,
  tasaMensual / 100,
  cantMeses,
  contribMensual
)

const retornoUF = getRetornoUF(
  montoInicial,
  fixedInterest / 100,
  contribMensual,
  ufArray
)

const ganCompound = retorno - totalContrib
const ganUF = retornoUF - totalContrib

const percentCompound =
  Math.round((ganCompound / totalContrib) * 100 * 100) / 100
const percentUF = Math.round((ganUF / totalContrib) * 100 * 100) / 100
console.table({
  Meses: 12,
  "Monto Inicial": montoInicial,
  "Contribución Mensual": contribMensual,
  "Contribución Total": totalContrib,
  "Retorno Interés Compuesto": retorno,
  "Retorno Ahorro UF": retornoUF,
  "Ganancia Interés Compuesto": ganCompound,
  "Ganancia Ahorro UF": ganUF,
  "% Interés Compuesto": percentCompound,
  "% Ahorro UF": percentUF,
})
