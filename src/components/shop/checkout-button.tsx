// import { loadStripe } from '@stripe/stripe-js';
// import { useRouter } from 'next/router';
// import Stripe from 'stripe';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const CheckoutButton = () => {
//   const router = useRouter();

//   const handleCheckout = async () => {
//     try {
//       let stripe: Stripe | null = null; // Initialize as null

//       // Load the stripe object when the promise resolves
//       stripe = await stripePromise;

//       const response = await fetch('/api/stripe/payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         // Handle the case where the API request failed
//         throw new Error('Failed to create a checkout session');
//       }

//       const { sessionId } = await response.json();
//       //   const { error } = await stripe({
//       // sessionId,
//       //   });

//       if (error) {
//         // Handle any errors that occurred during checkout
//         throw new Error(error.message);
//       }
//     } catch (err) {
//       console.error('Error in creating/redirecting to checkout session:', err);
//       router.push('/error'); // Redirect to an error page
//     }
//   };

//   return <button onClick={handleCheckout}>Buy Now</button>;
// };

// export default CheckoutButton;
