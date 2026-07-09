import { useState, useEffect } from 'react'
import { db } from "../data/db"
import { useMemo } from 'react'

const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {

        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    function removeFromCart(id) {
        setCart(prevcart => prevcart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    // State Derivado

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {

        data,
        cart,
        removeFromCart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal

    }

}

export default useCart


//Api usar este

// useEffect(() =>{
//   setData(db)
// }, [])

// console.log(db)

// const [auth, setAuth] = useState(false)

// useEffect(() => {
//   if (auth) {
//     console.log('usuario autenticado')
//   }
// }, [auth])

// //State
// const [auth, setAuth] = useState([])
// const [total, setTotal] = useState(0)
// const [cart, setCart] = useState(0)