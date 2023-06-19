import { v4 as uuid } from "uuid";

const items = [
  {
    id: uuid(),
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    image: process.env.PUBLIC_URL + "/image/asset/beg.jpeg",
    originalPrice: 1300,
    price: 1000,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    qty: 0,
    totalProductPrice: 0,
    rating: 4.0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "Mens Casual Premium Slim Fit T-Shirts ",
    image: process.env.PUBLIC_URL + "/image/asset/slim fit t shirt.png",
    originalPrice: 1300,
    price: 500,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    qty: 0,
    rating: 3.2,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "Mens Cotton Jacket",
    image: process.env.PUBLIC_URL + "/image/asset/cotton jacket.jpeg",
    originalPrice: 3000,
    price: 2550,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    qty: 0,
    rating: 2.2,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "Mens Casual Slim Fit",
    image: process.env.PUBLIC_URL + "/image/asset/slim fit tshirt.jpeg",
    originalPrice: 4000,
    price: 3500,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    qty: 0,
    rating: 4.2,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "Gold & Silver Dragon Station Chain Bracelet",
    image:
      process.env.PUBLIC_URL +
      "/image/asset/Tibetan Steel Dragon Bracelets.png",
    originalPrice: 6000,
    price: 5000,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    qty: 0,
    rating: 3.8,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "Solid Gold Petite Micropave ",
    image:
      process.env.PUBLIC_URL +
      "image/asset/Minimalist Solid Gold Seven Diamond Ring Dainty Gold Diamond - Etsy.jpeg",
    originalPrice: 7500,
    price: 6200,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    qty: 0,
    rating: 1.2,
    totalProductPrice: 0,
    inStock: false,
  },
  {
    id: uuid(),
    name: "White Gold Plated Princess",
    image: process.env.PUBLIC_URL + "/image/asset/dimond ring.jpeg",
    originalPrice: 4500,
    price: 3800,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    qty: 0,
    rating: 4.8,
    totalProductPrice: 0,
    inStock: false,
  },
  {
    id: uuid(),
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    image:
      process.env.PUBLIC_URL +
      "/image/asset/925 Silver Owl Ring, 14k Yellow gold diamond owl ring, emerald eye owl ring, women diamond owl ring, designer owl ring jewelry.jpeg",
    originalPrice: 4500,
    price: 3020,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    qty: 0,
    rating: 1.9,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    image:
      process.env.PUBLIC_URL +
      "/image/asset/Seagate GoFlex Satellite Mobile Wireless Storage 500 GB USB 3_0 External Hard Drive STBF500101 Black.jpeg",
    originalPrice: 4500,
    price: 3100,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    qty: 0,
    rating: 2.6,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    image:
      process.env.PUBLIC_URL +
      "/image/asset/WD My Passport USB 3_0 2TB (External Hard Drives).jpeg",
    originalPrice: 4500,
    price: 2900,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    qty: 0,
    rating: 1.8,
    totalProductPrice: 0,
    inStock: true,
  },
  {
    id: uuid(),
    name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    image:
      process.env.PUBLIC_URL +
      "/image/asset/Western Digital My Passport Hard Drives Get 3TB Versions _ Digital Trends.jpeg",
    originalPrice: 5500,
    price: 4200,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    qty: 0,
    rating: 4.4,
    totalProductPrice: 0,
    inStock: true,
  },
];

export { items };
