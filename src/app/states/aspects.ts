export interface Aspect {
  width: number;
  height: number;
}

export default [
  {
    name: '3:2',
    aspect: { width: 900, height: 600 }
  },
  {
    name: '4:3',
    aspect: { width: 800, height: 600 }
  },
  {
    name: '1:1',
    aspect: { width: 600, height: 600 }
  },
  {
    name: '2:1',
    aspect: { width: 1200, height: 600 }
  },
  {
    name: '16:9',
    aspect: { width: 1600, height: 900 }
  }
]

