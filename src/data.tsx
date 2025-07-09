import demoImage from './assets/arkcitylogo.png'
import {
  CheckOutlined,
  UsergroupAddOutlined,
  DollarCircleFilled,
  TruckOutlined,
  BulbOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  WalletOutlined
} from "@ant-design/icons";

// Define your icon data as an array
export const headerFeatures = [
  {
    icon: <CheckOutlined className="headericons" />,
    title: "100%",
    abouttitle:'100%',
    subtitle: "Safety Guarantee",
    abbtitle:"Safety"
  },
  {
    icon: <TruckOutlined className="headericons" />,
    title: "3-6 Hours",
    abouttitle:'24/7',
    subtitle: "Delivery Window",
    abbtitle:"Delivery"
  },
   {
    icon: <UsergroupAddOutlined className="headericons" />,
    title: "84+",
    abouttitle:"84+",
    subtitle: "Happy Customers",
    abbtitle:'Customers'
  },
  {
    icon: <DollarCircleFilled className="headericons" />,
    title: "Best",
    subtitle: "Prices in Lagos"
  },
 
];



export const serviceValues = [
  {
    title: "LPG Cylinder Refills",
    description: "Reliable and quick LPG cylinder refilling service for homes and businesses, ensuring uninterrupted energy supply.",
    backgroundImage:demoImage
  },
  {
    title: "Cylinder Exchange Program",
    description: "Swap your empty cylinders with pre-filled ones instantly through our efficient exchange service.",
    backgroundImage: demoImage
  },
  {
    title: "New Cylinder Sales",
    description: "Purchase brand new LPG cylinders that meet all safety and regulatory standards.",
    backgroundImage: demoImage
  },
  {
    title: "Kits (Regulator and Hose Kits)",
    description: "Get complete safety kits including regulators and hoses for a secure LPG setup.",
    backgroundImage: demoImage
  },
  {
    title: "Gas Delivery Service",
    description: "Enjoy doorstep delivery of LPG cylinders, ensuring convenience and safety for your household or business.",
    backgroundImage: demoImage
  },
  {
    title: "Bulk/Wholesale Supply",
    description: "Specialized bulk LPG supply solutions for commercial and industrial needs at competitive pricing.",
    backgroundImage: demoImage
  }
];





export const adItems = [
  {
    label: "Today",
    text: "Order before 12pm to get same day delivery",
    button: { title: "Order Now", show: true },
    link:'/#product'
   
  },
  {
    label: "New",
    text: "Bulk Discounts for Commercial Customers",
    button: { title: "Inquire", show: true },
    link:'https://wa.link/6hbzdj',
    target:'_blank'
  },
  {
    label: "Offer",
    text: "Free Hose & Regulator with New Cylinder Purchase",
    button: { title:'View Products', show: true },
    link:'/#product'
  }
];

export const aboutFeatures = [
  {
    title:'Our Mission',
    description:'To provide reliable and affordable cooking gas solutions to every home and business in Lagos, with unmatched customer service and quick delivery',
    icon:<CheckOutlined className='aboutIcons'/>
  },
  {
    title:'Our Vision',
    description:'To become the most trusted LPG delivery service in Nigeria, Known for safety, reliability and customer satisfaction.',
    icon:<BulbOutlined className='aboutIcons'/>
  },
  {
    title:'Our Values',
    description:'Safety first, reliability, transparency, and continuous improvement in all we do.',
    icon:<HeartOutlined className='aboutIcons'/>
  }
]

export const HowItWorksFeatures = [
  {
    title:'Place your Order',
    description:'Order online or call us directly, Specify your preferred delivery time and payment method.',
    icon:<ShoppingCartOutlined className='aboutIcons'/>
  },
  {
    title:'Make Payment',
    description:'Pay online via bank transfer, or cash on delivery. Upload payment proof if required',
    icon:<WalletOutlined className='aboutIcons'/>
  },
  {
    title:'We Deliver',
    description:'Our certified delivery team brings your gas cylinder to your doorstep within hours.',
    icon:<TruckOutlined className='aboutIcons'/>
  },
  {
    title:'Enjoy Cooking',
    description:'Receive your gas and enjoy safe, efficient cooking with out quality LPG products.',
    icon:<CheckOutlined className='aboutIcons'/>
  }
]



export const reviews = [
  {
    fullName: "Grace Adeniran",
    rating: 5,
    description: "Fast delivery and excellent service. I’ve never had any safety concerns using Arkcity Gas.",
    status: "Regular Customer",
    // image: demoImage,
  },


  {
    fullName: "Chidi Okafor",
    rating: 4,
    description: "Great service but I’d love even faster deliveries in the evenings.",
    status: "Regular Customer",
    // image: demoImage,
  },
  {
    fullName: "Ngozi Umeh",
    rating: 5,
    description: "Highly professional and safety-conscious. Their service is top-notch!",
    status: "Bulk Buyer",
    image: demoImage,
  },
  {
    fullName: "David Olawale",
    rating: 3,
    description: "Service was okay, but I think the ordering process can be improved.",
    status: "First-Time Customer",
    // image: demoImage,
  }
];




//admon  test test



export const subscribers = [
  { id: 1, email: 'jozzydgreat1@gmail.com' },
  { id: 2, email: 'jozzydgr8@gmail.com' },
  { id: 3, email: 'jozzydgreat2@gmail.com' },
];

