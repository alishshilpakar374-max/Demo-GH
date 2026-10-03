// src/data/dining.ts
export type MealKey = "breakfast" | "lunch" | "dinner";

export interface MenuItem {
  name: string;
  description: string;
  price: number; // USD
  tag?: string; // e.g. "Vegan", "Chef's pick"
}

export interface Meal {
  key: MealKey;
  label: string;
  hours: string;
  items: MenuItem[];
}

export const MEALS: Meal[] = [
  {
    key: "breakfast",
    label: "Breakfast",
    hours: "7:00 AM – 10:30 AM",
    items: [
      {
        name: "Garden Harvest Platter",
        description:
          "Seasonal fruit, house granola, local honey, and warm sourdough.",
        price: 14,
        tag: "Vegetarian",
      },
      {
        name: "Farmhouse Eggs",
        description:
          "Free-range eggs your way with roasted tomato and fresh herbs.",
        price: 12,
      },
      {
        name: "Mountain Pancakes",
        description: "Buckwheat pancakes with berry compote and maple syrup.",
        price: 11,
      },
    ],
  },
  {
    key: "lunch",
    label: "Lunch",
    hours: "12:00 PM – 3:00 PM",
    items: [
      {
        name: "Herb Garden Salad",
        description: "Organic greens, roasted seeds, and a citrus dressing.",
        price: 13,
        tag: "Vegan",
      },
      {
        name: "Slow-Roasted Vegetable Bowl",
        description: "Grains, seasonal vegetables, and a tahini drizzle.",
        price: 16,
      },
      {
        name: "Chef's Soup & Bread",
        description: "Soup of the day with fresh-baked bread.",
        price: 10,
      },
    ],
  },
  {
    key: "dinner",
    label: "Dinner",
    hours: "6:30 PM – 10:00 PM",
    items: [
      {
        name: "Candlelight Tasting Menu",
        description: "Five courses built around the day's market harvest.",
        price: 55,
        tag: "Chef's pick",
      },
      {
        name: "Herb-Crusted Lamb",
        description: "Served with garden vegetables and a red wine reduction.",
        price: 32,
      },
      {
        name: "Wild Mushroom Risotto",
        description: "Creamy arborio rice with foraged mushrooms and parmesan.",
        price: 24,
        tag: "Vegetarian",
      },
    ],
  },
];
