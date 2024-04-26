import { Layer1, Layer2, Layer3 } from '../../assets/icons/LayerIcons'

export const PLANS = [
  {
    id: 'price_1O7cS4LjRcuP1fi9Rj2vxNVU',
    icon: <Layer3 />,
    title: 'Mai Premium 12 Months',
    priceValue: 10,
    duration: 12,
    price: '£10/mo',
    priceDescription: 'Billed Annually. That’s £120 a year.',
    paymentLink: 'https://buy.stripe.com/test_4gwbIPcwt2qwaqY146',
    bestDeal: true
  },
  {
    id: 'price_1O7cRkLjRcuP1fi9iSuURM40',
    icon: <Layer2 />,
    title: 'Mai Premium 6 Months',
    priceValue: 12.5,
    duration: 6,
    price: '£12.5/mo',
    priceDescription: "Billed every 6 months. That's £75 every 6 months.",
    paymentLink: 'https://buy.stripe.com/test_4gw28ffIFe9e42A4gh',
    bestDeal: false
  },
  {
    id: 'price_1NqOKCLjRcuP1fi9C5enNkfE',
    icon: <Layer1 />,
    title: 'Mai Premium 1 Month',
    priceValue: 15,
    duration: 1,
    price: '£15/mo',
    priceDescription: "Billed every month. That's £15 a month.",
    paymentLink: 'https://buy.stripe.com/test_14k28fgMJ3uA9mU6oo',
    bestDeal: false
  }
]
