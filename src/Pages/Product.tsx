import {MenuItem, CartItem, ProductPageParams} from "../interfaces.tsx";
import TestImage from '../assets/images/img_2.png'
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {decodeString} from "../utils/urlhandler.ts";
import fetchAirtableRecords from "../utils/fetcher.ts";
import {initializeCartInLocalStorage, getCartFromLocalStorage, saveCartToLocalStorage} from "../utils/cartCRUD.ts";
import LoadingProduct from "./LoadingPages/LoadingProduct.tsx";

const Product = () => {
    const [cart, setCart] = useState<Array<CartItem>>(() => {
        const existingCart = getCartFromLocalStorage();
        if (existingCart) {
            return existingCart;
        } else {
            return initializeCartInLocalStorage();
        }
    });
    const [productAdded, setProductAdded] = useState<boolean>(false)
    const [total, setTotal] = useState(0);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [item, setItem] = useState<MenuItem>()
    const [image, setImage] = useState<string>("");
    const {encodedBusinessName, tableNumber, productId}: {
        encodedBusinessName: string,
        tableNumber: string,
        productId: string
    } = useParams() as unknown as ProductPageParams;
    const businessName = decodeString(encodedBusinessName)


    useEffect(() => {
        saveCartToLocalStorage(cart)
    }, [cart]);


    useEffect(() => {
        async function fetchData() {
            try {
                const itemsData: MenuItem[] = await fetchAirtableRecords("Items");
                for (let i = 0; i < itemsData.length; i++) {
                    const item = itemsData[i];
                    if (item.id == productId) {
                        setItem(item)
                    }
                }

            } catch (err) {
                setError('Failed to fetch data');
                console.error("Error fetching data:", err);
            }
        }


        fetchData();
    }, [businessName]);


    useEffect(() => {
        if (item != undefined) {
            if (item.fields.Image == null) {
                setImage(TestImage);
            } else {
                setImage(item.fields.Image[0].url)
            }
        }

    }, [item]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const note: string = formData.get("note") as string;
        //console.log(note == "")
        let data: CartItem;
        if (item == null) {
            console.log("No item found");
            return;
        }
        if (note == "") {
            data = {
                id: productId,
                name: item.fields.Name,
                price: Number(item?.fields.Price),
                quantity: numberOfItems
            }
        } else {
            data = {
                id: productId,
                name: item.fields.Name,
                price: Number(item?.fields.Price),
                quantity: numberOfItems,
                aditionalNote: note
            }

        }
        if (item.fields.Image != undefined) {
            if (item.fields.Image.length != 0) {
                data["image"] = item.fields.Image[0].url
            }
        }
        addItemToCart(data)
    };

    const addItemToCart = (item: CartItem) => {
        let newCart: Array<CartItem>;
        const prevCart: Array<CartItem> = getCartFromLocalStorage();
        const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex > -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity += item.quantity;
            newCart = updatedCart;
        } else {
            newCart = [...prevCart, item]
        }
        setCart(newCart)
        setNumberOfItems(0)
        setTotal(0)

        showMessage()
    };

    const showMessage = () => {
        setProductAdded(true);
        setTimeout(() => {
            setProductAdded(false);
        }, 3000);
    };

    const handleTotal = (operation: string) => {
        if (item == null) {
            return
        }
        if (operation === '+') {
            setTotal(total + item?.fields.Price)
        } else {
            setTotal(total - item?.fields.Price)
        }
    }

    const handleNumberOfItems = (operation: string) => {
        if (operation === '+') {
            setNumberOfItems(numberOfItems + 1)
        } else {
            setNumberOfItems(numberOfItems - 1)
        }
        console.log(numberOfItems)
    }

    const handleButtons = (operation: string) => {
        if (operation === '+') {
            handleNumberOfItems(operation)
            handleTotal(operation)
        } else {
            if (total) {
                handleNumberOfItems(operation)
                handleTotal(operation)
            }
        }
    }

    if (error) {
        return <div>Error loading data!</div>;
    }

    if (item == null) {
        return <LoadingProduct/>;
    }


    return (
        <div className='font-poppins'>
            <div className='bg-gray-100 rounded-b-3xl flex flex-col laptop:flex-row justify-center pb-3.5'>
                <div className='flex relative justify-between items-center mx-6 mt-7 mb-5'>
                    <Link to={`/neemble-eat/b/${encodedBusinessName}/${tableNumber}`} className='absolute flex-none'>
                        <div className="text-left">
                            <p className='text-lg font-bold pr-3'>
                                {'<'}
                            </p>
                        </div>
                    </Link>
                    <div className='flex-grow'></div>
                    <div className='flex-none text-center '>
                        Menu
                    </div>
                    <div className='flex-grow'></div>
                </div>
                <div className='mx-auto rounded-md w-fit items-center overflow-hidden pb-4 px-5'>
                    <img src={image}
                         alt=""
                         className='rounded-md object-cover w-full max-h-52'/>
                </div>
                <div>
                    <h1 className='ml-5 font-semibold text-lg'>
                        {item.fields.Name}
                    </h1>
                </div>
                <div>
                    <p className='rounded-lg text-sm ml-3.5 px-2 py-2 font-poppins-light'>
                        {item.fields.Description}
                    </p>
                </div>
                <div className='ml-6 mt-2'>
                    <p className='w-fit italic font-semibold'>
                        {item.fields.Price}.00 Kz
                    </p>
                </div>
            </div>
            <div className='mt-7'>
                <div className='mx-4'>
                    <div className='bg-gray-100 py-3 pl-5 rounded-xl'>
                        <h1 className='font-poppins-semibold'>
                            Informação Adicional
                        </h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit}
                      action=""
                      className='flex flex-col justify-center mt-5 mx-5'>
                    <textarea name="note" id="note" cols={30} rows={5}
                              placeholder='Adicione detalhes'
                              className=" rounded-md border border-gray-300 px-2 py-2 text-sm mb-5">

                    </textarea>
                    {
                        productAdded ?
                            <div className='flex text-green-500 justify-center mb-4 prevent-select'>
                                <p>
                                    Produto Adicionado
                                </p>
                            </div> :
                            <div className='flex text-white justify-center mb-4 prevent-select'>
                                <p>
                                    Produto Adicionado
                                </p>
                            </div>
                    }
                    <div className='flex justify-center '>
                        <div className='flex items-center'>
                            {
                                numberOfItems == 0 ?
                                    <button
                                        type="button"
                                        className="py-2 px-4 border border-gray-300 rounded-md p-2 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200 flex prevent-select cursor-not-allowed">
                                        -
                                    </button> :
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleButtons('-')
                                        }}
                                        className=" py-2 px-4 border border-gray-300 rounded-md p-2 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200 flex prevent-select">
                                        -
                                    </button>
                            }
                            <p className='prevent-select px-7 min-w-5 max-w-5 flex justify-center'>
                                {numberOfItems}
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    handleButtons('+')
                                }}
                                className="border prevent-select border-gray-300 rounded-md py-2 px-3.5 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200 flex">
                                +
                            </button>
                        </div>
                    </div>
                    {
                        total === 0 ?
                            <button
                                type="button"
                                className="self-center cursor-not-allowed bg-gray-500 prevent-select text-white px-16 py-2 rounded-md mt-6 mb-14">
                                Adicionar
                            </button> :
                            <button
                                type="submit"
                                className="self-center prevent-select hover:bg-gray-700 bg-black text-white px-16 py-2 rounded-md mt-6 mb-14">
                                Adicionar - {total}.00 Kz
                            </button>
                    }
                </form>

            </div>
        </div>
    )
}

export default Product;