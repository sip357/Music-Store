'use server'

import Beat from "../types/beatType";
import { revalidatePath } from "next/cache";
import Cookies from 'cookies';  // Import the cookies package
import { NextApiRequest, NextApiResponse } from 'next';

// Defining the type for Cart objects
export type Cart = {
    totalPrice: number;
    items: Array<{
        Price: number;
        _id: string;
        Title: string;
        Audio: string;
        BPM: number;
        Tags: string[];
    }>;
}

// Function to get beats from the API
async function getBeats() {
    const res = await fetch("http://localhost:3000/api/beatsAPI");
  
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
  
    return res.json();
}

// Function to add an item to the cart
export async function addItem(req: NextApiRequest, res: NextApiResponse, chosenPrice: number, productId: string) {
    // Initialize cookies
    const cookies = new Cookies(req, res);
    
    // Retrieve cart from cookies
    const cartCookie = cookies.get('cart');
    let cart: Cart = cartCookie ? JSON.parse(cartCookie) : { Price: 0, items: [] };

    const products = await getBeats();

    // Find the selected product from the products array
    const selectedProduct: Beat | undefined = products.find((product: Beat) => product._id === productId);

    selectedProduct.Price = chosenPrice;
    // Handling if the selected product is not found
    if (!selectedProduct) {
        console.error(`Product with id ${productId} not found.`);
        return;
    }

    // Adding or updating the item in the cart
    let itemFound = false;
    cart.items = cart.items.map(item => {
        if (item._id === selectedProduct._id) {
            itemFound = true;
            return item;  // Just keep the item as is for now; you could update quantity here if needed
        }
        return item;
    });

    if (!itemFound) {
        console.log('Adding new item to the cart.');
        cart.items.push(selectedProduct);
        cart.totalPrice += chosenPrice;  // Update the total price
    }

    // Save the updated cart in a cookie
    cookies.set('cart', JSON.stringify(cart), {
        httpOnly: true,   // More secure; cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
        maxAge: 60 * 60 * 24 * 7,  // 1 week
        path: '/',
    });

    // Logging the updated cart
    console.log('Updated Cart:', cart);

    // Revalidate the path if needed
    revalidatePath('/add-to-cart');

    // Optionally, return the updated cart in the response
    res.status(200).json({ cart });
}


// Function to delete an item from the cart
export async function delItem(req: NextApiRequest, res: NextApiResponse, productId: string) {
    // Initialize cookies
    const cookies = new Cookies(req, res);
    
    // Retrieve cart from cookies
    const cartCookie = cookies.get('cart');
    let cart: Cart = cartCookie ? JSON.parse(cartCookie) : { Price: 0, items: [] };

    // Find the item in the cart to remove it
    const itemIndex = cart.items.findIndex(item => item._id === productId);

    if (itemIndex === -1) {
        console.error(`Product with id ${productId} not found in the cart.`);
        return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart and update the price
    const itemToRemove = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);
    cart.totalPrice -= itemToRemove.Price;

    // Save the updated cart in a cookie
    cookies.set('cart', JSON.stringify(cart), {
        httpOnly: true,   // More secure; cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
        maxAge: 60 * 60 * 24 * 7,  // 1 week
        path: '/',
    });

    // Logging the updated cart
    console.log('Updated Cart after deletion:', cart);

    // Revalidate the path if needed
    revalidatePath('/add-to-cart');

    // Return the updated cart in the response
    return res.status(200).json({ cart });
}

// // Function to delete one quantity of an item from the cart
// export async function delOneItem(userId: string, productId: number) {
//     // Retrieving the cart based on the user ID
//     let cart: Cart | null = await kv.get(`testcart-${userId}`);

//     // Checking if the cart and its items exist
//     if (cart && cart.items) {
//         // Updating the quantity of the item or removing it if quantity becomes zero
//         const updatedCart = {
//             userId: userId,
//             items: cart.items.map(item => {
//                 if (item.id === productId) {
//                     if (item.quantity > 1) {
//                         item.quantity -= 1;
//                     } else {
//                         return null;
//                     }
//                 }
//                 return item;
//             }).filter(Boolean) as Cart['items'],
//         };

//         // Saving the updated cart to the KV storage
//         await kv.set(`testcart-${userId}`, updatedCart);
        
//         // Triggering revalidation of the '/add-to-cart' page
//         revalidatePath('/add-to-cart');
//     }
// }