/**
 * create stock report class 
 */
class Stock{
    /**
     * 
     * @param {name of stock} stock 
     * @param {number of shares} shares 
     * @param {price of shares} price 
     * @param {total } total 
     */
    constructor(stock,shares,price,total){
        this.stock=stock;
        this.shares=shares;
        this.price=price;
        this.total=total;
    }
}
/**
 * export module
 */
module.exports={
    Stock
}