const timeline = [
  {
    id: "0",
    avatar:
      "https://i.pinimg.com/736x/25/06/c9/2506c909c706c6fcbaaf686aafc5032e.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar:
      "https://i.pinimg.com/1200x/ce/62/fe/ce62feb843ceb5b9267c3304620c44d7.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar:
      "https://i.pinimg.com/736x/6a/eb/70/6aeb70bcf13735b13c8f0d21141205cd.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },

   {
    id: "0",
    avatar:
      "https://i.pinimg.com/736x/25/06/c9/2506c909c706c6fcbaaf686aafc5032e.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar:
      "https://i.pinimg.com/1200x/ce/62/fe/ce62feb843ceb5b9267c3304620c44d7.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar:
      "https://i.pinimg.com/736x/6a/eb/70/6aeb70bcf13735b13c8f0d21141205cd.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },

   {
    id: "0",
    avatar:
      "https://i.pinimg.com/736x/25/06/c9/2506c909c706c6fcbaaf686aafc5032e.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar:
      "https://i.pinimg.com/1200x/ce/62/fe/ce62feb843ceb5b9267c3304620c44d7.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar:
      "https://i.pinimg.com/736x/6a/eb/70/6aeb70bcf13735b13c8f0d21141205cd.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
]

export default (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(timeline))
}