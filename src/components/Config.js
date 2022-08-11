export const Gender = [
  { label: "Man", value: 0 },
  { label: "Woman", value: 1 },
];

export const USER_SERVER = "/api/users";

export const Categorys = [
  {
    key: 1,
    value: "의류/잡화",
  },

  {
    key: 2,
    value: "뷰티",
  },
  {
    key: 3,
    value: "출산/유아동",
  },

  {
    key: 4,
    value: "식품",
  },
  {
    key: 5,
    value: "주방용품",
  },
  {
    key: 6,
    value: "생활용품",
  },
  {
    key: 7,
    value: "홈인테리어",
  },
  {
    key: 8,
    value: "가전/디지털",
  },
  {
    key: 9,
    value: "스포츠/레저",
  },
  {
    key: 10,
    value: "자동차용품",
  },
  {
    key: 11,
    value: "도서/음반/DVD",
  },
  {
    key: 12,
    value: "완구/취미",
  },
  {
    key: 13,
    value: "문구/오피스",
  },
  {
    key: 14,
    value: "반려동물용품",
  },
  {
    key: 15,
    value: "헬스/건강식품",
  },
];

export const Price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to $249",
    array: [200, 249],
  },
  {
    _id: 3,
    name: "$250 to $279",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "$280 to $299",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "More than $300",
    array: [300, 150000000],
  },
];
