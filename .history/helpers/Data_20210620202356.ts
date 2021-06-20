export type PlansType = {
  id: number;
  name: string;
  discretion: string;
  planId: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: string[];
};

const plans: Array<PlansType> = [
  {
    id: 1,
    name: 'BAS',
    discretion: 'All the basics for family that are just getting started.',
    planId: 'price_1IzS2rLMgvU1cp6VANo43mYu',
    price: {
      monthly: 99,
      annually: 99 * 12 - 199
    },
    features: [
      '1 användare',
      'Månadsrapport',
      '100% reklamfritt',
      'Avsluta när du vill'
    ]
  },
  {
    id: 2,
    name: 'PLUS',
    discretion: 'Better for big families that want more users.',
    planId: 'price_1IzS4dLMgvU1cp6Vb1ptarPh',
    price: {
      monthly: 169,
      annually: 169 * 12 - 100
    },
    features: [
      '4 användare',
      'Föräldrarapport',
      '100% reklamfritt',
      'Avsluta när du vill'
    ]
  }
];

export default plans;
