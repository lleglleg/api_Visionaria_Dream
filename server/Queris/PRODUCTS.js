let conn = require('../BD');
module.exports = {
    getProduct: getProduct,
    getAllProduct: getAllProduct,
    // getaSingleProduct: getaSingleProduct,
    newProduct: newProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct
};

////////////////////////////////////////
//CRUD PRODUCTS
////////////////////////////////////////
async function getProduct(req, res, next) {
    try {
        var q = `Select * from productos`;
        await conn.query(q, function(data, err) {
                if (err) {
                    console.log(`error in PRODUCTS.js function 'getProduct'`);
                    res.status(400)
                        .json({
                            status: 'err',
                            message: 'Error'
                        });
                } else {
                    res.status(200).json(data.rows);
                }
            })
            .catch(function(err) {
                return next(err);
            });

    } catch (err) {
        throw err;
    }
}

async function getAllProduct(req, res, next) {
    try {
        var q = `Select * from productos`;
        await conn.query(q, function(data, err) {
                if (err) {
                    console.log(`error in PRODUCTS.js function 'getAllProduct'`);
                    res.status(400)
                        .json({
                            status: 'err',
                            message: 'Error'
                        });
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(function(err) {
                return next(err);
            });

    } catch (err) {
        throw err;
    }
}

async function newProduct(req, res, next) {
console.log(req.body)
    let item = req.body,ID=0;
    total=0;

    for(let it of item.products) {
        total+=it.precio_pr;
    }


    try {
        
        // let q = `declare @ID table (ID int);
        // insert into ordenes ([ID_US],[Fecha_OR],[Total_OR],[Estado_OR]) 
        // OUTPUT INSERTED.ID_OR into @ID 
        // VALUES(${item.order.user},SYSDATETIME(),${total},'P');
        // select * from @ID`;

        let q = `
        insert into ordenes (ID_US,Fecha_OR,Total_OR,Estado_OR) 
        VALUES(${item.order.user},current_date,${total},'P')RETURNING ID_US;`;
        console.log(q);


        data = await conn.Query(q);
        console.log(data.rows);
        try {
            ID = data.row[0].id_us;
        } catch { 
            ID = 1;
            console.log('error') 
        }

        for( it of item.products) {
           q=` insert into productos_ordenes (ID_OR , ID_PR , Cantidad_PO )VALUES(${ID},${it.id_pr},1)`;
           console.log(q)
           data = await conn.Query(q);
        }
        
        res.status(200).json({status: 'success',message: 'Inserted a new Order'});

    } catch (err) {
        throw err;
    }
}


async function updateProduct(req, res, next) {
    let productID = parseInt(req.params.id);
    // req.body.LEGAL_ENTITY_ID = parseInt(req.body.LEGAL_ENTITY_ID);
    // req.body.CATEGORY_ID = parseInt(req.body.CATEGORY_ID);
    // req.body.WEIGHT_UOM_ID = parseInt(req.body.WEIGHT_UOM_ID);
    // req.body.VOLUME_UOM_ID = parseInt(req.body.VOLUME_UOM_ID);
    // req.body.PRIMARY_UOM_ID = parseInt(req.body.PRIMARY_UOM_ID);
    // req.body.TAX_GROUP = parseInt(req.body.TAX_GROUP);
    // req.body.PURCHASING_TAX_GROUP = parseInt(req.body.PURCHASING_TAX_GROUP);
    // req.body.UNIT_LENGTH = parseFloat(req.body.UNIT_LENGTH);
    // req.body.UNIT_WIDTH = parseFloat(req.body.UNIT_WIDTH);
    // req.body.UNIT_HEIGHT = parseFloat(req.body.UNIT_HEIGHT);

    if (req.body.LEGAL_ENTITY_ID == undefined) { req.body.LEGAL_ENTITY_ID = null }
    if (req.body.PRODUCT_CODE == undefined) { req.body.PRODUCT_CODE = null }
    if (req.body.PRODUCT_NAME == undefined) { req.body.PRODUCT_NAME = null }
    if (req.body.BARCODE == undefined) { req.body.BARCODE = null }
    if (req.body.CATEGORY_ID == undefined) { req.body.CATEGORY_ID = null }
    if (req.body.BRAND_ID == undefined) { req.body.BRAND_ID = null }
    if (req.body.ENABLED_FLAG == undefined) { req.body.ENABLED_FLAG = null }
    if (req.body.START_DATE_ACTIVE == undefined) { req.body.START_DATE_ACTIVE = null }
    if (req.body.END_DATE_ACTIVE == undefined) { req.body.END_DATE_ACTIVE = null }
    if (req.body.PURCHASING_ITEM_FLAG == undefined) { req.body.PURCHASING_ITEM_FLAG = null }
    if (req.body.INVENTORY_ITEM_FLAG == undefined) { req.body.INVENTORY_ITEM_FLAG = null }
    if (req.body.CUSTOMER_ORDER_ENABLED_FLAG == undefined) { req.body.CUSTOMER_ORDER_ENABLED_FLAG = null }
    if (req.body.RETURNABLE_FLAG == undefined) { req.body.RETURNABLE_FLAG = null }
    if (req.body.TAXABLE_FLAG == undefined) { req.body.TAXABLE_FLAG = null }
    if (req.body.EXPENSE_ACCOUNT == undefined) { req.body.EXPENSE_ACCOUNT = null }
    if (req.body.WEIGHT_UOM_ID == undefined) { req.body.WEIGHT_UOM_ID = null }
    if (req.body.VOLUME_UOM_ID == undefined) { req.body.VOLUME_UOM_ID = null }
    if (req.body.PRIMARY_UOM_ID == undefined) { req.body.PRIMARY_UOM_ID = null }
    if (req.body.PRIMARY_UNIT_OF_MEASURE == undefined) { req.body.PRIMARY_UNIT_OF_MEASURE = null }
    if (req.body.COST_OF_SALES_ACCOUNT == undefined) { req.body.COST_OF_SALES_ACCOUNT = null }
    if (req.body.SALES_ACCOUNT == undefined) { req.body.SALES_ACCOUNT = null }
    if (req.body.INVENTORY_ITEM_STATUS_CODE == undefined) { req.body.INVENTORY_ITEM_STATUS_CODE = null }
    if (req.body.PAYMENT_TERMS_ID == undefined) { req.body.PAYMENT_TERMS_ID = null }
    if (req.body.ORDERABLE_ON_WEB_FLAG == undefined) { req.body.ORDERABLE_ON_WEB_FLAG = null }
    if (req.body.UNIT_LENGTH == undefined) { req.body.UNIT_LENGTH = null }
    if (req.body.UNIT_WIDTH == undefined) { req.body.UNIT_WIDTH = null }
    if (req.body.UNIT_HEIGHT == undefined) { req.body.UNIT_HEIGHT = null }
    if (req.body.UNIT_WEIGHT == undefined) { req.body.UNIT_WEIGHT = null }
    if (req.body.PRODUCT_TYPE == undefined) { req.body.PRODUCT_TYPE = null }
    if (req.body.TYPE_OF_SALE == undefined) { req.body.TYPE_OF_SALE = null }
    if (req.body.STATUS == undefined) { req.body.STATUS = null }

    if (req.body.PRODUCT_CODE != null) { req.body.PRODUCT_CODE = `'${req.body.PRODUCT_CODE}'` }
    if (req.body.PRODUCT_NAME != null) { req.body.PRODUCT_NAME = `'${req.body.PRODUCT_NAME}'` }
    if (req.body.BARCODE != null) { req.body.BARCODE = `'${req.body.BARCODE}'` }
    if (req.body.ENABLED_FLAG != null) { req.body.ENABLED_FLAG = `'${req.body.ENABLED_FLAG}'` }
    if (req.body.START_DATE_ACTIVE != null) { req.body.START_DATE_ACTIVE = `CONVERT(datetime,'${req.body.START_DATE_ACTIVE}')` }
    if (req.body.END_DATE_ACTIVE != null) { req.body.END_DATE_ACTIVE = `CONVERT(datetime,'${req.body.END_DATE_ACTIVE}')` }
    if (req.body.PURCHASING_ITEM_FLAG != null) { req.body.PURCHASING_ITEM_FLAG = `'${req.body.PURCHASING_ITEM_FLAG}'` }
    if (req.body.INVENTORY_ITEM_FLAG != null) { req.body.INVENTORY_ITEM_FLAG = `'${req.body.INVENTORY_ITEM_FLAG}'` }
    if (req.body.CUSTOMER_ORDER_ENABLED_FLAG != null) { req.body.CUSTOMER_ORDER_ENABLED_FLAG = `'${req.body.CUSTOMER_ORDER_ENABLED_FLAG}'` }
    if (req.body.RETURNABLE_FLAG != null) { req.body.RETURNABLE_FLAG = `'${req.body.RETURNABLE_FLAG}'` }
    if (req.body.TAXABLE_FLAG != null) { req.body.TAXABLE_FLAG = `'${req.body.TAXABLE_FLAG}'` }
    if (req.body.EXPENSE_ACCOUNT != null) { req.body.EXPENSE_ACCOUNT = `'${req.body.EXPENSE_ACCOUNT}'` }
    if (req.body.PRIMARY_UNIT_OF_MEASURE != null) { req.body.PRIMARY_UNIT_OF_MEASURE = `'${req.body.PRIMARY_UNIT_OF_MEASURE}'` }
    if (req.body.COST_OF_SALES_ACCOUNT != null) { req.body.COST_OF_SALES_ACCOUNT = `'${req.body.COST_OF_SALES_ACCOUNT}'` }
    if (req.body.SALES_ACCOUNT != null) { req.body.SALES_ACCOUNT = `'${req.body.SALES_ACCOUNT}'` }
    if (req.body.INVENTORY_ITEM_STATUS_CODE != null) { req.body.INVENTORY_ITEM_STATUS_CODE = `'${req.body.INVENTORY_ITEM_STATUS_CODE}'` }
    if (req.body.INVOICE_ENABLED_FLAG != null) { req.body.INVOICE_ENABLED_FLAG = `'${req.body.INVOICE_ENABLED_FLAG}'` }
    if (req.body.ITEM_TYPE != null) { req.body.ITEM_TYPE = `'${req.body.ITEM_TYPE}'` }
    if (req.body.ORDERABLE_ON_WEB_FLAG != null) { req.body.ORDERABLE_ON_WEB_FLAG = `'${req.body.ORDERABLE_ON_WEB_FLAG}'` }
    if (req.body.PRODUCT_TYPE != null) { req.body.PRODUCT_TYPE = `'${req.body.PRODUCT_TYPE}'` }
    if (req.body.TYPE_OF_SALE != null) { req.body.TYPE_OF_SALE = `'${req.body.TYPE_OF_SALE}'` }
    if (req.body.STATUS != null) { req.body.STATUS = `'${req.body.STATUS}'` }

    try {
        var q = `UPDATE PRODUCTS set LEGAL_ENTITY_ID=${req.body.LEGAL_ENTITY_ID}, PRODUCT_CODE=${req.body.PRODUCT_CODE}, PRODUCT_NAME=${req.body.PRODUCT_NAME},BARCODE=${req.body.BARCODE},CATEGORY_ID=${req.body.CATEGORY_ID},BRAND_ID=${item.BRAND_ID},
            ENABLED_FLAG=${req.body.ENABLED_FLAG}, START_DATE_ACTIVE=${req.body.START_DATE_ACTIVE}, END_DATE_ACTIVE=${req.body.END_DATE_ACTIVE}, PURCHASING_ITEM_FLAG=${req.body.PURCHASING_ITEM_FLAG},INVENTORY_ITEM_FLAG=${req.body.INVENTORY_ITEM_FLAG}, CUSTOMER_ORDER_ENABLED_FLAG=${req.body.CUSTOMER_ORDER_ENABLED_FLAG},
            RETURNABLE_FLAG=${req.body.RETURNABLE_FLAG}, TAXABLE_FLAG=${req.body.TAXABLE_FLAG}, EXPENSE_ACCOUNT=${req.body.EXPENSE_ACCOUNT}, WEIGHT_UOM_ID=${req.body.WEIGHT_UOM_ID}, VOLUME_UOM_ID=${req.body.VOLUME_UOM_ID}, PRIMARY_UOM_ID=${req.body.PRIMARY_UOM_ID}, PRIMARY_UNIT_OF_MEASURE=${req.body.PRIMARY_UNIT_OF_MEASURE}, COST_OF_SALES_ACCOUNT=${req.body.COST_OF_SALES_ACCOUNT},
            SALES_ACCOUNT=${req.body.SALES_ACCOUNT},INVENTORY_ITEM_STATUS_CODE=${req.body.INVENTORY_ITEM_STATUS_CODE}, PAYMENT_TERMS_ID=${req.body.PAYMENT_TERMS_ID}, TAX_GROUP=${req.body.TAX_GROUP}, INVOICE_ENABLED_FLAG=${req.body.INVOICE_ENABLED_FLAG},
            ITEM_TYPE=${req.body.ITEM_TYPE}, PURCHASING_TAX_GROUP=${req.body.PURCHASING_TAX_GROUP}, ORDERABLE_ON_WEB_FLAG=${req.body.ORDERABLE_ON_WEB_FLAG}, UNIT_LENGTH=${req.body.UNIT_LENGTH}, UNIT_WIDTH=${req.body.UNIT_WIDTH},UNIT_HEIGHT=${req.body.UNIT_HEIGHT},
            UNIT_WEIGHT=${req.body.UNIT_WEIGHT},PRODUCT_TYPE=${req.body.PRODUCT_TYPE},TYPE_OF_SALE=${req.body.TYPE_OF_SALE},
            STATUS=${req.body.STATUS}, LAST_UPDATE_DATE= SYSDATETIME(), LAST_UPDATED_BY='${req.body.LAST_UPDATED_BY}' where PRODUCT_ID=${productID}`;
        await conn.query(q, function(data, err) {
                if (err) {
                    console.log(`error in PRODUCTS.js function 'updateProduct'`);
                    conn.log(req.route.path, req.route.stack[0].method, err.originalError.info, req.body, err.originalError.info.number);
                    res.status(400).json({ status: 'err', message: 'Error' });
                } else {
                    res.status(200)
                        .json({
                            status: 'success',
                            message: 'Updated PRODUCT'
                        });
                }
            })
            .catch(function(err) {
                return next(err);
            });

    } catch (err) {
        throw err;
    }
}

async function removeProduct(req, res, next) {
    const productID = parseInt(req.params.id);
    try {
        var q = `UPDATE PRODUCTS set STATUS='0' where PRODUCT_ID = ${productID}`;
        await conn.query(q, function(data, err) {
                if (err) {
                    console.log(`error in PRODUCTS.js function 'removeProduct'`);
                    res.status(400)
                        .json({
                            status: 'err',
                            message: 'Error'
                        });
                } else {
                    res.status(200)
                        .json({
                            status: 'success',
                            message: 'Removed PRODUCT'
                        });
                }
            })
            .catch(function(err) {
                return next(err);
            });

    } catch (err) {
        throw err;
    }
}

async function activeProduct(req, res, next) {
    const productID = parseInt(req.params.id);
    try {
        var q = `UPDATE PRODUCTS set STATUS='1' where PRODUCT_ID = ${productID}`;
        await conn.query(q, function(data, err) {
                if (err) {
                    console.log(`error in PRODUCTS.js function 'activeProduct'`);
                    res.status(400)
                        .json({
                            status: 'err',
                            message: 'Error'
                        });
                } else {
                    res.status(200)
                        .json({
                            status: 'success',
                            message: 'Actived PRODUCT'
                        });
                }
            })
            .catch(function(err) {
                return next(err);
            });

    } catch (err) {
        throw err;
    }
}