import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
);

const stripeAppearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#14b8a6',
    colorBackground: '#111827',
    colorDanger: '#dc2626',
    borderRadius: '20px',
  },
  rules: {
    '.Input': {
      backgroundColor: '#374151',
      border: '1px solid #3f3f46',
      color: '#f4f4f5',
    },
  },
};

export { stripePromise, stripeAppearance };
