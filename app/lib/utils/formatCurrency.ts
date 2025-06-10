export const formatCurrency = (value: number, currency = "₽") =>
    `${value.toFixed(2)}\u00A0${currency}`; // \u00A0 = NBSP
