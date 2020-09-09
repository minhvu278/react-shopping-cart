import {FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE} from "../types";

export const fetchProducts = () => async (dispatch) => {
    // const res = await fetch("/api/products");
    const data = [
        {
            "_id": "8JlCq1yvw",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 1",
            "image": "/images/dress1.jpg",
            "price": 29.9,
            "title": "Dress 1"
        },
        {
            "_id": "I2ivd9tKl",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "M", "XXL"],
            "description": "Mẫu số 2",
            "image": "/images/dress2.jpg",
            "price": 18.9,
            "title": "Dress 2"
        },
        {
            "_id": "MLc5ipULj",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 3",
            "image": "/images/dress3.jpg",
            "price": 19.9,
            "title": "Dress 3"
        },
        {
            "_id": "KMFv5RPVn",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 4",
            "image": "/images/dress4.jpg",
            "price": 39.9,
            "title": "Dress 4"
        },
        {
            "_id": "tYAAB-ti_",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "S", "XXL"],
            "description": "Mẫu số 5",
            "image": "/images/dress5.jpg",
            "price": 49.9,
            "title": "Dress 5"
        },
        {
            "_id": "6aMbtpfDc",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 6",
            "image": "/images/dress6.jpg",
            "price": 29.9,
            "title": "Dress 6"
        },
        {
            "_id": "ZcoGSX8HU",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 7",
            "image": "/images/dress3.jpg",
            "price": 27.9,
            "title": "Dress 7"
        },
        {
            "_id": "FA9rpHGoJ",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 7",
            "image": "/images/dress3.jpg",
            "price": 27.9,
            "title": "Dress 7"
        }
    ]
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    });
};

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === ""
                    ? products
                    : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
        },
    });
};
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if (sort === "latest"){
        sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1))
    }else {
        sortedProducts.sort((a, b) =>
            sort === "lowest"
                ? a.price > b.price
                ? 1
                : -1
                : a.price > b.price
                ? -1
                : 1
        );
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}