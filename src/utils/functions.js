export const calcular_total_price = (items) =>{
    return items.reduce((acumulador, item)=> (acumulador += item.price*item.quantity),0)
}