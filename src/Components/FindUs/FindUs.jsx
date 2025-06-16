const cities = [
  {
    name: "Dhaka",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-title-Dhaka.jpg?width=720",
  },
  {
    name: "Chittagong",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-title-Chittagong.jpg?width=720",
  },
  {
    name: "Rangpur",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-tile-Rangpur.jpg?width=720",
  },
  {
    name: "Bandarban",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-tile-Bandarban.jpg?width=720",
  },
  {
    name: "Barguna",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-tile-Barguna.jpg?width=720",
  },
  {
    name: "Barisal",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-tile-Barisal.jpg?width=720",
  },
  {
    name: "Bhola",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-tile-Bhola.jpg?width=720",
  },
  {
    name: "Bogra",
    img: "https://images.deliveryhero.io/image/fd-bd/city-title/city-tile-Bogra.jpg?width=720",
  },
];

export default function FindUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
        Find us in these cities and many more!
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-md group"
          >
            <img
              src={city.img}
              alt={city.name}
              className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-2 left-2 bg-white text-gray-800 font-medium px-3 py-1 rounded-lg text-sm shadow">
              {city.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
