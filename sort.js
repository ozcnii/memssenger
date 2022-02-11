const ss = [
  [
    {
      date: 123,
    },
    {
      date: 124,
    },
  ],
  [
    {
      date: 123,
    },
    {
      date: 125,
    },
  ],
  [
    {
      date: 123,
    },
    {
      date: 120,
    },
  ],
];

const res = ss.sort((a, b) => {
  const aLastIndex = a.length - 1;
  const bLastIndex = b.length - 1;
  return a[aLastIndex].date - b[bLastIndex].date;
});

console.log(res);
